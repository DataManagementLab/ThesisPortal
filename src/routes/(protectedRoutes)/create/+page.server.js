import { db } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';
import { z } from 'zod';
import fs from 'fs/promises';
import path from 'path';

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
		.array(z.string({ required_error: 'Eine Spezialisierung wird benötigt' }).trim())
		.min(1, { message: 'Eine Spezialisierung wird benötigt' }),
	language: z.string(),
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
	files: z.any(),
});

export const load = async ({ locals }) => {
	const affiliation = locals.session.cas.attributes.eduPersonAffiliation;
	const isEmployee = affiliation[0]._text == 'employee' || affiliation[1]._text == 'employee';
	if (!isEmployee) throw redirect(303, '/');
	const userData = await db.select(`student:${locals.session.cas.user}`);
	return {
		userData: userData[0]
	};
};

export const actions = {
	createTopic: async ({ request, locals }) => {
		const affiliation = locals.session.cas.attributes.eduPersonAffiliation;
		const isEmployee = affiliation[0]._text == 'employee' || affiliation[1]._text == 'employee';
		if (!isEmployee) throw redirect(303, '/');

		const rawFormData = await request.formData();
		const formData = Object.fromEntries(rawFormData);

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
		formData.createdAt = new Date();
		formData.lastUpdatedAt = new Date();
		formData.views = 0;
		delete formData.files;

		let createdTopic;
		try {
			let result = formData;
			if (!formData.draft) {
				result = filterSchema.parse(formData);
			} else if (!formData.title) {
				result.title = 'Entwurf';
			}
			result.author = locals.session.cas.user;
			createdTopic = (await db.create('topics', result))[0];
			const files = rawFormData.getAll('files');
			const cwd = process.cwd();
			for(const file of files) {
				const filePath = path.join(
					cwd,
					'static',
					'uploads',
					createdTopic.id.split(':')[1],
					file.name
				);
				try	{
					await fs.mkdir(path.dirname(filePath), { recursive: true });
					await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));
				} catch (error) {
					console.error(error);
				}
			}
		} catch (error) {
			if (error.errors != null) {
				const { fieldErrors: errors } = error.flatten();
				delete formData.files;
				return {
					formData,
					errors
				};
			}
		}
		if (createdTopic.draft) {
			throw redirect(303, `/profile/drafts`);
		} else {
			throw redirect(303, `/topic/${createdTopic.id.split(':')[1]}`);
		}
	}
};

function parseCSV(text) {
	return text
		.split(',')
		.map((s) => s.trim())
		.filter((x) => x.length > 0);
}
