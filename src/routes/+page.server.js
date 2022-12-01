import { db } from '$lib/server/db';

export const load = async () => {
	let data = await db.query('SELECT * FROM topics');
	return {
		topics: data[0].result
	};
};
