import Surreal from 'surrealdb.js';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAMESPACE, DB_DATABASE } from '$env/static/private';

const database = new Surreal(DB_HOST);
let initialized = false;

const getDatabase = () => {
	if (!initialized) {
		database.signin({
			user: DB_USER,
			pass: DB_PASSWORD
		});

		database.use(DB_NAMESPACE, DB_DATABASE);
		initialized = true;
	}
	return database;
};

/**
 * local database connection
 * use `import { db } from '$lib/server/db';` to import the database connection
 */
export const db = getDatabase();
