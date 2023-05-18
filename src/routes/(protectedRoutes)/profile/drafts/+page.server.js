import { db } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, url }) => {
	const offset = (Math.max(1, Number(url.searchParams.get('page') ?? 1)) - 1) * 25;
	let drafts = await db.query(
		'SELECT * FROM topics WHERE draft = true AND (archived = undefined OR archived = false) AND author = $author ORDER BY createdAt DESC LIMIT 25 START $offset',
		{
			author: locals.session.cas.user,
			offset
		}
	);
	let draftCount = await db.query(
		'SELECT count() AS count, draft FROM topics WHERE draft = true AND (archived = undefined OR archived = false) AND author = $author GROUP BY draft',
		{
			author: locals.session.cas.user
		}
	);
	return {
		drafts: drafts[0].result,
		pageCount: Math.ceil((draftCount[0].result[0]?.count ?? 1) / 25),
		pageIndex: Math.max(1, Number(url.searchParams.get('page') ?? 1))
	}
}

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
	archiveTopic: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());

		if (formData.archiveTopicId) {
			db.change(formData.archiveTopicId, {
				archived: true
			});
			throw redirect(302, '/profile/drafts');
		}
	}
};
