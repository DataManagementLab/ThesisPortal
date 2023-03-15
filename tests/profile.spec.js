import { test, expect } from '@playwright/test';
import { loginAsProfessor } from './utils.spec.js';
import { db } from './db.js';

test.describe('test profile page', () => {
    test.beforeEach(async ({ page }) => {
		await loginAsProfessor({ page });
	});

    test.afterEach(async ({ page }) => {
		await db.query('DELETE student');
	});

    test('test first login settings', async ({ page }) => {
        await page.getByRole('link', { name: 'Profil' }).click();
        await page.waitForURL('/profile');

        await expect(page.getByRole('link', { name: 'Einstellungen' })).toBeVisible();
        await page.getByRole('link', { name: 'Einstellungen' }).click();
        await expect(page.getByRole('button', { name: 'Account' })).toBeVisible();
        await page.getByRole('button', { name: 'Account' }).click();

        await expect(page.locator('input[name="email"]')).toHaveValue('thesisfinder_zweite.mitarbeiterin@test-tu.hrz.tu-darmstadt.de');
    });

    test('test change settings', async ({ page }) => {
        await page.getByRole('link', { name: 'Profil' }).click();
        await page.waitForURL('/profile');

        const email = 'Test@tu-darmstadt.de';
        const name = 'Person X';

        await expect(page.getByRole('link', { name: 'Einstellungen' })).toBeVisible();
        await page.getByRole('link', { name: 'Einstellungen' }).click();
        await expect(page.getByRole('button', { name: 'Account' })).toBeVisible();
        await page.getByRole('button', { name: 'Account' }).click();

        await page.locator('input[name="email"]').fill(email);
        await expect(page.locator('input[name="email"]')).toHaveValue(email);
        await page.locator('input[name="name"]').fill(name);
        await expect(page.locator('input[name="name"]')).toHaveValue(name);
        await page.locator('input[value="Speichern"]').click();

        const fachgebiet = 'Fachgebiet X';
        await page.getByRole('button', { name: 'Forschung'}).click();
        await page.locator('input[id="areaOfExpertise"]').fill(fachgebiet);
        await page.locator('input[value="Speichern"]').click();
        await expect(page.locator('input[id="areaOfExpertise"]')).toHaveValue(fachgebiet);

        await page.getByRole('link', { name: 'Profil' }).click();
        await page.waitForURL('/profile');
        await page.getByRole('button', { name: 'Account' }).click();
        await expect(page.locator('input[name="email"]')).toHaveValue(email);
        await expect(page.locator('input[name="name"]')).toHaveValue(name);
    });

    test('test prefilling of theme creation', async ({ page }) => {
        await page.getByRole('link', { name: 'Profil' }).click();
        await page.waitForURL('/profile');

        const email = 'Test@tu-darmstadt.de';
        const name = 'Person X';

        await expect(page.getByRole('link', { name: 'Einstellungen' })).toBeVisible();
        await page.getByRole('link', { name: 'Einstellungen' }).click();
        await expect(page.getByRole('button', { name: 'Account' })).toBeVisible();
        await page.getByRole('button', { name: 'Account' }).click();

        await page.locator('input[name="email"]').fill(email);
        await expect(page.locator('input[name="email"]')).toHaveValue(email);
        await page.locator('input[name="name"]').fill(name);
        await expect(page.locator('input[name="name"]')).toHaveValue(name);
        await page.locator('input[value="Speichern"]').click();
        
        await page.getByRole('link', { name: 'Thema erstellen' }).click();
        await expect(page.locator('input[id="email"]')).toHaveValue(email);
    });
});