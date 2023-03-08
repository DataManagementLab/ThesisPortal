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
	editAccount: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData());

		const schema = z.object({
			name: z.string().min(3),
			email: z.string().email()
		});

		if (schema.safeParse(formData).success === true) {
			db.change(`student:${locals.session.cas.user}`, {
				name: formData.name,
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

		const schema = z.object({
			subjectArea: z.string().min(3, { message: 'Ein Fachbereich wird benötigt' }).trim(),
			areaOfExpertise: z.string().min(3, { message: 'Ein Fachgebiet wird benötigt' }).trim(),
			specialization: z.string().min(3, { message: 'Eine Spezialisierung wird benötigt' }).trim(),
			keywords: z.array(z.string().trim())
		});

		try {
			const data = schema.parse(formData);
			await db.change(`student:${locals.session.cas.user}`, data);
			return {
				openTab: 0,
				openSettings: 1
			};
		} catch (error) {
			if (error.errors != null) {
				const { fieldErrors: errors } = error.flatten();
				return {
					formData,
					errors,
					openTab: 0,
					openSettings: 1
				};
			}
		}

		throw redirect(302, '/profile');
	}
};