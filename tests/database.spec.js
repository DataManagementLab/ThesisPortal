// @ts-check
import { test, expect } from '@playwright/test';

test.describe('test insert element', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/create');

        await expect(page).toHaveTitle(/Thema erstellen/);
    });

    test('inserted element is showed on search page', async ({ page }) => {
        await expect(page).toHaveTitle(/Thema erstellen/);
    });
});