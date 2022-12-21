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
		formData.technologies = formData.technologies.split(',').map((s) => s.trim());
		db.create('topics', formData);
		throw redirect(303, '/profile');
	}
};
