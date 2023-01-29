import { serverHook } from '@macfja/sveltekit-session';
import { casHandler } from '@macfja/sveltekit-cas';
import { sequence } from '@sveltejs/kit/hooks';
import { CAS_HOST, CAS_VERSION } from '$env/static/private';

export const handle = sequence(
	serverHook,
	casHandler(
		CAS_HOST,
		parseInt(CAS_VERSION),
		({ url }) => url.searchParams.get('ticket') != null || !url.pathname.startsWith('/'),
		() => !1,
		() => 'never'
	)
);
