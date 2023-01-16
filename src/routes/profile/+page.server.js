import { db } from '$lib/server/db';

export const load = async ({ locals }) => {
	let topics = await db.query('SELECT * FROM topics WHERE draft = false AND author = $author', {
		author: locals.session.cas.user
	});
	let drafts = await db.query('SELECT * FROM topics WHERE draft = true AND author = $author', {
		author: locals.session.cas.user
	});

	return {
		topics: topics[0].result,
		drafts: drafts[0].result
	};
};
