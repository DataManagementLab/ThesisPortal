import { db } from '$lib/server/db';
import path from 'path';
import fs from 'fs/promises';
import fsSync from 'fs';

export const load = async ({ locals, params }) => {
	let id = params.id;
	let data = await db.query('SELECT * FROM $id', {
		id: `topics:${id}`
	});
	await db.query('UPDATE $id SET views = views + 1', {
		id: `topics:${id}`
	});
	let favorites = (
		await db.query('SELECT * FROM favorite WHERE student = $student', {
			student: `student:${locals.session.cas.user}`
		})
	)[0].result;
	const directoryPath = path.join(process.cwd(), 'static', 'uploads', id);
	let files = await fsSync.existsSync(directoryPath) ? await fs.readdir(directoryPath) : [];
	return {
		topic: data[0].result[0],
		files,
		favorites
	};
};

export const actions = {
	markUnmarkFavorite: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData());

		if (formData.type == 'favorize') {
			await db.create('favorite', {
				student: `student:${locals.session.cas.user}`,
				topic: formData.topicId
			});
		} else if (formData.type == 'unfavorize' && formData.favoriteId) {
			await db.delete(formData.favoriteId);
		}
	}
};
