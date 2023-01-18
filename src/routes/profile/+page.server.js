import { db } from '$lib/server/db';

export const load = async ({ locals }) => {
	let topics = await db.query('SELECT * FROM topics WHERE draft = false AND author = $author', {
		author: locals.session.cas.user
	});
	let drafts = await db.query('SELECT * FROM topics WHERE draft = true AND author = $author', {
		author: locals.session.cas.user
	});
	let favorites = await db.query('SELECT * FROM favorite WHERE student=$student FETCH topic' ,{
		student: `student:${locals.session.cas.user}`
	});

	let favorite = [];
	for (let i = 0; i < favorites[0].result.length; i++) {
		favorite[i] = favorites[0].result[i].topic;
	}

	let affiliation = locals.session.cas.attributes.eduPersonAffiliation;

	return {
		topics: topics[0].result,
		drafts: drafts[0].result,
		favorites: favorite,
		isEmployee: affiliation[0]._text == 'employee' || affiliation[1]._text == 'employee'
	};
};
