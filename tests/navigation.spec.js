// @ts-check
import { test, expect } from '@playwright/test';
import { loginAsProfessor, createExampleTheme } from './utils.spec.js';
import { db } from './db.js';

test.describe('navigation', () => {
	test.beforeEach(async ({ page }) => {
		await loginAsProfessor({ page });
	});

	test.afterAll(async () => {
		// best to delete database after each test.
		await db.query('DELETE topics');
	});

	test('Test email provider to show', async ({ page }) => {
		await createExampleTheme({
			page,
			theme: {
				title: 'Thema',
				email: 'beispiel@tu-darmstadt.de',
				professor: 'Prof. Mustermann'
			}
		});
		await page.getByRole('link', { name: 'Themenübersicht' }).click();
		await page.mainFrame().waitForURL('/overview');
		await page
			.getByRole('heading', { name: 'Thema von Prof. Mustermann' })
			.getByRole('link', { name: 'Thema' })
			.click();

		await expect(page.getByRole('link', { name: 'beispiel@tu-darmstadt.de' })).toBeVisible();
	});
});
