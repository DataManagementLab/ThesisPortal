import { db } from '$lib/server/db';

let thesisType;

export const load = async () => {
	let query = 'SELECT * FROM topics';
	let hasFilter = false;
	let queryVars = {};
	if (thesisType != undefined) {
		query += hasFilter ? ' AND ' : ' WHERE ';
		query += 'thesisType CONTAINSANY $thesisType';
		queryVars.thesisType = thesisType;
		hasFilter = true;
	}
	console.log(query, queryVars);
	let data = await db.query(query, queryVars);

	return {
		topics: data[0].result
	};
};

export const actions = {
	filterTopic: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());
		// Convert thesisType_* fields to single array 'thesisType: []'
		formData.thesisType = [];
		for (const [key, value] of Object.entries(formData)) {
			if (key.startsWith('thesisType_')) {
				if (value === 'on') formData.thesisType.push(key.replace('thesisType_', ''));
				delete formData[key];
			}
		}
		thesisType = formData.thesisType;
	}
};
