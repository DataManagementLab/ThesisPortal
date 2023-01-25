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

export async function createExampleTheme ({ page, theme }) {
    await page.goto('/create');
    
    theme.thesisType ? await page.getByRole('checkbox', { name: `${theme.thesisType}`}).check() 
        : await page.getByRole('checkbox', { name: 'Bachelor Thesis'}).check();
    theme.subjectArea ? await page.getByLabel('Fachbereich').fill(`${theme.subjectArea}`)
        : await page.getByLabel('Fachbereich').fill('Informatik');
    theme.areaOfExpertise ? await page.getByLabel('Fachgebiet').fill(`${theme.areaOfExpertise}`)
        : await page.getByLabel('Fachgebiet').fill('Software Engineering'); 
    theme.specialization ? await page.getByLabel('Spezialisierung').fill(`${theme.specialization}`)
        : await page.getByLabel('Spezialisierung').fill('Software Systeme');
    theme.title ? await page.getByLabel('Titel').fill(`${theme.title}`)
        : await page.getByLabel('Titel').fill('Hier kommt der Titel der Thesisarbeit') 
    theme.description ? await page.getByLabel('Beschreibung').fill(`${theme.description}`)
        : await page.getByLabel('Beschreibung').fill('Die Beschreibung der Thesisarbeit');
    theme.professor ? await page.getByLabel('Leitende(r) Professor*in').fill(`${theme.professor}`)
        : await page.getByLabel('Leitende(r) Professor*in').fill('Prof. Mustermann');
    theme.supervisor ? await page.getByLabel('Betreuende Personen').fill(`${theme.supervisor}`)
        : await page.getByLabel('Betreuende Personen').fill('Max Mustermann');
    theme.technologies ? await page.getByLabel('Technologien').fill(`${theme.technologies}`)
        : await page.getByLabel('Technologien').fill('Java');
    theme.email ? await page.getByLabel('E-Mail Kontakt').fill(`${theme.email}`)
        : await page.getByLabel('E-Mail Kontakt').fill('mustermann@tu-darmstadt.de');
    theme.other ? await page.getByLabel('Sonstiges').fill(`${theme.other}`)
        : await page.getByLabel('Sonstiges').fill('sonstige Bemerkungen können hier beschrieben werden.');


    await page.getByRole('button', { name: 'Hochladen' }).click();
}