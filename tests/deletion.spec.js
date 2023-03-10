// @ts-check
import { test, expect, chromium } from '@playwright/test';
import { loginAsProfessor , createExampleTheme, loginAsStudent, logout } from './utils.spec.js';
import { db } from './db.js';

test.describe("theme deletion", () => {
    
});