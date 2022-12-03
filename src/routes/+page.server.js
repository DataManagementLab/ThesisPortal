import { db } from '$lib/server/db';

let bachelorOrMaster;

export const load = async () => {
	let data = await db.query("SELECT * FROM topics");

	if (bachelorOrMaster != undefined) {
		data = await db.query('SELECT * FROM topics WHERE thesisType = $thesisType', {thesisType: bachelorOrMaster});
	}

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
