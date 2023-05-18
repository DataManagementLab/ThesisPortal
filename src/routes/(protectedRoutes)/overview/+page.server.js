import { db } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, url }) => {
	if (!locals.session.cas) throw redirect(302, '/');
	const offset = (Math.max(1, Number(url.searchParams.get('page') ?? 1)) - 1) * 25;
	const favorites = (
		await db.query('SELECT * FROM favorite WHERE student = $student', {
			student: `student:${locals.session.cas.user}`
		})
	)[0].result;

	const data = await db.query(
		'SELECT * FROM topics WHERE draft=false AND (archived = undefined OR archived = false) ORDER BY createdAt DESC LIMIT 25 START $offset',
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
		pageCount: Math.ceil((topicCount[0].result[0]?.count ?? 1) / 25),
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
