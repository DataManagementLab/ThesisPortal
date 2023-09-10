import { CAS_HOST } from '$env/static/private';
import { PUBLIC_HOST, PUBLIC_PORT } from '$env/static/public';
import { db } from '$lib/server/db';

export const load = async ({ locals }) => {
	if (locals.session.cas) checkAddStudent(locals.session.cas);

	return {
		user: locals.session.cas,
		CAS_HOST,
		PUBLIC_HOST,
		PUBLIC_PORT
	};
};

async function checkAddStudent(tuid) {
	const user = await db.select(`student:${tuid.user}`);
	if (user) return;
	let affiliation =
		tuid.attributes.eduPersonAffiliation[0]._text == 'member'
			? tuid.attributes.eduPersonAffiliation[1]._text
			: tuid.attributes.eduPersonAffiliation[0]._text;
	let name = tuid.attributes.cn[0]._text;
	name = name.split(',').reverse().join(' ').trim();
	await db.create(`student:${tuid.user}`, {
		name,
		affiliation,
		email: tuid.attributes.mail?._text ?? ''
	});
}
