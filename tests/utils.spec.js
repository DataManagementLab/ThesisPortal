export async function loginAsProfessor({ page }) {
	await import('dotenv/config');
	const tu_id = process.env.PROFESSOR1_TUID;
	const password = process.env.PROFESSOR1_PASSWORD;

	await page.goto('/');
	await page.getByRole('link', { name: 'jetzt anmelden' }).click();
	await page.getByLabel('TU-ID').fill(`${tu_id}`);
	await page.getByLabel('Password').fill(`${password}`);
	await page.getByRole('button', { name: 'Login' }).click();
}

export async function loginAsStudent({ page }) {
	await import('dotenv/config');
	const tu_id = process.env.STUDENT1_TUID;
	const password = process.env.STUDENT1_PASSWORD;

	await page.goto('/');
	await page.getByRole('link', { name: 'jetzt anmelden' }).click();
	await page.getByLabel('TU-ID').fill(`${tu_id}`);
	await page.getByLabel('Password').fill(`${password}`);
	await page.getByRole('button', { name: 'Login' }).click();
}

export async function logout({ page }) {
	await page.getByRole('link', { name: 'logout' }).click();
}

export async function createExampleTheme({ page, theme }) {
	await page.getByRole('link', { name: 'Thema erstellen' }).click();
	await page.mainFrame().waitForURL('/create');
	await page.mainFrame().waitForURL('/create');

	(await theme.thesisType)
		? await page.getByRole('checkbox', { name: `${theme.thesisType}` }).check()
		: await page.getByRole('checkbox', { name: 'Bachelor Thesis' }).check();
	(await theme.subjectArea)
		? await page.getByLabel('Fachbereich').fill(`${theme.subjectArea}`)
		: await page.getByLabel('Fachbereich').fill('Informatik');
	(await theme.areaOfExpertise)
		? await page.getByLabel('Fachgebiet').fill(`${theme.areaOfExpertise}`)
		: await page.getByLabel('Fachgebiet').fill('Software Engineering');
	(await theme.specialization)
		? await page.getByLabel('Keywords').fill(`${theme.specialization}`)
		: await page.getByLabel('Keywords').fill('Software Systeme');
	(await theme.title)
		? await page.getByLabel('Titel').fill(`${theme.title}`)
		: await page.getByLabel('Titel').fill('Hier kommt der Titel der Thesisarbeit');
	(await theme.description)
		? await page.getByLabel('Beschreibung').fill(`${theme.description}`)
		: await page.getByLabel('Beschreibung').fill('Die Beschreibung der Thesisarbeit');
	(await theme.professor)
		? await page.getByLabel('Leitende(r) Professor*in').fill(`${theme.professor}`)
		: await page.getByLabel('Leitende(r) Professor*in').fill('Prof. Mustermann');
	(await theme.supervisor)
		? await page.getByLabel('Betreuende Personen').fill(`${theme.supervisor}`)
		: await page.getByLabel('Betreuende Personen').fill('Max Mustermann');
	(await theme.technologies)
		? await page.getByLabel('Technologien').fill(`${theme.technologies}`)
		: await page.getByLabel('Technologien').fill('Java');
	(await theme.email)
		? await page.getByLabel('E-Mail Kontakt').fill(`${theme.email}`)
		: await page.getByLabel('E-Mail Kontakt').fill('mustermann@tu-darmstadt.de');
	(await theme.other)
		? await page.getByLabel('Sonstiges').fill(`${theme.other}`)
		: await page
				.getByLabel('Sonstiges')
				.fill('sonstige Bemerkungen können hier beschrieben werden.');

	(await theme.thesisType)
		? await page.getByRole('checkbox', { name: `${theme.thesisType}` }).check()
		: await page.getByRole('checkbox', { name: 'Bachelor Thesis' }).check();
	(await theme.subjectArea)
		? await page.getByLabel('Fachbereich').fill(`${theme.subjectArea}`)
		: await page.getByLabel('Fachbereich').fill('Informatik');
	(await theme.areaOfExpertise)
		? await page.getByLabel('Fachgebiet').fill(`${theme.areaOfExpertise}`)
		: await page.getByLabel('Fachgebiet').fill('Software Engineering');

	if (theme.draft) {
		await page.getByRole('button', { name: 'Entwurf speichern' }).click();
	} else {
		await page.getByRole('button', { name: 'Hochladen' }).click();
	}
}
