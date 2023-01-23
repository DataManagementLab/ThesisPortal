import { db } from '$lib/server/db';

export const load = async ({ locals }) => {
	let topics = await db.query('SELECT * FROM topics WHERE draft = false AND author = $author', {
		author: locals.session.cas.user
	});
	let drafts = await db.query('SELECT * FROM topics WHERE draft = true AND author = $author', {
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
		favorites: favorites
	};
};

export const actions = {
	deleteTopic: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());

		if (formData.deleteTopicId) {
			await db.delete(formData.deleteTopicId);
		}
	} 
};
