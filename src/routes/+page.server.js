import { CAS_HOST } from '$env/static/private';
import { PUBLIC_HOST, PUBLIC_PORT } from '$env/static/public';

export const load = async ({ locals }) => {
	return {
		user: locals.session.cas,
		CAS_HOST,
		PUBLIC_HOST,
		PUBLIC_PORT
	};
};
