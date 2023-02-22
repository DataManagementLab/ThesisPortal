import { db } from '$lib/server/db';

export const load = async ({ params }) => {
	let id = params.id;
	let data = await db.query('SELECT * FROM $id', {
		id: `topics:${id}`
	});
	await db.query('UPDATE $id SET views = views + 1', {
		id: `topics:${id}`
	});
	return {
		topic: data[0].result[0]
	};
};
