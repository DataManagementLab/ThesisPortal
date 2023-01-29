import { db } from '$lib/server/db';

let filtered = undefined;
let searchData = undefined;

export const load = async ({ locals }) => {
	checkAddStudent(locals.session.cas.user);

	let favorites = (
		await db.query('SELECT * FROM favorite WHERE student = $student', {
			student: `student:${locals.session.cas.user}`
		})
	)[0].result;

	if (filtered === undefined) {
		let query = 'SELECT * FROM topics WHERE draft=false LIMIT 25';

		let data = await db.query(query);
		return {
			topics: data[0].result,
			favorites
		};
	} else {
		setTimeout(() => (filtered = undefined), 1);
		return {
			topics: filtered,
			searchData: searchData,
			favorites
		};
	}
};

export const actions = {
	search: async ({ request }) => {
		let formData = Object.fromEntries(await request.formData());
		formData.thesisType = [];
		for (const [key, value] of Object.entries(formData)) {
			if (key.startsWith('thesisType_')) {
				if (value === 'on') formData.thesisType.push(key.replace('thesisType_', ''));
				delete formData[key];
			}
		}
		let data = await db.query(`SELECT * FROM topics WHERE draft = false AND (archived = null OR archived = false)`, {
			search: formData.query
		});
		filtered = data[0].result.filter((topic) => {
			return (
				//title contains query
				(formData.query.length > 0 &&
					topic.title.toLowerCase().includes(formData.query.toLowerCase())) ||
				//description contains query
				(formData.query.length > 0 &&
					topic.description.toLowerCase().includes(formData.query.toLowerCase())) ||
				//formdata thesisType contains topics thesisType
				topic.thesisType.some((type) => formData.thesisType.includes(type)) ||
				//formdata specialization equals topics specialization
				topic.specialization.map((x) => x.toLowerCase()) ===
					formData.specialization.toLowerCase() ||
				//formdata areaOfExpertise equals topics areaOfExpertise
				formData.areaOfExpertise.toLowerCase() === topic.areaOfExpertise.toLowerCase() ||
				//topic professor contains formdata person
				(formData.person.length > 0 &&
					topic.professor.toLowerCase().includes(formData.person.toLowerCase())) ||
				//topic supervisor contains formdata person
				(formData.person.length > 0 &&
					topic.supervisor
						.map((s) => s.toLowerCase())
						.filter((s) => s.length > 0)
						.filter((s) => s.toLowerCase().includes(formData.person.toLowerCase())).length > 0) ||
				//topic technologies contains formdata technologies
				topic.technologies
					.filter((x) => x.length > 0)
					.some((tech) =>
						formData.technologies
							.split(',')
							.map((x) => x.toLowerCase())
							.includes(tech.toLowerCase())
					) ||
				//topic thesisType contains query
				topic.thesisType.map((x) => x.toLowerCase()).includes(formData.query.toLowerCase()) ||
				//topic specialization contains query
				(formData.query.length > 0 &&
					topic.specialization
						.map((x) => x.toLowerCase())
						.includes(formData.query.toLowerCase())) ||
				//topic subjectArea contains query
				(formData.query.length > 0 &&
					topic.subjectArea.toLowerCase().includes(formData.query.toLowerCase())) ||
				//topic areaOfExpertise contains query
				(formData.query.length > 0 &&
					topic.areaOfExpertise.toLowerCase().includes(formData.query.toLowerCase())) ||
				//topic professor contains query
				(formData.query.length > 0 &&
					topic.professor.toLowerCase().includes(formData.query.toLowerCase())) ||
				//topic supervisor contains query
				(formData.query.length > 0 &&
					topic.supervisor
						.map((s) => s.toLowerCase())
						.filter((s) => s.length > 0)
						.filter((s) => s.toLowerCase().includes(formData.query.toLowerCase())).length > 0)
			);
		});
		searchData = formData;
	},

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

async function checkAddStudent(tuid) {
	try {
		await db.select(`student:${tuid}`);
	} catch (err) {
		await db.create(`student:${tuid}`);
	}
}
