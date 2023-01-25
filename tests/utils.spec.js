// @ts-check
import { test, expect } from '@playwright/test';

export async function loginAsProfessor ({ page }) {
    await import('dotenv/config');
    const tu_id = process.env.PROFESSOR1_TUID;
    const password = process.env.PROFESSOR1_PASSWORD;

    await page.goto('/');
};