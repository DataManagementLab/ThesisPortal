// @ts-check
import { test, expect } from '@playwright/test';

export async function loginAsProfessor ({ page }) {
    await import('dotenv/config');
    const tu_id = process.env.PROFESSOR1_TUID;
    const password = process.env.PROFESSOR1_PASSWORD;

    await page.goto('/');
    await page.getByLabel('TU-ID').fill(`${tu_id}`);
    await page.getByLabel('Password').fill(`${password}`);
    await page.getByRole('button', { name: 'Login'}).click();
};

export async function createExampleTheme ( { page }) {
    await page.goto('/create');
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
}