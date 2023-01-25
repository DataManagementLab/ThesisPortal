// @ts-check
import { test, expect } from '@playwright/test';
import { loginAsProfessor , createExampleTheme } from './utils.spec.js';

test.describe('test filterfunction', () => {
    test.beforeEach(async ({ page }) => {
        await loginAsProfessor({ page });
        let exampleBachlorTheme = {
            thesis: 'Bachelor Thesis'
        };
        await createExampleTheme({ page, theme: exampleBachlorTheme });
    });

    test('test filterfunction of bachelor/master', async ({ page }) => {
        await page.goto('/overview');
        await page.getByRole('button', { name: 'Filtern' }).click();
        await page.getByRole('checkbox', { name: 'Bachelor Thesis'}).check();
        await page.getByRole('button', { name: 'Suche starten'}).click();

        await expect(page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' }).first()).toBeVisible();
    });
});