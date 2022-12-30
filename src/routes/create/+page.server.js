import { db } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';

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
			/*
				.split(',')
				.map((s) => s.trim())
				.filter((x) => x.length > 0)
			*/
		);
		formData.supervisor = parseCSV(
			formData.supervisor
			/*
				.split(',')
				.map((s) => s.trim())
				.filter((x) => x.length > 0)
			*/
		);
		formData.createdAt = Date.now();
		formData.lastUpdatedAt = Date.now();
		db.create('topics', formData);
		throw redirect(303, '/profile');
	}
};

function parseCSV(text) {
	return text
		.split(',')
		.map((s) => s.trim())
		.filter((x) => x.length > 0);
}
