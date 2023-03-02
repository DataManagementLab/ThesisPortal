import { PUBLIC_HOST, PUBLIC_PORT } from '$env/static/public';
import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	event.cookies.delete('SKSESSID');

	throw redirect(
		302,
		`https://login-dev.hrz.tu-darmstadt.de/idp/profile/cas/logout?service=${PUBLIC_HOST}:${PUBLIC_PORT}`
	);
};
