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
	const offset = (Math.max(1, Number(url.searchParams.get('page') ?? 1)) - 1) * 25;
	formData.thesisType = [];
	for (const [key, value] of Object.entries(formData)) {
		if (key.startsWith('thesisType_')) {
			if (value === 'on') formData.thesisType.push(key.replace('thesisType_', ''));
			delete formData[key];
		}
	}
	formData.language = formData.language.split(',').map((x) => x.trim()).filter((x) => x.length > 0);
	let data = await db.query(
		`SELECT * FROM topics WHERE 
			draft = false AND (archived = undefined OR archived = false)
			${formData.thesisType.length > 0 ? 'AND thesisType CONTAINSANY $thesisType' : ''}
			${formData.specialization.length > 0 ? 'AND specialization CONTAINSANY $specialization' : ''}
			${formData.areaOfExpertise.length > 0 ? 'AND string::lowercase(areaOfExpertise) = string::lowercase($areaOfExpertise)' : ''}
			${formData.person.length > 0 ? 'AND (string::lowercase(professor) CONTAINS string::lowercase($person) OR supervisor CONTAINS $person)' : ''}
			${formData.technologies.length > 0 ? 'AND technologies CONTAINSANY $technologies' : ''}
			${formData.language.length > 0 ? 'AND ($language CONTAINS language OR language == \'de,en\')' : ''}
			${formData.query.length > 0 ? `AND ( 
				$query ANYINSIDE string::words(title) OR
				$query ANYINSIDE string::words(description) OR
				$query ANYINSIDE thesisType OR
				$query ANYINSIDE specialization OR
				$query ?~ subjectArea OR
				$query ?~ areaOfExpertise OR
				$query ANYINSIDE string::words(professor) OR
				$query ANYINSIDE technologies OR
				$query ?~ supervisor
			)` : ''}
		ORDER BY createdAt DESC LIMIT 25 START $offset
		`,
		{
			query: formData.query
				.trim()
				.split(',')
				.map((e) => e.trim().toLowerCase())
				.filter((e) => e.length > 0),
			thesisType: formData.thesisType,
			specialization: formData.specialization
				.split(',')
				.map((x) => x.trim())
				.filter((x) => x.length > 0),
			areaOfExpertise: formData.areaOfExpertise,
			person: formData.person.trim(),
			technologies: formData.technologies
				.split(',')
				.map((x) => x.trim())
				.filter((x) => x.length > 0),
			language: formData.language,
			offset
		}
	);
	let topicCount = await db.query(
		`SELECT count() as count, draft FROM topics WHERE 
			draft = false AND (archived = undefined OR archived = false)
			${formData.thesisType.length > 0 ? 'AND thesisType CONTAINSANY $thesisType' : ''}
			${formData.specialization.length > 0 ? 'AND specialization CONTAINSANY $specialization' : ''}
			${formData.areaOfExpertise.length > 0 ? 'AND string::lowercase(areaOfExpertise) = string::lowercase($areaOfExpertise)' : ''}
			${formData.person.length > 0 ? 'AND (string::lowercase(professor) CONTAINS string::lowercase($person) OR supervisor CONTAINS $person)' : ''}
			${formData.technologies.length > 0 ? 'AND technologies CONTAINSANY $technologies' : ''}
			${formData.language.length > 0 ? 'AND $language CONTAINS language' : ''}
			${formData.query.length > 0 ? `AND ( 
				$query ANYINSIDE string::words(title) OR
				$query ANYINSIDE string::words(description) OR
				$query ANYINSIDE thesisType OR
				$query ANYINSIDE specialization OR
				$query ?~ subjectArea OR
				$query ?~ areaOfExpertise OR
				$query ANYINSIDE string::words(professor) OR
				$query ANYINSIDE technologies OR
				$query ?~ supervisor
			)` : ''}
		GROUP BY draft
		`,
		{
			query: formData.query
				.trim()
				.split(',')
				.map((e) => e.trim().toLowerCase())
				.filter((e) => e.length > 0),
			thesisType: formData.thesisType,
			specialization: formData.specialization
				.split(',')
				.map((x) => x.trim())
				.filter((x) => x.length > 0),
			areaOfExpertise: formData.areaOfExpertise,
			person: formData.person.trim(),
			technologies: formData.technologies
				.split(',')
				.map((x) => x.trim())
				.filter((x) => x.length > 0),
			language: formData.language,
		}
	);

	return {
		topics: data[0].result,
		searchData: formData,
		favorites,
		pageCount: Math.ceil((topicCount[0].result[0]?.count ?? 1) / 25),
		pageIndex: Math.max(1, Number(url.searchParams.get('page') ?? 1))
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
