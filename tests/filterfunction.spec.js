// @ts-check
import { test, expect } from '@playwright/test';
import { loginAsProfessor , createExampleTheme } from './utils.spec.js';

test.describe('test filterfunction', () => {
    test.beforeEach(async ({ page }) => {
        await loginAsProfessor({ page });
        await createExampleTheme({ page });
    });

    test('test filterfunction of bachelor/master', async ({ page }) => {
        await page.goto('/overview');

    });
});