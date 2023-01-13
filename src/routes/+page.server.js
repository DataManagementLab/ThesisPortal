import { db } from '$lib/server/db';

let thesisType;
let specification;
let areaOfExpertise;
let professor;
let technologies;
let action;

export const load = async () => {
	let query = 'SELECT * FROM topics WHERE draft = false';
	let queryVars = {};
	if (action === 'filter') {
		if (thesisType !== undefined && thesisType.length > 0) {
			query += ' AND thesisType CONTAINSANY $thesisType';
			queryVars.thesisType = thesisType;
		}
		if (specification !== undefined && specification !== '') {
			query += ' AND specification = $specification';
			queryVars.specification = specification;
		}
		if (areaOfExpertise !== undefined && areaOfExpertise !== '') {
			query += ' AND $areaOfExpertise CONTAINS areaOfExpertise';
			queryVars.areaOfExpertise = areaOfExpertise.split(',');
		}
		if (professor !== undefined && professor !== '') {
			query += ' AND string::lowercase(professor) INSIDE string::lowercase($professor)';
			queryVars.professor = professor;
		}
		if (technologies !== undefined && technologies !== '') {
			query += ' AND string::lowercase(technologies) INSIDE string::lowercase($technologies)';
			queryVars.technologies = technologies;
		}
	}

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
		specification = formData.specification;
		areaOfExpertise = formData.areaOfExpertise;
		professor = formData.professor;
		technologies = formData.technologies;
		action = formData.action;
	}
};
