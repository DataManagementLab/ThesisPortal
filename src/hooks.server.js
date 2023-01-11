import {
	configuredServerHook,
	SessionManager,
	SvelteKitExchanger
} from '@macfja/sveltekit-session';
import { casHandler } from '@macfja/sveltekit-cas';
import { sequence } from '@sveltejs/kit/hooks';
import { CAS_HOST, CAS_VERSION } from '$env/static/private';

export const handle = sequence(
	(input) =>
		configuredServerHook(
			input,
			new SessionManager(
				undefined,
				undefined,
				new SvelteKitExchanger('SKSESSID', 'cookie', input.event, { path: '/', secure: false }),
				undefined
			)
		),
	casHandler(CAS_HOST, parseInt(CAS_VERSION))
);
