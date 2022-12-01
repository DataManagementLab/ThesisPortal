import { db } from '$lib/server/db';

export const actions = {
	createTopic: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());
		db.create('topics', formData);
	}
};
