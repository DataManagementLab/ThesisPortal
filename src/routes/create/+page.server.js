import { db } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';
import { z } from 'zod';

const filterSchema = z.object({
	subjectArea: z
		.string({ required_error: 'Ein Fachbereich wird benötigt' })
		.min(1, { message: 'Ein Fachbereich wird benötigt' })
		.trim(),
	areaOfExpertise: z
		.string({ required_error: 'Ein Fachgebiet wird benötigt' })
		.min(1, { message: 'Ein Fachgebiet wird benötigt' })
		.trim(),
	specialization: z
		.array(z.string({ required_error: 'Eine Spezifikation wird benötigt' }).trim())
		.min(1, { message: 'Eine Spezifikation wird benötigt' }),
	thesisType: z
		.array(z.string({ required_error: 'Thesistyp(en) wird benötigt' }))
		.min(1, { message: 'Thesistyp(en) wird benötigt' })
		.max(2),
	title: z
		.string({ required_error: 'Ein Titel wird benötigt' })
		.min(1, { message: 'Ein Titel wird benötigt' })
		.trim(),
	description: z
		.string({ required_error: 'Eine Beschreibung wird benötigt' })
		.min(1, { message: 'Eine Beschreibung wird benötigt' })
		.trim(),
	professor: z
		.string({ required_error: 'Ein(e) Professor:in wird benötigt' })
		.min(1, { message: 'Ein(e) Professor:in wird benötigt' }),
	supervisor: z
		.array(
			z.string({ required_error: 'Eine oder mehrere betreunde Personen werden benötigt' }).trim()
		)
		.min(1, { message: 'Eine oder mehrere betreuende Personen werden benötigt' }),
	technologies: z
		.array(z.string({ required_error: 'Technologien werden benötigt' }).trim())
		.min(1, { message: 'Technologien werden benötigt' }),
	email: z
		.string({ required_error: 'Eine Emailadresse wird benötigt' })
		.email({ message: 'Eine Emailadresse wird benötigt' })
});

export const actions = {
	createTopic: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());

		// Convert thesisType_* fields to single array 'thesisType: []'
		formData.thesisType = [];
		for (const [key, value] of Object.entries(formData)) {
			if (key.startsWith('thesisType_')) {
				if (value === 'on') formData.thesisType.push(key.replace('thesisType_', ''));
				delete formData[key];
			}
		}
		formData.draft = formData.draft === 'true';
		formData.technologies = parseCSV(formData.technologies);
		formData.specialization = parseCSV(
			formData.specialization
			/*.split(',')
				.map((s) => s.trim())
				.filter((x) => x.length > 0)*/
		);
		formData.supervisor = parseCSV(
			formData.supervisor
			/*.split(',')
				.map((s) => s.trim())
				.filter((x) => x.length > 0)*/
		);
		formData.createdAt = Date.now();
		formData.lastUpdatedAt = Date.now();

		try {
			const result = filterSchema.parse(formData);
			db.create('topics', formData);
			throw redirect(303, '/profile');
		} catch (error) {
			if (error.errors != null) {
				const { fieldErrors: errors } = error.flatten();
				return {
					formData,
					errors
				};
			}
		}
	}
};

function parseCSV(text) {
	return text
		.split(',')
		.map((s) => s.trim())
		.filter((x) => x.length > 0);
}
