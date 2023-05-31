import { db } from '$lib/server/db';
import { error, redirect } from '@sveltejs/kit';
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
		.regex(
			/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g
		),
	draft: z.boolean(),
	createdAt: z.date(),
	lastUpdatedAt: z.date()
});

let returnError;

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
		data: data[0],
		errors: returnError
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
		formData.lastUpdatedAt = new Date();
		formData.createdAt = new Date(formData.createdAt);
		try {
			if (!formData.draft) {
				filterSchema.parse(formData);
			}
			db.change(`topics:${params.id}`, formData);
		} catch (error) {
			formData.draft = 'true';
			db.change(`topics:${params.id}`, formData);
			if (error.errors != null) {
				const { fieldErrors: errors } = error.flatten();
				returnError = errors;
			}
			return;
		}
		if (formData.draft) {
			throw redirect(303, '/profile/drafts');
		} else {
			throw redirect(303, '/profile/topics');
		}
	}
};

function parseCSV(text) {
	return text
		.split(',')
		.map((s) => s.trim())
		.filter((x) => x.length > 0);
}
