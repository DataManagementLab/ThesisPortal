import { db } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';
import { z } from 'zod';

export const load = async ({ locals }) => {
	let topics = await db.query(
		'SELECT * FROM topics WHERE draft = false AND (archived = null OR archived = false) AND author = $author',
		{
			author: locals.session.cas.user
		}
	);
	let drafts = await db.query(
		'SELECT * FROM topics WHERE draft = true AND (archived = null OR archived = false) AND author = $author',
		{
			author: locals.session.cas.user
		}
	);
	let archived = await db.query('SELECT * FROM topics WHERE archived = true AND author = $author', {
		author: locals.session.cas.user
	});
	let user = await db.select(`student:${locals.session.cas.user}`);
	let favorites = (
		await db.query('SELECT * FROM favorite WHERE student=$student FETCH topic', {
			student: `student:${locals.session.cas.user}`
		})
	)[0].result;
	favorites = favorites.map((elem) => elem.topic);

	return {
		topics: topics[0].result,
		drafts: drafts[0].result,
		archived: archived[0].result,
		favorites: favorites,
		user: user[0]
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
	},
	unarchiveTopic: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());

		if (formData.unarchiveTopicId) {
			db.change(formData.unarchiveTopicId, {
				archived: false
			});
		}
		throw redirect(302, '/profile');
	},
	editName: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData());

		const schema = z.string().min(3);

		if (schema.safeParse(formData.name).success === true) {
			db.change(`student:${locals.session.cas.user}`, {
				name: formData.name
			});
		}

		throw redirect(302, '/profile');
	},
	editEmail: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData());

		const schema = z.string().email();

		if (schema.safeParse(formData.email).success === true) {
			db.change(`student:${locals.session.cas.user}`, {
				email: formData.email
			});
		}

		throw redirect(302, '/profile');
	},
	editInfo: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData());
		formData.keywords = formData.keywords
			.split(',')
			.map((elem) => elem.trim())
			.filter((elem) => elem.length > 0);
		console.log(formData.keywords);

		const schema = z.object({
			subjectArea: z.string().min(3).trim(),
			areaOfExpertise: z.string().min(3).trim(),
			specialization: z.string().min(3).trim(),
			keywords: z.array(z.string().trim())
		});

		try {
			const data = schema.parse(formData);
			console.log(await db.change(`student:${locals.session.cas.user}`, data));
		} catch (e) {
			if (error.errors != null) {
				const { fieldErrors: errors } = e.flatten();
				return {
					formData,
					errors
				};
			}
		}

		throw redirect(302, '/profile');
	}
};
