import { getJwtUser } from './cas';

function getUsername(token) {
	if (token === null) {
		return null;
	}

	return getJwtUser(token);
}

export function validate(token) {
	const userName = getUsername(token);

	if (userName === null) {
		return {
			status: 401
		};
	}

	return null;
}
export function validateUser(token, user) {
	const userName = getUsername(token);

	if (userName === null) {
		return {
			status: 401
		};
	}

	if (userName !== user) {
		return {
			status: 403
		};
	}

	return null;
}
