// @ts-check
import { test, expect } from '@playwright/test';
import { loginAsProfessor , createExampleTheme } from './utils.spec.js';
import { db } from './db.js';

test.describe('navigation', () => {
	test.beforeEach(async ({ page }) => {
		loginAsProfessor({ page });
	});

	test.afterAll(async () => {
        // best to delete database after each test.
        db.query('DELETE topics');
    });

	test('start page has links to himself/start page', async ({ page }) => {	
		const getStarted = page.getByRole('link', { name : 'Themenübersicht' });
	
		await expect(getStarted).toHaveAttribute(
			'href',
			'/overview'
		);
	
		await getStarted.click();
	
		await expect(page).toHaveURL('https://thesisfinder-local.tu-darmstadt.de.test:5173/overview');
	});

	test('Test email provider to show', async ({ page }) => {	
		createExampleTheme({ page, theme:{title: 'Thema'}});
		await page.getByRole('link', { name: 'Themenübersicht'}).click();
		await page.mainFrame().waitForURL('/overview');
		await page.getByRole('link', { name: 'Thema'}).click();
		
	});
});
