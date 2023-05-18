import { db } from '$lib/server/db';

export const load = async ({ locals }) => {
	let user = await db.select(`student:${locals.session.cas.user}`);
	let favorites = (
		await db.query('SELECT * FROM favorite WHERE student=$student FETCH topic', {
			student: `student:${locals.session.cas.user}`
		})
	)[0].result;
	favorites = favorites.filter((x) => x != null).map((elem) => elem.topic);

	return {
		favorites,
		user
	};
};
