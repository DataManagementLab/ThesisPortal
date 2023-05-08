import { db } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, url }) => {
	if (!locals.session.cas) throw redirect(302, '/');
	let favorites = (
		await db.query('SELECT * FROM favorite WHERE student = $student', {
			student: `student:${locals.session.cas.user}`
		})
	)[0].result;

	const formData = Object.fromEntries(url.searchParams);
	formData.thesisType = [];
	for (const [key, value] of Object.entries(formData)) {
		if (key.startsWith('thesisType_')) {
			if (value === 'on') formData.thesisType.push(key.replace('thesisType_', ''));
			delete formData[key];
		}
	}
	console.log({
		query: formData.query,
		thesisType: formData.thesisType,
		specialization: formData.specialization.split(',').filter((x) => x.length > 0),
		areaOfExpertise: formData.areaOfExpertise,
		person: formData.person.trim(),
		technologies: formData.technologies.split(',').filter((x) => x.length > 0)
	});
	let data = await db.query(
		`SELECT * FROM topics WHERE 
			draft = false AND (archived = undefined OR archived = false) AND (
			(array::len($thesisType) == 0 OR thesisType CONTAINSANY $thesisType) AND
			(array::len($specialization) == 0 OR specialization CONTAINSANY $specialization) AND
			(string::len($areaOfExpertise) == 0 OR 
				string::lowercase(areaOfExpertise) = string::lowercase($areaOfExpertise)) AND
			(string::len($person) == 0 OR 
				string::lowercase(professor) CONTAINS string::lowercase($person) OR
				supervisor CONTAINS $person) AND
			(array::len($technologies) == 0 OR technologies CONTAINSANY $technologies) AND
			(string::len($query) == 0 OR 
				string::lowercase(title) CONTAINS string::lowercase($query) OR
				string::lowercase(description) CONTAINS string::lowercase($query) OR
				thesisType CONTAINS $query OR
				specialization CONTAINS $query OR
				string::lowercase(subjectArea) CONTAINS string::lowercase($query) OR
				string::lowercase(areaOfExpertise) CONTAINS string::lowercase($query) OR
				string::lowercase(professor) CONTAINS string::lowercase($query) OR
				technologies CONTAINS $query OR
				supervisor CONTAINS $query
			)
		)
		`,
		{
			query: formData.query.trim(),
			thesisType: formData.thesisType,
			specialization: formData.specialization.split(',').map(x => x.trim()).filter((x) => x.length > 0),
			areaOfExpertise: formData.areaOfExpertise,
			person: formData.person.trim(),
			technologies: formData.technologies.split(',').map(x => x.trim()).filter((x) => x.length > 0)
		}
	);

	return {
		topics: data[0].result,
		searchData: formData,
		favorites
	};
};

export const actions = {
	markUnmarkFavorite: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData());

		if (formData.type == 'favorize') {
			await db.create('favorite', {
				student: `student:${locals.session.cas.user}`,
				topic: formData.topicId
			});
		} else if (formData.type == 'unfavorize' && formData.favoriteId) {
			await db.delete(formData.favoriteId);
		}
	}
};
