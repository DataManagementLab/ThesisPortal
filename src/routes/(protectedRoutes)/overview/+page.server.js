import { db } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';
import { PUBLIC_ITEMS_PER_PAGE } from '$env/static/public';

export const load = async ({ locals, url }) => {
	if (!locals.session.cas) throw redirect(302, '/');
	const offset =
		(Math.max(1, Number(url.searchParams.get('page') ?? 1)) - 1) * PUBLIC_ITEMS_PER_PAGE;
	const favorites = (
		await db.query('SELECT * FROM favorite WHERE student = $student', {
			student: `student:${locals.session.cas.user}`
		})
	)[0].result;

	const data = await db.query(
		`SELECT * FROM topics WHERE draft=false AND (archived = undefined OR archived = false) ORDER BY createdAt DESC LIMIT ${PUBLIC_ITEMS_PER_PAGE} START $offset`,
		{
			offset
		}
	);
	const topicCount = await db.query(
		'SELECT count() AS count, draft FROM topics WHERE draft=false AND (archived = undefined OR archived = false) GROUP BY draft'
	);

	return {
		topics: data[0].result,
		favorites,
		pageCount: Math.ceil((topicCount[0].result[0]?.count ?? 1) / PUBLIC_ITEMS_PER_PAGE),
		pageIndex: Math.max(1, Number(url.searchParams.get('page') ?? 1))
	};
};

export const actions = {
	markUnmarkFavorite: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData());

		if (formData.type == 'favorize') {
			await db.create('favorite', {
				student: `student:${locals.session.cas.user}`,
				topic: formData.topicId
			});
		} else if (formData.type == 'unfavorize' && formData.favoriteId) {
			await db.delete(formData.favoriteId);
		}
	}
};
