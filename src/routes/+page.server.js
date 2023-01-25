import { CAS_HOST } from '$env/static/private';
import { PUBLIC_HOST, PUBLIC_PORT } from '$env/static/public';

export const load = async () => {
	return {
		CAS_HOST,
		PUBLIC_HOST,
		PUBLIC_PORT
	};
};
