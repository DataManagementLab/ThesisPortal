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
			(array::len($query) == 0 OR 
				$query ?~ string::lowercase(title) OR
				$query ?~ string::lowercase(description) OR
				$query ?~ thesisType OR
				$query ?~ specialization OR
				$query ?~ string::lowercase(subjectArea) OR
				$query ?~ string::lowercase(areaOfExpertise) OR
				$query ?~ string::lowercase(professor) OR
				$query ?~ technologies OR
				$query ?~ string::lowercase(supervisor)
			)
		) ORDER BY createdAt DESC LIMIT 25 START $offset
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
			offset
		}
	);
	let topicCount = await db.query(
		`SELECT count() as count, draft FROM topics WHERE 
			draft = false AND (archived = undefined OR archived = false) AND (
			(array::len($thesisType) == 0 OR thesisType CONTAINSANY $thesisType) AND
			(array::len($specialization) == 0 OR specialization CONTAINSANY $specialization) AND
			(string::len($areaOfExpertise) == 0 OR 
				string::lowercase(areaOfExpertise) = string::lowercase($areaOfExpertise)) AND
			(string::len($person) == 0 OR 
				string::lowercase(professor) CONTAINS string::lowercase($person) OR
				supervisor CONTAINS $person) AND
			(array::len($technologies) == 0 OR technologies CONTAINSANY $technologies) AND
			(array::len($query) == 0 OR 
				$query ?~ string::lowercase(title) OR
				$query ?~ string::lowercase(description) OR
				$query ?~ thesisType OR
				$query ?~ specialization OR
				$query ?~ string::lowercase(subjectArea) OR
				$query ?~ string::lowercase(areaOfExpertise) OR
				$query ?~ string::lowercase(professor) OR
				$query ?~ technologies OR
				$query ?~ string::lowercase(supervisor)
			)
		) GROUP BY draft
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
				.filter((x) => x.length > 0)
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
