import { db } from '$lib/server/db';
import { error, redirect } from '@sveltejs/kit';

export async function load({ params }) {
	let data = await db.query('SELECT * FROM $topic', {
		topic: `topics:${params.id}`
	});
	data = data[0].result;
	if (data.length === 0) {
		throw error(404, 'Thema nicht gefunden');
	}
	if (data.draft === false) {
		throw error(409, 'Thema ist kein Entwurf');
	}
	return data[0];
}

export const actions = {
	updateTopic: async ({ request, params }) => {
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
		db.update(`topics:${params.id}`, formData);
		throw redirect(303, '/profile');
	}
};
