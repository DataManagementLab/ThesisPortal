// @ts-check
import { test, expect } from '@playwright/test';

test.describe('test insert element', () => {
    test.beforeEach(async ({ page }) => {
        //await page.goto('http://localhost:5173/create');
        await page.goto('/');
    });

    test('correct insertion', async ({ page }) => {
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

        //await page.goto('http://localhost:5173/');
        await page.goto('/');

        await expect(page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' })).toBeVisible();
    });
});