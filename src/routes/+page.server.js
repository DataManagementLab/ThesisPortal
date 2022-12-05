import { db } from '$lib/server/db';

let bachelorOrMaster;

export const load = async () => {
	let query = 'SELECT * FROM topics';
	let hasFilter = false;
	let queryVars = {};
	if(bachelorOrMaster != undefined){
    	query += (hasFilter)?' OR ':' WHERE ';
    	query += 'thesisType = $thesisType';
    	queryVars.thesisType = bachelorOrMaster;
	}

	let data = await db.query(query, queryVars);

	return {
		topics: data[0].result
	};
};

export const actions = {
	filterTopic: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());
		bachelorOrMaster = formData.thesisType;
	}
};
