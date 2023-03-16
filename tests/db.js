import Surreal from 'surrealdb.js';
//import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAMESPACE, DB_DATABASE } from '$env/static/private';
await import('dotenv/config');

const database = new Surreal(process.env.DB_HOST);

await database.signin({
	user: process.env.DB_USER,
	pass: process.env.DB_PASSWORD
});

await database.use(process.env.DB_NAMESPACE, process.env.DB_DATABASE);

/**
 * local database connection
 * use `import { db } from '$lib/server/db';` to import the database connection
 */
export const db = database;
