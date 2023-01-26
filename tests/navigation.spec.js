// @ts-check
import { test, expect } from '@playwright/test';

test.describe('navigation', () => {
	test.beforeEach(async ({ page }) => {
		await import('dotenv/config');
        const tu_id = process.env.PROFESSOR1_TUID;
        const password = process.env.PROFESSOR1_PASSWORD;

        await page.goto('/');

        await page.getByLabel('TU-ID').fill(`${tu_id}`);
        await page.getByLabel('Password').fill(`${password}`);
        
        await page.getByRole('button', { name: 'Login'}).click();

		// Expect a title "to contain" a substring.
		await expect(page).toHaveTitle(/Thesisfinder/);
	});

	test('start page has links to himself/start page', async ({ page }) => {	
		const getStarted = page.getByRole('link', { name : 'Themenübersicht' });
	
		await expect(getStarted).toHaveAttribute(
			'href',
			'/overview'
		);
	
		await getStarted.click();
	
		await expect(page).toHaveURL('https://thesisfinder-local.tu-darmstadt.de.test:5173/');
	});
});
