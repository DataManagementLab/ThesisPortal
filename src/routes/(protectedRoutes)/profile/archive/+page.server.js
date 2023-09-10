import { db } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';
import { PUBLIC_ITEMS_PER_PAGE } from '$env/static/public';

export const load = async ({ locals, url }) => {
	const offset =
		(Math.max(1, Number(url.searchParams.get('page') ?? 1)) - 1) * PUBLIC_ITEMS_PER_PAGE;
	let archived = await db.query(
		`SELECT * FROM topics WHERE archived = true AND author = $author ORDER BY createdAt DESC LIMIT ${PUBLIC_ITEMS_PER_PAGE} START $offset`,
		{
			author: locals.session.cas.user,
			offset
		}
	);
	let archivedCount = await db.query(
		'SELECT count() AS count, archived FROM topics WHERE archived = true AND author = $author GROUP BY archived',
		{
			author: locals.session.cas.user
		}
	);
	return {
		archived: archived[0].result,
		pageCount: Math.ceil((archivedCount[0].result[0]?.count ?? 1) / PUBLIC_ITEMS_PER_PAGE),
		pageIndex: Math.max(1, Number(url.searchParams.get('page') ?? 1))
	};
};

export const actions = {
	deleteTopic: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());

		if (formData.deleteTopicId) {
			await db.delete(formData.deleteTopicId);
			await db.query('DELETE favorite WHERE topic=$topicID', {
				topicID: formData.deleteTopicId
			});
		}
	},
	unarchiveTopic: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());

		if (formData.unarchiveTopicId) {
			db.merge(formData.unarchiveTopicId, {
				archived: false
			});
		}
		throw redirect(302, '/profile/archive');
	}
};
