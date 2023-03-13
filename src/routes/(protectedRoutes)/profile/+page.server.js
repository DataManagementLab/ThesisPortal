import { db } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';
import { z } from 'zod';

export const actions = {
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
