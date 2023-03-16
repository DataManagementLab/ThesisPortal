// @ts-check
import { test, expect, chromium } from '@playwright/test';
import { loginAsProfessor, createExampleTheme, loginAsStudent } from './utils.spec.js';
import { db } from './db.js';

test.use({
	ignoreHTTPSErrors: true
});

test.describe('test favorization of theme', () => {
	test.beforeAll(async () => {
		const browser = await chromium.launch();
		const page = await browser.newPage();
		await loginAsProfessor({ page });
		let exampleBachlorTheme = {
			thesisType: 'Bachelor Thesis',
			professor: 'Prof. Mustermann',
			areaOfExpertise: 'GRIS',
			technologies: 'C++'
		};
		await createExampleTheme({ page, theme: exampleBachlorTheme });
	});

	test.beforeEach(async ({ page }) => {
		await loginAsStudent({ page });
	});

	test.afterEach(async () => {
		// best to delete database after each test.
		await db.query('DELETE favorites');
	});

	test.afterAll(async () => {
		// best to delete database after each test.
		await db.query('DELETE topics');
	});

	test('test un-/favorize of a theme in detail page', async ({ page }) => {
		await page.getByRole('link', { name: 'Themenübersicht' }).click();
		await page.waitForURL('/overview');
		await page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' }).click();

		await expect(page.locator('button[name="topicId"]')).toBeVisible();
		await expect(page.locator('input[name="favoriteId"]')).toBeHidden();
		await expect(page.locator('input[name=type]')).toHaveValue('favorize');
		await page.locator('button[name="topicId"]').click();
		await expect(page.locator('input[name=type]')).toHaveValue('unfavorize');

		await page.getByRole('link', { name: 'Profil' }).click();
		await page.mainFrame().waitForURL('/profile');
		await expect(page.getByText('Favorisierte Themen')).toBeVisible();

		await expect(
			page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' }).first()
		).toBeVisible();

		await page.getByRole('link', { name: 'Themenübersicht' }).click();
		await page.mainFrame().waitForURL('/overview');

		await expect(page.locator('button[name="topicId"]')).toBeVisible();
		await expect(page.locator('input[name="favoriteId"]')).toBeHidden();
		await expect(page.locator('input[name=type]')).toHaveValue('unfavorize');
		await page.locator('button[name="topicId"]').click();
		await expect(page.locator('input[name=type]')).toHaveValue('favorize');

		await page.getByRole('link', { name: 'Profil' }).click();
		await page.mainFrame().waitForURL('/profile');
		await expect(page.getByText('Favorisierte Themen')).toBeVisible();

		await expect(
			page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' }).first()
		).toBeHidden();
	});

	test('test icon of un-/favorize', async ({ page }) => {
		await page.getByRole('link', { name: 'Themenübersicht' }).click();
		await page.waitForURL('/overview');

		await expect(page.locator('button[name="topicId"]')).toBeVisible();
		await expect(page.locator('input[name="favoriteId"]')).toBeHidden();
		await expect(page.locator('input[name=type]')).toHaveValue('favorize');
		await page.locator('button[name="topicId"]').click();
		await expect(page.locator('input[name=type]')).toHaveValue('unfavorize');
		await page.locator('button[name="topicId"]').click();
		await expect(page.locator('input[name=type]')).toHaveValue('favorize');
		await page.locator('button[name="topicId"]').click();
		await expect(page.locator('input[name=type]')).toHaveValue('unfavorize');
		await page.locator('button[name="topicId"]').click();
	});

	test('test un-/favorize of a theme', async ({ page }) => {
		await page.getByRole('link', { name: 'Themenübersicht' }).click();
		await page.waitForURL('/overview');

		await expect(page.locator('button[name="topicId"]')).toBeVisible();
		await expect(page.locator('input[name="favoriteId"]')).toBeHidden();
		await expect(page.locator('input[name=type]')).toHaveValue('favorize');
		await page.locator('button[name="topicId"]').click();
		await expect(page.locator('input[name=type]')).toHaveValue('unfavorize');

		await page.getByRole('link', { name: 'Profil' }).click();
		await page.waitForURL('/profile');
		await expect(page.getByText('Favorisierte Themen')).toBeVisible();

		await expect(
			page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' }).first()
		).toBeVisible();

		await page.getByRole('link', { name: 'Themenübersicht' }).click();
		await page.mainFrame().waitForURL('/overview');

		await expect(page.locator('button[name="topicId"]')).toBeVisible();
		await expect(page.locator('input[name="favoriteId"]')).toBeHidden();
		await expect(page.locator('input[name=type]')).toHaveValue('unfavorize');
		await page.locator('button[name="topicId"]').click();
		await expect(page.locator('input[name=type]')).toHaveValue('favorize');

		await page.getByRole('link', { name: 'Profil' }).click();
		await page.mainFrame().waitForURL('/profile');
		await expect(page.getByText('Favorisierte Themen')).toBeVisible();

		await expect(
			page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' }).first()
		).toBeHidden();
	});
});
