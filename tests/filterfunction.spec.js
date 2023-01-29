// @ts-check
import { test, expect, chromium } from '@playwright/test';
import { loginAsProfessor , createExampleTheme, logout } from './utils.spec.js';
import { db } from './db.js';

test.describe('test filterfunctions', () => {
    
    test.beforeAll(async () => {
        const browser = await chromium.launch();
        const page = await browser.newPage();
        await loginAsProfessor({ page });
        let exampleBachlorTheme = {
            thesisType: 'Bachelor Thesis',
            professor: 'Prof. Mustermann',
            areaOfExpertise: 'GRIS',
            technologies: 'C++'
        };
        await createExampleTheme({ page, theme: exampleBachlorTheme });
    });

    test.beforeEach(async ({ page }) => {
        await loginAsProfessor({ page });
    });

    test.afterAll(async () => {
        // best to delete database after each test.
        db.query('DELETE topics');
    });
    
    test('test filterfunction of thesis type - filter after bachelor', async ({ page }) => {
        //await loginAsProfessor({ page });
        await page.getByRole('link', { name: 'Themenübersicht'}).click();
        await page.mainFrame().waitForURL('/overview');
        await page.getByRole('button', { name: 'Filtern' }).click();
        await page.getByRole('checkbox', { name: 'Bachelor Thesis'}).check();
        await page.getByRole('button', { name: 'Suche starten'}).click();

        await expect(page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' }).first()).toBeVisible();
    });

    test('test filterfunction of thesis type - filter after master', async ({ page }) => {
        await page.getByRole('link', { name: 'Themenübersicht'}).click();
        await page.mainFrame().waitForURL('/overview');
        await page.getByRole('button', { name: 'Filtern' }).click();
        await page.getByRole('checkbox', { name: 'Master Thesis'}).check();
        await page.getByRole('button', { name: 'Suche starten'}).click();

        await expect(page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' }).first()).toBeHidden();
    });

    test('test filterfunction of professor - filter after given professor', async ({ page }) => {
        await page.getByRole('link', { name: 'Themenübersicht'}).click();
        await page.mainFrame().waitForURL('/overview');
        await page.getByRole('button', { name: 'Filtern' }).click();
        await page.getByLabel('Betreuende Person').fill('Prof. Mustermann');
        await page.getByRole('button', { name: 'Suche starten'}).click();

        await expect(page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' }).first()).toBeVisible();
    });

    test('test filterfunction of professor - filter after non-given professor', async ({ page }) => {
        await page.getByRole('link', { name: 'Themenübersicht'}).click();
        await page.mainFrame().waitForURL('/overview');
        await page.getByRole('button', { name: 'Filtern' }).click();
        await page.getByLabel('Betreuende Person').fill('Prof. Mustermann2');
        await page.getByRole('button', { name: 'Suche starten'}).click();

        await expect(page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' }).first()).toBeHidden();
    });

    test('test filterfunction of technology - filter after given technology', async ({ page }) => {
        await page.getByRole('link', { name: 'Themenübersicht'}).click();
        await page.mainFrame().waitForURL('/overview');
        await page.getByRole('button', { name: 'Filtern' }).click();
        await page.getByLabel('Technologien').fill('C++');
        await page.getByRole('button', { name: 'Suche starten'}).click();

        await expect(page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' }).first()).toBeVisible();
    });

    test('test filterfunction of technology - filter after non-given technology', async ({ page }) => {
        await page.getByRole('link', { name: 'Themenübersicht'}).click();
        await page.mainFrame().waitForURL('/overview');
        await page.getByRole('button', { name: 'Filtern' }).click();
        await page.getByLabel('Technologien').fill('Python');
        await page.getByRole('button', { name: 'Suche starten'}).click();

        await expect(page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' }).first()).toBeHidden();
    });

    test('test multiple filter for searching', async({ page }) => {
        let exampleBachlorTheme = {
            thesisType: 'Master Thesis',
            professor: 'Prof. Mustermann',
            areaOfExpertise: 'GRIS',
            technologies: 'C++'
        };
        let exampleBachlorTheme2 = {
            thesisType: 'Master Thesis',
            professor: 'Prof. Mustermann',
            areaOfExpertise: 'GRIS',
            technologies: 'Java'
        };

        await createExampleTheme({ page, theme: exampleBachlorTheme});
        await createExampleTheme({ page, theme: exampleBachlorTheme2});

        await page.getByRole('link', { name: 'Themenübersicht'}).click();
        await page.mainFrame().waitForURL('/overview');
        await expect(page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' })).toHaveCount(3);

        await page.getByRole('button', { name: 'Filtern' }).click();
        await page.getByRole('checkbox', { name: 'Master Thesis'}).check();
        await page.getByRole('button', { name: 'Suche starten'}).click();
        await expect(page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' })).toHaveCount(2);

        await page.getByRole('button', { name: 'Filtern' }).click();
        await page.getByRole('checkbox', { name: 'Master Thesis'}).check();
        await page.getByLabel('Technologien').fill('Java');
        await page.getByRole('button', { name: 'Suche starten'}).click();
        await expect(page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' })).toHaveCount(2);

        await page.getByRole('button', { name: 'Filtern' }).click();
        await page.getByRole('checkbox', { name: 'Master Thesis'}).check();
        await page.getByLabel('Technologien').fill('Python');
        await page.getByRole('button', { name: 'Suche starten'}).click();
        await expect(page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' })).toHaveCount(2);
    });

    test('test filter "showAll" button', async({ page }) => {
        await page.getByRole('link', { name: 'Themenübersicht'}).click();
        await page.mainFrame().waitForURL('/overview');
        await page.getByRole('button', { name: 'Filtern' }).click();
        await page.getByLabel('Technologien').fill('Python');
        await page.getByRole('button', { name: 'Suche starten'}).click();
        await page.getByRole('link', { name: 'Suche zurücksetzen'}).click();
        await page.getByRole('link', { name: 'Themenübersicht'}).click();
        await page.mainFrame().waitForURL('/overview');
        await expect(page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' })).toHaveCount(3);
    });
});