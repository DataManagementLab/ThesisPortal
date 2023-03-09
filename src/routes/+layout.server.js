import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	let loggedIn = locals.session.cas !== undefined;
	let affiliation = locals.session.cas?.attributes.eduPersonAffiliation;
	if (!affiliation) {
		return {
			loggedIn,
			isEmployee: false
		};
	}
	return {
		loggedIn,
		isEmployee: affiliation[0]._text == 'employee' || affiliation[1]._text == 'employee'
	};
};
