// @ts-check
import { test, expect } from '@playwright/test';

test.describe('navigation', () => {
	test.beforeEach(async ({ page }) => {
		const tu_id = 'tm64mety';
        const password = 'Thesis!Finder22';

		await page.goto('/');

        await page.getByLabel('TU-ID').fill(tu_id);
        await page.getByLabel('Passwor').fill(password);
        
        await page.getByRole('button', { name: 'Login'}).click();

		// Expect a title "to contain" a substring.
		await expect(page).toHaveTitle(/Thesisfinder/);
	});

	test('start page has links to himself/start page', async ({ page }) => {	
		const getStarted = page.getByRole('link', { name : 'Themenübersicht' });
	
		await expect(getStarted).toHaveAttribute(
			'href',
			'/'
		);
	
		await getStarted.click();
	
		await expect(page).toHaveURL('https://thesisfinder-local.tu-darmstadt.de.test:5173/');
	});
});
