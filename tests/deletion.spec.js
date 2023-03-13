// @ts-check
import { test, expect } from '@playwright/test';
import { loginAsProfessor , createExampleTheme} from './utils.spec.js';
import { db } from './db.js';

test.describe("theme deletion", () => {
    test.beforeEach(async ({ page }) => {
        await loginAsProfessor({ page });
    });

    test.afterEach(async () => {
        // best to delete database after each test.
        await db.query('DELETE topics');
    });

    test("test deletion of public theme", async({ page }) => {
        await createExampleTheme({ page, theme: [] });

        await page.getByRole('link', { name: 'Profil' }).click();
        await page.mainFrame().waitForURL('/profile');

        await page.getByRole('link', { name: 'Erstellte Themen' }).click();
        await expect(page.locator('label[title="Löschen"]')).toBeVisible();
        await page.locator('label[title="Löschen"]').click();

        await expect(page.getByRole('button', { name: 'Bestätigen' })).toBeVisible();
        await page.getByRole('button', { name: 'Bestätigen' }).click();

        await page.getByRole('link', { name: 'Erstellte Themen' }).click();

        await expect(page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' })).toHaveCount(0);
    });

    test("test interruption of a public theme deletion", async({ page }) => {
        await createExampleTheme({ page, theme: [] });

        await page.getByRole('link', { name: 'Profil' }).click();
        await page.mainFrame().waitForURL('/profile');

        await page.getByRole('link', { name: 'Erstellte Themen' }).click();
        await expect(page.locator('label[title="Löschen"]')).toBeVisible();
        await page.locator('label[title="Löschen"]').click();

        await expect(page.locator('#delete').getByText('Abbrechen')).toBeVisible();
        await page.locator('#delete').getByText('Abbrechen').click();

        await page.getByRole('link', { name: 'Erstellte Themen' }).click();

        await expect(page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' })).toHaveCount(1);
    });

    test("test deletion of a draft", async({ page }) => {
        let exampleBachlorTheme = {
            draft: true
        };
        await createExampleTheme({ page, theme: exampleBachlorTheme });

        await page.getByRole('link', { name: 'Profil' }).click();
        await page.mainFrame().waitForURL('/profile');

        await page.getByRole('link', { name: 'Entwürfe' }).click();
        await expect(page.locator('label[title="Löschen"]')).toBeVisible();
        await page.locator('label[title="Löschen"]').click();

        await expect(page.getByRole('button', { name: 'Bestätigen' })).toBeVisible();
        await page.getByRole('button', { name: 'Bestätigen' }).click();

        await page.getByRole('link', { name: 'Entwürfe' }).click();

        await expect(page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' })).toHaveCount(0);
    });

    test("test interruption of a draft deletion", async({ page }) => {
        let exampleBachlorTheme = {
            draft: true
        };
        await createExampleTheme({ page, theme: exampleBachlorTheme });

        await page.getByRole('link', { name: 'Profil' }).click();
        await page.mainFrame().waitForURL('/profile');

        await page.getByRole('link', { name: 'Entwürfe' }).click();
        await expect(page.locator('label[title="Löschen"]')).toBeVisible();
        await page.locator('label[title="Löschen"]').click();

        await expect(page.locator('#delete').getByText('Abbrechen')).toBeVisible();
        await page.locator('#delete').getByText('Abbrechen').click();

        await page.getByRole('link', { name: 'Entwürfe' }).click();

        await expect(page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' })).toHaveCount(1);
    });

    test("test archive/de-archive of public theme", async({ page }) => {
        await createExampleTheme({ page, theme: [] });

        await page.getByRole('link', { name: 'Profil' }).click();
        await page.mainFrame().waitForURL('/profile');

        await page.getByRole('link', { name: 'Erstellte Themen' }).click();
        await expect(page.locator('label[title="Archivieren"]')).toBeVisible();
        await page.locator('label[title="Archivieren"]').click();

        await expect(page.getByRole('button', { name: 'Bestätigen' })).toBeVisible();
        await page.getByRole('button', { name: 'Bestätigen' }).click();

        await page.getByRole('link', { name: 'Erstellte Themen' }).click();
        await expect(page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' })).toHaveCount(0);

        await page.getByRole('link', { name: 'Archiv' }).click();
        await expect(page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' })).toHaveCount(1);

        await expect(page.locator('label[title="Aus Archiv entfernen"]')).toBeVisible();
        await page.locator('label[title="Aus Archiv entfernen"]').click();
        await expect(page.getByRole('button', { name: 'Bestätigen' })).toBeVisible();
        await page.getByRole('button', { name: 'Bestätigen' }).click();

        await page.getByRole('link', { name: 'Erstellte Themen' }).click();
        await expect(page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' })).toHaveCount(1);

        await page.getByRole('link', { name: 'Archiv' }).click();
        await expect(page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' })).toHaveCount(0);
    });

    test("test interruption of archive of public theme", async({ page }) => {
        await createExampleTheme({ page, theme: [] });

        await page.getByRole('link', { name: 'Profil' }).click();
        await page.mainFrame().waitForURL('/profile');

        await page.getByRole('link', { name: 'Erstellte Themen' }).click();
        await expect(page.locator('label[title="Archivieren"]')).toBeVisible();
        await page.locator('label[title="Archivieren"]').click();

        await expect(page.locator('#archive').getByText('Abbrechen')).toBeVisible();
        await page.locator('#archive').getByText('Abbrechen').click();

        await page.getByRole('link', { name: 'Erstellte Themen' }).click();
        await expect(page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' })).toHaveCount(1);

        await page.getByRole('link', { name: 'Archiv' }).click();
        await expect(page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' })).toHaveCount(0);
    });
});