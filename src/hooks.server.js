import { error, redirect } from '@sveltejs/kit';
import Cookie from 'universal-cookie';
import { getCasUser, getJwtUser } from './cas';

const cookieName = 'session';

export async function casHandler(filterOn, rejectOn, event) {
	const cookies = new Cookie(event.request.headers.cookie);
	if (!filterOn(event)) {
		return null;
	}

	const data = await getCasUser(
		cookies.get(cookieName),
		event.url.pathname,
		event.url.searchParams.get('ticket')
	);
	if (data.redirect) {
		return new Response(null, {
			status: 302,
			headers: {
				'set-cookie': cookieName + '=' + (data.session ?? '') + ';Secure;HttpOnly'
			}
		});
	}
	if (rejectOn(event, data.user)) {
		throw error(403, 'not found');
	}
	return null;
}

export function getSessionToken(request) {
	const cookies = new Cookie(request.headers.cookie);
	return {
		token: cookies.get(cookieName) ?? null
	};
}
export function getSessionUser(request) {
	const cookies = new Cookie(request.headers.cookie);
	return {
		user: getJwtUser(cookies.get(cookieName))
	};
}

export async function handle({ event, resolve }) {
	return (
		(await casHandler(
			(request) => request.url.pathname.startsWith('/profile/'),
			(request, user) => {
				const regexp = request.path.match(/\/profile\/(\w+)/);
				return user !== regexp[1];
			},
			event
		)) || resolve(event)
	);
}

export function getSession(request) {
	return {
		...getSessionToken(request),
		...getSessionUser(request)
	};
}
