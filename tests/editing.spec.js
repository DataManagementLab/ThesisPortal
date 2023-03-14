import { test, expect } from '@playwright/test';
import { loginAsProfessor , createExampleTheme } from './utils.spec.js';
import { db } from './db.js';

test.describe('test filterfunctions', () => {
    test.beforeEach(async ({ page }) => {
        await loginAsProfessor({ page });
        let exampleBachlorTheme = {
            thesisType: 'Bachelor Thesis',
            professor: 'Prof. Mustermann',
            areaOfExpertise: 'GRIS',
            technologies: 'C++',
            title: 'Thema X'
        };
        await createExampleTheme({ page, theme: exampleBachlorTheme });
    });

    test.afterEach(async () => {
        // best to delete database after each test.
        db.query('DELETE topics');
    });

    test('test editing a public theme', async ({ page }) => {
        await page.getByRole('link', { name: 'Profil' }).click();
        await page.waitForURL('/profile');
        await page.getByRole('link', { name: 'Erstellte Themen' }).click();

        await page.getByRole('link', { name: 'Thema X'}).click();
        await page.getByTitle('edit').click();

        await page.getByLabel('Titel').fill('Thema Y');
        await page.getByRole('button', { name: 'Veröffentlichen' }).click();

        await page.getByRole('link', { name: 'Themenübersicht' }).click();
        await page.mainFrame().waitForURL('/overview');

        await expect(page.getByRole('link', { name: 'Thema X '})).toBeHidden();
        await expect(page.getByRole('link', { name: 'Thema Y' })).toBeVisible();
    });
});