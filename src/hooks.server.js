import { serverHook } from '@macfja/sveltekit-session';
import { casHandler } from '@macfja/sveltekit-cas';
import { sequence } from '@sveltejs/kit/hooks';
import { CAS_HOST, CAS_PORT, CAS_VERSION } from '$env/static/private';

export const handle = sequence(
	serverHook,
	casHandler(
		`${CAS_HOST}:${CAS_PORT}`,
		CAS_VERSION,
		(event) => event.url.pathname.startsWith('/profile/'),
		(event, user) => {
			const regexp = event.url.pathname.match(/\/profile\/(\w+)/);
			return user !== regexp[1];
		}
	)
);
