import { db } from '$lib/server/db';

export const load = async () => {
	let topics = await db.query('SELECT * FROM topics WHERE draft = false');
    let drafts = await db.query('SELECT * FROM topics WHERE draft = true');
    console.log(topics[0].result, drafts[0].result);

	return {
		topics: topics[0].result,
        drafts: drafts[0].result
	};
};