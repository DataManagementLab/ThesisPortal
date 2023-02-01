// @ts-check
import { test, expect, firefox } from '@playwright/test';
import { loginAsProfessor , createExampleTheme, loginAsStudent } from './utils.spec.js';
import { db } from './db.js';

test.describe("favorite of theme", () => {
    test.beforeAll(async () => {
        const browser = await firefox.launch();
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
        await loginAsStudent({ page });
    });

    test.afterAll(async () => {
        // best to delete database after each test.
        await db.query('DELETE topics');
    });

    test("test icon of de-/favorize", async({ page }) => {
        await page.getByRole('link', { name: 'Themenübersicht'}).click();
        
    });
});