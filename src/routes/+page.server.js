import { db } from '$lib/server/db';

let thesisType;
let specification;
let areaOfExpertise;
let professor;

export const load = async () => {
	let query = 'SELECT * FROM topics WHERE draft = false';
	let queryVars = {};
	if (thesisType != undefined) {
		query += ' AND thesisType CONTAINSANY $thesisType';
		queryVars.thesisType = thesisType;
	}
	if (specification != undefined) {
		query += ' AND specification = $specification';
		queryVars.specification = specification;
		
	}
	
	if (areaOfExpertise != undefined) {
		query += ' AND areaOfExpertise = $areaOfExpertise';
		queryVars.areaOfExpertise = areaOfExpertise;
		
	}

	if (professor != undefined) {
		query += ' AND string::lowercase(professor) INSIDE string::lowercase($professor)';
		queryVars.professor = professor;
	}
	
	let data = await db.query(query, queryVars);

	let specifications = await db.query('SELECT specification FROM topics group by specification');

	return {
		topics: data[0].result,
		specifications: specifications[0].result
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
		specification = formData.specification;	
		areaOfExpertise = formData.areaOfExpertise;
		professor = formData.professor;

	}
};
