import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	let loggedIn = locals.session.cas !== undefined;
	if (!loggedIn) throw redirect(302, '/');
	return {
		user: locals.session.cas.user
	};
};
