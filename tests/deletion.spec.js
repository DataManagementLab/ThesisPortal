// @ts-check
import { test, expect, chromium } from '@playwright/test';
import { loginAsProfessor , createExampleTheme, loginAsStudent, logout } from './utils.spec.js';
import { db } from './db.js';

test.describe("theme deletion", () => {
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

    test("test deletion of public theme", async({ page }) => {
        await page.getByRole('link', { name: 'Profil' }).click();
        await page.mainFrame().waitForURL('/profile');

        await page.getByRole('button', { name: 'Erstellte Themen' }).click();
        await expect(page.locator('label[title="Löschen"]')).toBeVisible();
        
    });

    test("test deletion of a draft", async({ page }) => {

    });
});