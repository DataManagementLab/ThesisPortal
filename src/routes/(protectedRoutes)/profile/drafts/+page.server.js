import { db } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';

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
