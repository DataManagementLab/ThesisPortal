import { db } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';
import { z } from 'zod';

const filterSchema = z.object({
	specification: z
		.string({ required_error: 'Ein Fachgebiet wird benötigt' })
		.min(1, { message: 'Ein Fachgebiet wird benötigt' })
		.max(64)
		.trim(),
	thesisType: z
		.array(z.string({ required_error: 'Thesistyp wird benötigt'}))
		.min(1, { message: 'Thesistyp wird benötigt' })
		.max(2),
	title: z
		.string({ required_error: 'Ein Titel wird benötigt'})
		.min(1, { message: 'Ein Titel wird benötigt' })
		.trim(),
	description: z
		.string({ required_error: 'Eine Beschreibung wird benötigt' })
		.min(1, { message: 'Eine Beschreibung wird benötigt' })
		.trim(),
	professor: z
		.string({ required_error: 'Der/die Professor:in wird benötigt' })
		.min(1, { message: 'Der/die Professor:in wird benötigt' }),
	technologies: z
		.string({ required_error: 'Technologien werden benötigt' })
		.min(1, { message: 'Technologien werden benötigt' })
		.trim(),
	email: z
		.string({ required_error: 'Eine Emailadresse wird benötigt' })
		.email({ message: 'Eine Emailadresse wird benötigt' }),
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
		formData.specialization = parseCsv(
			formData.specialization
				.split(',')
				.map((s) => s.trim())
				.filter((x) => x.length > 0)
		);
		formData.supervisor = parseCsv(
			formData.supervisor
				.split(',')
				.map((s) => s.trim())
				.filter((x) => x.length > 0)
		);
		formData.createdAt = Date.now();
		formData.lastUpdatedAt = Date.now();

		//console.log(formData);
		try {
			
			const result = filterSchema.parse(formData);
			db.create('topics', formData);
			throw redirect(303, '/profile');
			//console.log('ERFOLG');
			//console.log(result);
			
		} catch (error) {
			const { fieldErrors: errors} = error.flatten();
			return {
				formData,
				errors
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
