import { CASClientV2 } from 'logical-cas-client';
import njwt from 'njwt';
import {
	JWT_SECRET,
	PUBLIC_HOST,
	PUBLIC_PORT,
	CAS_HOST,
	CAS_PORT,
	CAS_VERSION
} from '$env/static/private';
const create = njwt.create,
	verify = njwt.verify;

const createJwt = (username) =>
	create(
		{
			iss: 'sveltekit-cas',
			sub: 'cas/' + username,
			scope: 'user'
		},
		JWT_SECRET
	);

const readJwt = (jwtString) => {
	return verify(jwtString, JWT_SECRET);
};
export const getJwtUser = (jwtString) => {
	try {
		const jwt = readJwt(jwtString);
		return jwt.body.toJSON()?.sub?.toString().substring(4);
	} catch (e) {
		return null;
	}
};

const createCas = (path, onSuccess, onFailure) => {
	return new CASClientV2(
		{
			host: PUBLIC_HOST,
			secure: true,
			port: PUBLIC_PORT,
			server: {
				host: CAS_HOST,
				port: CAS_PORT,
				version: CAS_VERSION,
				secure: true
			},
			endpoints: {
				ticketVerificationPath: path
			}
		},
		(req, res, user) => onSuccess(user),
		(req, res, error) => onFailure(error, req)
	);
};

export const getCasUser = async (session, path, ssoTicket) => {
	if (session) {
		const jwtUser = getJwtUser(session);
		if (jwtUser) {
			return {
				session,
				user: getJwtUser(session)
			};
		}
	}

	let ssoUser;
	let redirect;
	const cas = createCas(
		path,
		(user) => (ssoUser = user),
		() => (redirect = '/')
	);

	if (ssoTicket) {
		await cas.verifyTicket(
			{
				path: path,
				query: { ticket: ssoTicket }
			},
			{}
		);
		const jwt = createJwt(ssoUser);
		return {
			redirect: path,
			user: ssoUser,
			session: jwt.compact()
		};
	}

	await cas.redirectToCASLogin(
		{},
		{
			redirect: (url) => {
				redirect = url;
			}
		}
	);
	return {
		redirect,
		session
	};
};
