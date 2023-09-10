import { db } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';
import { z } from 'zod';

export const actions = {
	editAccount: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData());

		const schema = z.object({
			name: z.string().min(3),
			email: z
				.string()
				.regex(
					/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g
				)
		});

		if (schema.safeParse(formData).success === true) {
			db.merge(`student:${locals.session.cas.user}`, {
				name: formData.name,
				email: formData.email
			});
		} else {
			return {
				formData,
				openSettings: 0,
				accountSuccess: false
			};
		}

		return {
			formData,
			openSettings: 0,
			accountSuccess: true
		};
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
			await db.merge(`student:${locals.session.cas.user}`, data);
			return {
				formData,
				openSettings: 1,
				researchSuccess: true
			};
		} catch (error) {
			if (error.errors != null) {
				const { fieldErrors: errors } = error.flatten();
				return {
					formData,
					errors,
					openSettings: 1,
					researchSuccess: false
				};
			}
		}
	}
};
