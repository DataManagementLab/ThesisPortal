// @ts-check
import { test, expect, chromium } from '@playwright/test';
import { loginAsProfessor } from './utils.spec.js';
import { db } from './db.js';

test.describe('test insert element', () => {
    test.beforeAll(async () => {
        const browser = await chromium.launch();
        const page = await browser.newPage();
        await loginAsProfessor({ page });
    });

    test.beforeEach(async ({ page }) => {
        await loginAsProfessor({ page });
    });

    test.afterAll(async () => {
        // best to delete database after each test.
        db.query('DELETE topics');
    });

    test('correct insertion', async ({ page }) => {
        await page.getByRole('link', { name: 'Thema erstellen'}).click();
        await page.mainFrame().waitForURL('/create');

        await page.getByRole('checkbox', { name: 'Bachelor Thesis'}).check();
        await page.getByLabel('Fachbereich').fill('Informatik');
        await page.getByLabel('Fachgebiet').fill('Software Engineering');
        await page.getByLabel('Spezialisierung').fill('Software Systeme');
        await page.getByLabel('Titel').fill('Hier kommt der Titel der Thesisarbeit');
        await page.getByLabel('Beschreibung').fill('Die Beschreibung der Thesisarbeit');
        await page.getByLabel('Leitende(r) Professor*in').fill('Prof. Mustermann');
        await page.getByLabel('Betreuende Personen').fill('Max Mustermann');
        await page.getByLabel('Technologien').fill('Java');
        await page.getByLabel('E-Mail Kontakt').fill('mustermann@tu-darmstadt.de');
        await page.getByLabel('Sonstiges').fill('sonstige Bemerkungen können hier beschrieben werden.');

        await page.getByRole('button', { name: 'Hochladen' }).click();

        await page.getByRole('link', { name: 'Themenübersicht'}).click();
        await page.mainFrame().waitForURL('/overview');

        await expect(page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' }).first()).toBeVisible();
    });

    test('correct insertion as draft', async ({ page }) => {
        await page.getByRole('link', { name: 'Thema erstellen'}).click();
        await page.mainFrame().waitForURL('/create');

        await page.getByRole('checkbox', { name: 'Master Thesis'}).check();
        await page.getByLabel('Fachbereich').fill('Informatik');
        await page.getByLabel('Fachgebiet').fill('Software Engineering');
        await page.getByLabel('Spezialisierung').fill('Software Systeme');
        await page.getByLabel('Titel').fill('Entwurf');
        await page.getByLabel('Beschreibung').fill('Die Beschreibung der Thesisarbeit');
        await page.getByLabel('Leitende(r) Professor*in').fill('Prof. Mustermann');
        await page.getByLabel('Betreuende Personen').fill('Max Mustermann');
        await page.getByLabel('Technologien').fill('Java');
        await page.getByLabel('E-Mail Kontakt').fill('mustermann@tu-darmstadt.de');
        await page.getByLabel('Sonstiges').fill('sonstige Bemerkungen können hier beschrieben werden.');

        await page.getByRole('button', { name: 'Entwurf speichern' }).click();

        await page.getByRole('link', { name: 'Themenübersicht'}).click();
        await page.mainFrame().waitForURL('/overview');

        await expect(page.getByRole('link', { name: 'Entwurf' }).first()).toBeHidden();
    
        await page.getByRole('link', { name: 'Profil'}).click();
        await page.mainFrame().waitForURL('/profile');

        await expect(page.getByRole('link', { name: 'Entwurf' }).first()).toBeVisible();
    });
});