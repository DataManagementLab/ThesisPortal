import { db } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	let topics = await db.query('SELECT * FROM topics WHERE draft = false AND (archived = null OR archived = false) AND author = $author', {
		author: locals.session.cas.user
	});
	let drafts = await db.query('SELECT * FROM topics WHERE draft = true AND (archived = null OR archived = false) AND author = $author', {
		author: locals.session.cas.user
	});
	let archived = await db.query('SELECT * FROM topics WHERE archived = true AND author = $author', {
		author: locals.session.cas.user
	});
	let favorites = (
		await db.query('SELECT * FROM favorite WHERE student=$student FETCH topic', {
			student: `student:${locals.session.cas.user}`
		})
	)[0].result;
	favorites = favorites.map((elem) => elem.topic);

	return {
		topics: topics[0].result,
		drafts: drafts[0].result,
		archived: archived[0].result.length,
		favorites: favorites
	};
};

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
			throw redirect(302, '/profile');
		}
	} 
};
