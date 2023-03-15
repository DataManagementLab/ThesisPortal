import { test, expect } from '@playwright/test';
import { loginAsProfessor , createExampleTheme, logout, loginAsStudent } from './utils.spec.js';
import { db } from './db.js';

test.describe('test editing', () => {
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
        await db.query('DELETE topics');
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

        await expect(page.getByRole('link', { name: 'Thema X'})).toBeHidden();
        await expect(page.getByRole('link', { name: 'Thema Y' })).toBeVisible();
    });

    test('test edit/change public to draft & draft to public', async ({ page }) => {
        await page.getByRole('link', { name: 'Profil' }).click();
        await page.waitForURL('/profile');
        await page.getByRole('link', { name: 'Erstellte Themen' }).click();

        await page.getByRole('link', { name: 'Thema X'}).click();
        await page.getByTitle('edit').click();

        await page.getByRole('button', { name: 'Entwurf speichern' }).click();
        await page.getByRole('link', { name: 'Themenübersicht' }).click();
        await page.waitForURL('/overview');
        await expect(page.getByRole('link', { name: 'Thema X' })).toBeHidden();

        await page.getByRole('link', { name: 'Profil' }).click();
        await page.waitForURL('/profile');
        await page.getByRole('link', { name: 'Entwürfe' }).click();
        await expect(page.getByRole('link', { name: 'Thema X'})).toBeVisible();

        await page.getByRole('link', { name: 'Thema X'}).click();
        await page.getByRole('button', { name: 'Veröffentlichen'}).click();

        await page.getByRole('link', { name: 'Profil' }).click();
        await page.waitForURL('/profile');
        await page.getByRole('link', { name: 'Erstellte Themen' }).click();
        await expect(page.getByRole('link', { name: 'Thema X'})).toBeVisible();

        await page.getByRole('link', { name: 'Entwürfe' }).click();
        await expect(page.getByRole('link', { name: 'Thema x'})).toBeHidden();

        await page.getByRole('link', { name: 'Themenübersicht' }).click();
        await page.waitForURL('/overview');
        await expect(page.getByRole('link', { name: 'Thema x'})).toBeVisible();
    });

    test('test filter validation in editing mode', async ({ page }) => {
        await page.getByRole('link', { name: 'Profil' }).click();
        await page.waitForURL('/profile');
        await page.getByRole('link', { name: 'Erstellte Themen' }).click();

        await page.getByRole('link', { name: 'Thema X'}).click();
        await page.getByTitle('edit').click();

        await page.getByLabel('Titel').fill('');
        await page.getByRole('button', { name: 'Veröffentlichen'}).click();
        await expect(page.getByText('* Ein Titel wird benötigt *')).toBeVisible();
    });

    test('test simple hitcounter', async ({ page }) => {
        await page.getByRole('link', { name: 'Profil'}).click();
        await page.waitForURL('/profile');
        await page.getByRole('link', { name: 'Erstellte Themen'}).click();

        await expect(page.getByText('1 mal angesehen')).toBeVisible();
        for (let i = 0; i < 10; i++) {
            await page.getByRole('link', { name: 'Themenübersicht'}).click();
            await page.waitForURL('/overview');
            await page.getByRole('link', { name: 'Thema X'}).click();
        }
        await page.getByRole('link', { name: 'Profil'}).click();
        await page.waitForURL('/profile');
        await page.getByRole('link', { name: 'Erstellte Themen'}).click();
        await expect(page.getByText('11 mal angesehen')).toBeVisible();
    });
});