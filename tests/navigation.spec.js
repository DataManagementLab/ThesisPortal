// @ts-check
import { test, expect } from '@playwright/test';

test.describe('navigation', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');

		// Expect a title "to contain" a substring.
		await expect(page).toHaveTitle(/Thesisfinder/);
	});

	test('start page has title and links to login page', async ({ page }) => {	
		// create a locator
		const getStarted = page.getByRole('link', { name: 'Login' });
	
		// Expect an attribute "to be strictly equal" to the value.
		await expect(getStarted).toHaveAttribute(
			'href',
			'https://login-dev.hrz.tu-darmstadt.de/idp/profile/cas/login?service=http://thesisfinder-local.tu-darmstadt.de.test:5173'
		);
	
		// Click the get started link.
		await getStarted.click();
	
		// Expects the URL to contain intro.
		await expect(page).toHaveURL(/.*login-dev.hrz.tu-darmstadt.de/);
	});

	test('start page has links to himself/start page', async ({ page }) => {	
		const getStarted = page.getByRole('link', { name : 'Themenübersicht' });
	
		await expect(getStarted).toHaveAttribute(
			'href',
			'/'
		);
	
		await getStarted.click();
	
		await expect(page).toHaveURL('/');
	});
});

/*
test.describe('test labels', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');

		// Expect a title "to contain" a substring.
		await expect(page).toHaveTitle(/Thesisfinder/);
	});

	test('topic overview has correct heading', async ({ page }) => {
		await expect(page.getByRole('heading', { name: 'Themenübersicht' })).toBeVisible();
	});

	test('test checkboxes', async({ page }) => {
		const checkbox = page.getByRole('checkbox', { name : 'Bachelor Thesis'});
		await expect(checkbox).toBeVisible();
		await checkbox.check();
		await expect(checkbox).toBeChecked();

		page.getByRole('checkbox', { name : 'Master Thesis'});
		await expect(checkbox).toBeVisible();
		await checkbox.check();
		await expect(checkbox).toBeChecked();
	});
});
*/