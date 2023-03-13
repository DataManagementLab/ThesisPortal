// @ts-check
import { test, expect } from '@playwright/test';
import { loginAsProfessor } from './utils.spec.js';

test('homepage has title and links to login page', async ({ page }) => {
	await page.goto('/');

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Thesisfinder/);

	/*
	// create a locator
	const getStarted = page.getByRole('link', { name: 'Login' });

	// Expect an attribute "to be strictly equal" to the value.
	await expect(getStarted).toHaveAttribute(
		'href',
		'https://login-dev.hrz.tu-darmstadt.de/idp/profile/cas/login?service=https://thesisfinder-local.tu-darmstadt.de.test:5173'
	);

	// Click the get started link.
	await getStarted.click();

	// Expects the URL to contain intro.
	await expect(page).toHaveURL(/.*login-dev.hrz.tu-darmstadt.de/);
	*/
});

test('login as professor/member', async ({ page }) => {
	await page.goto('/');
	await expect(page).toHaveTitle(/Thesisfinder/);
	await page.getByRole('link', { name: 'jetzt anmelden' }).click();

	await import('dotenv/config');
	const tu_id = process.env.PROFESSOR1_TUID;
	const password = process.env.PROFESSOR1_PASSWORD;

	await page.getByLabel('TU-ID').fill(`${tu_id}`);
	await page.getByLabel('Password').fill(`${password}`);
	await page.getByRole('button', { name: 'Login' }).click();

	await expect(page.getByRole('link', { name: 'Themenübersicht' })).toBeVisible();
	await expect(page.getByRole('link', { name: 'Thema erstellen' })).toBeVisible();
	await expect(page.getByRole('link', { name: 'Profil' })).toBeVisible();
	await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
});

test('login as student', async ({ page }) => {
	await page.goto('/');
	await expect(page).toHaveTitle(/Thesisfinder/);
	await page.getByRole('link', { name: 'jetzt anmelden' }).click();

	await import('dotenv/config');
	const tu_id = process.env.STUDENT1_TUID;
	const password = process.env.STUDENT1_PASSWORD;

	await page.getByLabel('TU-ID').fill(`${tu_id}`);
	await page.getByLabel('Password').fill(`${password}`);
	await page.getByRole('button', { name: 'Login' }).click();

	await expect(page.getByRole('link', { name: 'Themenübersicht' })).toBeVisible();
	await expect(page.getByRole('link', { name: 'Thema erstellen' })).toBeHidden();
	await expect(page.getByRole('link', { name: 'Profil' })).toBeVisible();
	await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
});

test('logout', async ({ page }) => {
	await loginAsProfessor({ page });
	await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
	await page.getByRole('link', { name: 'Logout' }).click();

	await expect(page).toHaveURL(/.*login-dev.hrz.tu-darmstadt.de/);
});
