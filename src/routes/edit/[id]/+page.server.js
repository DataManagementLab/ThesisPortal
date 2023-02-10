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
		.email({ message: 'Eine Emailadresse wird benötigt' }),
	draft: z.boolean()
});

export async function load({ params, locals }) {
	const affiliation = locals.session.cas.attributes.eduPersonAffiliation;
	const isEmployee = affiliation[0]._text == 'employee' || affiliation[1]._text == 'employee';
	if (!isEmployee) throw redirect(303, '/');
	let data = await db.query('SELECT * FROM $topic', {
		topic: `topics:${params.id}`
	});
	data = data[0].result;
	if (data.length === 0) {
		throw error(404, 'Thema nicht gefunden');
	}
	if (data[0].author !== locals.session.cas.user) {
		throw error(403, 'Nicht authorisiert');
	}
	return {
		data: data[0]
	};
}

export const actions = {
	updateTopic: async ({ locals, request, params }) => {
		const affiliation = locals.session.cas.attributes.eduPersonAffiliation;
		const isEmployee = affiliation[0]._text == 'employee' || affiliation[1]._text == 'employee';
		if (!isEmployee) throw redirect(303, '/');
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
		formData.specialization = parseCSV(formData.specialization);
		formData.supervisor = parseCSV(formData.supervisor);
		formData.lastUpdatedAt = Date.now();

		try {
			const result = formData;
			if (!formData.draft) {
				result = filterSchema.parse(formData);
			} else if (!formData.title) {
				result.title = 'Entwurf'
			}
			db.change(`topics:${params.id}`, result);
		} catch (error) {
			if (error.errors != null) {
				const { fieldErrors: errors } = error.flatten();
				console.log(errors);
				return {
					form: formData,
					errors: errors
				};
			}
		}
		
		throw redirect(303, '/profile');
	}
};

function parseCSV(text) {
	return text
		.split(',')
		.map((s) => s.trim())
		.filter((x) => x.length > 0);
}
