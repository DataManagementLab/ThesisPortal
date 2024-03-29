// @ts-check
import { test, expect } from '@playwright/test';
import { loginAsProfessor, createExampleTheme } from './utils.spec.js';
import { db } from './db.js';

test.use({
	ignoreHTTPSErrors: true
});

test.describe('test filterfunctions', () => {
	test.beforeEach(async ({ page }) => {
		await loginAsProfessor({ page });
		let exampleBachlorTheme = {
			thesisType: 'Bachelor Thesis',
			professor: 'Prof. Mustermann',
			areaOfExpertise: 'GRIS',
			technologies: 'C++'
		};
		await createExampleTheme({ page, theme: exampleBachlorTheme });
	});

	test.afterEach(async () => {
		// best to delete database after each test.
		db.query('DELETE topics');
	});

	test('test search field', async ({ page }) => {
		await page.getByRole('link', { name: 'Themenübersicht' }).click();
		await page.mainFrame().waitForURL('/overview');
		await expect(
			page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' })
		).toHaveCount(1);

		await page.getByPlaceholder('Suche').fill('Bob');
		await page.getByRole('button', { name: 'Suche starten' }).click();
		await expect(
			page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' })
		).toHaveCount(0);

		await page.getByPlaceholder('Suche').fill('Mustermann');
		await page.getByRole('button', { name: 'Suche starten' }).click();
		await expect(
			page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' })
		).toHaveCount(1);

		await page.getByPlaceholder('Suche').fill('GRIS');
		await page.getByRole('button', { name: 'Suche starten' }).click();
		await expect(
			page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' })
		).toHaveCount(1);

		await page.getByPlaceholder('Suche').fill('Java');
		await page.getByRole('button', { name: 'Suche starten' }).click();
		await expect(
			page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' })
		).toHaveCount(0);

		await page.getByPlaceholder('Suche').fill('Master Thesis');
		await page.getByRole('button', { name: 'Suche starten' }).click();
		await expect(
			page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' })
		).toHaveCount(0);
	});

	test('test filterfunction of thesis type - filter after bachelor', async ({ page }) => {
		await page.getByRole('link', { name: 'Themenübersicht' }).click();
		await page.mainFrame().waitForURL('/overview');
		await page.getByRole('button', { name: 'Filtern' }).click();
		while (!page.getByRole('checkbox', { name: 'Bachelor Thesis' }).isChecked())
			await page.getByRole('checkbox', { name: 'Bachelor Thesis' }).check();
		await page.getByRole('button', { name: 'Suche starten' }).click();

		await expect(
			page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' }).first()
		).toBeVisible();
	});

	test('test filterfunction of thesis type - filter after master', async ({ page }) => {
		await page.getByRole('link', { name: 'Themenübersicht' }).click();
		await page.mainFrame().waitForURL('/overview');
		await page.getByRole('button', { name: 'Filtern' }).click();
		await page.getByRole('checkbox', { name: 'Master Thesis' }).check();
		await page.getByRole('button', { name: 'Suche starten' }).click();

		await expect(
			page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' }).first()
		).toBeHidden();
	});

	test('test filterfunction of professor - filter after given professor', async ({ page }) => {
		await page.getByRole('link', { name: 'Themenübersicht' }).click();
		await page.mainFrame().waitForURL('/overview');
		await page.getByRole('button', { name: 'Filtern' }).click();
		await page.getByLabel('Betreuende Person').fill('Prof. Mustermann');
		await page.getByRole('button', { name: 'Suche starten' }).click();

		await expect(
			page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' }).first()
		).toBeVisible();
	});

	test('test filterfunction of professor - filter after non-given professor', async ({ page }) => {
		await page.getByRole('link', { name: 'Themenübersicht' }).click();
		await page.mainFrame().waitForURL('/overview');
		await page.getByRole('button', { name: 'Filtern' }).click();
		await page.getByLabel('Betreuende Person').fill('Prof. Mustermann2');
		await page.getByRole('button', { name: 'Suche starten' }).click();

		await expect(
			page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' }).first()
		).toBeHidden();
	});

	test('test filterfunction of technology - filter after given technology', async ({ page }) => {
		await page.getByRole('link', { name: 'Themenübersicht' }).click();
		await page.mainFrame().waitForURL('/overview');
		await page.getByRole('button', { name: 'Filtern' }).click();
		await page.getByLabel('Technologien').fill('C++');
		await page.getByRole('button', { name: 'Suche starten' }).click();

		await expect(
			page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' }).first()
		).toBeVisible();
	});

	test('test filterfunction of technology - filter after non-given technology', async ({
		page
	}) => {
		await page.getByRole('link', { name: 'Themenübersicht' }).click();
		await page.mainFrame().waitForURL('/overview');
		await page.getByRole('button', { name: 'Filtern' }).click();
		await page.getByLabel('Technologien').fill('Python');
		await page.getByRole('button', { name: 'Suche starten' }).click();

		await expect(
			page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' }).first()
		).toBeHidden();
	});

	test('test multiple filter for searching', async ({ page }) => {
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
		await createExampleTheme({ page, theme: exampleBachlorTheme });
		await createExampleTheme({ page, theme: exampleBachlorTheme2 });

		await page.getByRole('link', { name: 'Themenübersicht' }).click();
		await page.mainFrame().waitForURL('/overview');
		await expect(
			page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' })
		).toHaveCount(3);

		await page.getByRole('button', { name: 'Filtern' }).click();
		await page.getByRole('checkbox', { name: 'Master Thesis' }).check();
		await page.getByRole('button', { name: 'Suche starten' }).click();
		await expect(
			page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' })
		).toHaveCount(2);

		await page.getByRole('button', { name: 'Filtern' }).click();
		await page.getByRole('checkbox', { name: 'Master Thesis' }).check();
		await page.getByLabel('Technologien').fill('Java');
		await page.getByRole('button', { name: 'Suche starten' }).click();
		await expect(
			page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' })
		).toHaveCount(1);

		await page.getByRole('checkbox', { name: 'Master Thesis' }).check();
		await page.getByLabel('Technologien').fill('Python');

		await page.getByRole('button', { name: 'Suche starten' }).click();
		await expect(
			page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' })
		).toHaveCount(0);
	});

	test('test filter "showAll" button', async ({ page }) => {
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
		await createExampleTheme({ page, theme: exampleBachlorTheme });
		await createExampleTheme({ page, theme: exampleBachlorTheme2 });

		await page.getByRole('link', { name: 'Themenübersicht' }).click();
		await page.mainFrame().waitForURL('/overview');
		await page.getByRole('button', { name: 'Filtern' }).click();
		await page.getByLabel('Technologien').fill('Python');
		await page.getByRole('button', { name: 'Suche starten' }).click();
		await page.getByRole('link', { name: 'Suche zurücksetzen' }).click();
		await page.getByRole('link', { name: 'Themenübersicht' }).click();
		await page.mainFrame().waitForURL('/overview');
		await expect(
			page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' })
		).toHaveCount(3);
	});

	test('test empty filter search', async ({ page }) => {
		await createExampleTheme({ page, theme: [] });
		await createExampleTheme({ page, theme: [] });

		await page.getByRole('link', { name: 'Themenübersicht' }).click();
		await page.mainFrame().waitForURL('/overview');
		await expect(
			page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' })
		).toHaveCount(3);

		await page.getByRole('button', { name: 'Filtern' }).click();
		await page.getByLabel('Technologien').fill('Non given thnology');
		await page.getByRole('button', { name: 'Suche starten' }).click();
		await expect(
			page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' })
		).toHaveCount(0);

		await page.getByRole('button', { name: 'Filtern' }).click();
		await page.getByLabel('Technologien').fill('');
		await page.getByRole('button', { name: 'Suche starten' }).click();
		await expect(
			page.getByRole('link', { name: 'Hier kommt der Titel der Thesisarbeit' })
		).toHaveCount(0);
	});
});
