// @ts-check
import { test, expect } from '@playwright/test';

test.describe('insert element', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });
});