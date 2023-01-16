import { db } from '$lib/server/db';

export const load = async ({ params, locals }) => {
	let id = params.id;
	let data = await db.query('SELECT * FROM $id', {
		id: `topics:${id}`
	});
	return {
		topic: data[0].result[0]
	};
};
