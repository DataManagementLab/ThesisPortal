// @ts-check
import { test, expect } from '@playwright/test';
import { loginAsProfessor } from './utils.spec.js';

test.describe('test filterfunction', () => {
    test.beforeEach(async ({ page }) => {
        await loginAsProfessor({ page });
    });

    test('example', async ({ page }) => {

    });
});