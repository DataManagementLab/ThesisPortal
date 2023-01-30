import { db } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	let archived = await db.query('SELECT * FROM topics WHERE archived = true AND author = $author', {
		author: locals.session.cas.user
	});
    return {
        archived: archived[0].result
    };
};

export const actions = {
	unarchiveTopic: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());

		if (formData.unarchiveTopicId) {
			db.change(formData.unarchiveTopicId, {
				archived: false
			});
		}
		throw redirect(302, '/profile/archive');
	} 
}