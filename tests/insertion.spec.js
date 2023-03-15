// @ts-check
import { test, expect } from '@playwright/test';
import { loginAsProfessor } from './utils.spec.js';
import { db } from './db.js';

test.describe('test insertion of element', () => {
	test.beforeEach(async ({ page }) => {
		await loginAsProfessor({ page });
	});

	test.afterEach(async () => {
		// best to delete database after each test.
		db.query('DELETE topics');
	});

	test('correct insertion', async ({ page }) => {
		await page.getByRole('link', { name: 'Thema erstellen' }).click();
		await page.mainFrame().waitForURL('/create');

		await page.getByRole('checkbox', { name: 'Bachelor Thesis' }).check();
		await page.getByLabel('Fachbereich').fill('Informatik');
		await page.getByLabel('Fachgebiet').fill('Software Engineering');
		await page.getByLabel('Keywords').fill('Software Systeme');
		await page.getByLabel('Titel').fill('Hier kommt der Titel der Thesisarbeit');
		await page.getByLabel('Beschreibung').fill('Die Beschreibung der Thesisarbeit');
		await page.getByLabel('Leitende(r) Professor*in').fill('Prof. Mustermann');
		await page.getByLabel('Betreuende Personen').fill('Max Mustermann');
		await page.getByLabel('Technologien').fill('Java');
		await page.getByLabel('E-Mail Kontakt').fill('mustermann@tu-darmstadt.de');
		await page.getByLabel('Sonstiges').fill('sonstige Bemerkungen können hier beschrieben werden.');

		await page.getByRole('button', { name: 'Hochladen' }).click();

		await page.getByRole('link', { name: 'Themenübersicht' }).click();
		await page.mainFrame().waitForURL('/overview');

		await expect(
			page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' }).first()
		).toBeVisible();
	});

	test('correct insertion as draft', async ({ page }) => {
		await page.getByRole('link', { name: 'Thema erstellen' }).click();
		await page.mainFrame().waitForURL('/create');

		await page.getByRole('checkbox', { name: 'Master Thesis' }).check();
		await page.getByLabel('Fachbereich').fill('Informatik');
		await page.getByLabel('Fachgebiet').fill('Software Engineering');
		await page.getByLabel('Keywords').fill('Software Systeme');
		await page.getByLabel('Titel').fill('Entwurf');
		await page.getByLabel('Beschreibung').fill('Die Beschreibung der Thesisarbeit');
		await page.getByLabel('Leitende(r) Professor*in').fill('Prof. Mustermann');
		await page.getByLabel('Betreuende Personen').fill('Max Mustermann');
		await page.getByLabel('Technologien').fill('Java');
		await page.getByLabel('E-Mail Kontakt').fill('mustermann@tu-darmstadt.de');
		await page.getByLabel('Sonstiges').fill('sonstige Bemerkungen können hier beschrieben werden.');

		await page.getByRole('button', { name: 'Entwurf speichern' }).click();

		await page.getByRole('link', { name: 'Themenübersicht' }).click();
		await page.mainFrame().waitForURL('/overview');

		await expect(page.getByRole('link', { name: 'Entwurf' }).first()).toBeHidden();

		await page.getByRole('link', { name: 'Profil' }).click();
		await page.mainFrame().waitForURL('/profile');

		await page.getByRole('link', { name: 'Entwürfe' }).click();

		await expect(page.getByRole('link', { name: 'Entwurf' }).first()).toBeVisible();
	});

	test('input validation - no filled filters', async ({ page }) => {
		await page.getByRole('link', { name: 'Thema erstellen' }).click();
		await page.mainFrame().waitForURL('/create');
		await page.getByRole('button', { name: 'Hochladen' }).click();

		await expect(page.getByText('* Thesistyp(en) wird benötigt *')).toBeVisible();
		await expect(page.getByText('* Ein Fachbereich wird benötigt *')).toBeVisible();
		await expect(page.getByText('* Ein Fachgebiet wird benötigt *')).toBeVisible();
		await expect(page.getByText('* Eine Spezialisierung wird benötigt *')).toBeVisible();
		await expect(page.getByText('* Ein Titel wird benötigt *')).toBeVisible();
		await expect(page.getByText('* Eine Beschreibung wird benötigt *')).toBeVisible();
		await expect(page.getByText('* Ein(e) Professor:in wird benötigt *')).toBeVisible();
		await expect(page.getByText('* Technologien werden benötigt *')).toBeVisible();
		await expect(page.getByText('* Eine Emailadresse wird benötigt *')).toBeVisible();

		await page.getByRole('button', { name: 'Entwurf speichern' }).click();

		await page.getByRole('link', { name: 'Themenübersicht' }).click();
		await page.mainFrame().waitForURL('/overview');
		await expect(
			page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' })
		).toHaveCount(0);
	});

	test('input validation - test inputs to be saved', async ({ page }) => {
		await page.getByRole('link', { name: 'Thema erstellen' }).click();
		await page.mainFrame().waitForURL('/create');
		await page.getByLabel('Fachbereich').fill('Informatik');
		await page.getByLabel('Fachgebiet').fill('Software Engineering');
		await page.getByLabel('Titel').fill('Hier kommt der Titel der Thesisarbeit');
		await page.getByRole('button', { name: 'Hochladen' }).click();

		await expect(page.getByLabel('Fachbereich')).toHaveValue(/Informatik/);
		await expect(page.getByLabel('Fachgebiet')).toHaveValue(/Software Engineering/);
		await expect(page.getByLabel('Titel')).toHaveValue(/Hier kommt der Titel der Thesisarbeit/);

		await expect(page.getByText('* Thesistyp(en) wird benötigt *')).toBeVisible();
		await expect(page.getByText('* in Fachbereich wird benötigt *')).toBeHidden();
		await expect(page.getByText('* Ein Fachgebiet wird benötigt *')).toBeHidden();
		await expect(page.getByText('* Eine Spezialisierung wird benötigt *')).toBeVisible();
		await expect(page.getByText('* Ein Titel wird benötigt *')).toBeHidden();
		await expect(page.getByText('* Eine Beschreibung wird benötigt *')).toBeVisible();
		await expect(page.getByText('* Ein(e) Professor:in wird benötigt *')).toBeVisible();
		await expect(page.getByText('* Technologien werden benötigt *')).toBeVisible();
		await expect(page.getByText('* Eine Emailadresse wird benötigt *')).toBeVisible();

		await page.getByRole('link', { name: 'Themenübersicht' }).click();
		await page.mainFrame().waitForURL('/overview');
		await expect(page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' })).toHaveCount(0);
	});

	test('test insertion of draft without filling all input fields', async ({ page }) => {
		await page.getByRole('link', { name: 'Thema erstellen' }).click();
		await page.mainFrame().waitForURL('/create');
		await page.getByLabel('Fachbereich').fill('Informatik');
		await page.getByLabel('Fachgebiet').fill('Software Engineering');
		await page.getByLabel('Titel').fill('Hier kommt der Titel der Thesisarbeit');
		await page.getByRole('button', { name: 'Entwurf speichern' }).click();

		await page.getByRole('link', { name: 'Profil' }).click();
		await page.mainFrame().waitForURL('/profile');
		await page.getByRole('link', { name: 'Entwürfe' }).click();

		await expect(page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' }).first()).toBeVisible();
	});

	test('test insertion of draft with missing title', async({ page }) => {
		await page.getByRole('link', { name: 'Thema erstellen' }).click();
		await page.mainFrame().waitForURL('/create');
		await page.getByLabel('Fachbereich').fill('Informatik');
		await page.getByLabel('Fachgebiet').fill('Software Engineering');
		await page.getByRole('button', { name: 'Entwurf speichern' }).click();

		await page.getByRole('link', { name: 'Profil' }).click();
		await page.mainFrame().waitForURL('/profile');
		await page.getByRole('link', { name: 'Entwürfe' }).click();

		await expect(page.getByRole('link', { name: 'Entwurf' }).first()).toBeVisible();
	});
});
