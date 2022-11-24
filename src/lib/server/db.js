import Surreal from 'surrealdb.js';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAMESPACE, DB_DATABASE } from '$env/static/private';

const database = new Surreal(DB_HOST);

await database.signin({
	user: DB_USER,
	pass: DB_PASSWORD
});

await database.use(DB_NAMESPACE, DB_DATABASE);

/**
 * local database connection
 * use `import { db } from '$lib/server/db';` to import the database connection
 */
export const db = database;
