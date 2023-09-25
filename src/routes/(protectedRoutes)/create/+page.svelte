<script>
	export let data;
	export let form;

	import { Input, Textarea, Select } from '$lib/components';

	let files;

	let bachelorChecked = form?.formData.thesisType.includes('Bachelor') ?? false;
	let masterChecked = form?.formData.thesisType.includes('Master') ?? false;
	let subjectArea = form?.formData?.subjectArea ?? data.userData?.subjectArea ?? '';
	let areaOfExpertise = form?.formData?.areaOfExpertise ?? data.userData?.areaOfExpertise ?? '';
	let specializationFilledIn = false;
	let title = form?.formData?.title ?? '';
	let description = form?.formData?.description ?? '';
	let professor = form?.formData?.professor ?? '';
	let supervisorFilledIn = false;
	let technologiesFilledIn = false;
	let email = form?.formData?.email ?? data.userData?.email ?? '';

	let allRequiredFieldsFilled = false;

	$: allRequiredFieldsFilled = (bachelorChecked || masterChecked) && 
		subjectArea.length > 0 && 
		areaOfExpertise.length > 0 && 
		specializationFilledIn &&
		title.length > 0 && 
		description.length > 0 && 
		professor.length > 0 && 
		supervisorFilledIn && 
		technologiesFilledIn && 
		email.length > 0;
</script>

<form
	action="?/createTopic"
	method="POST"
	enctype="multipart/form-data"
	id="createTopic"
	class="card shadow-xl bg-base-100 p-5 m-5">
	<h2 class="text-3xl font-bold mx-5 my-3">Thema erstellen</h2>

	<div class="w-full flex flex-wrap justify-start">
		<div class="mr-5">
			<div>
				<div class="form-control">
					<label class="label justify-start cursor-pointer">
						<input
							type="checkbox"
							class="checkbox"
							name="thesisType_Backelor"
							bind:checked={bachelorChecked} />
						<span class="label-text ml-2">Bachelor Thesis</span>
					</label>
				</div>
				<div class="form-control">
					<label class="label justify-start cursor-pointer">
						<input
							type="checkbox"
							class="checkbox"
							name="thesisType_Master"
							bind:checked={masterChecked} />
						<span class="label-text ml-2">Master Thesis</span>
					</label>
				</div>
				<label class="label font-medium pb-1" for="thesisType">
					{#if form?.errors?.thesisType}
						<span class="label-text-alt text-error">* {form?.errors?.thesisType} *</span>
					{/if}
				</label>
			</div>
		</div>
		<div class="mr-5">
			<Input
				id="subjectArea"
				label="Fachbereich"
				suggestions
				placeholder="Fachbereich"
				bind:value={subjectArea}
				errorMsg={form?.errors?.subjectArea ?? ''}
				required />
		</div>
		<div class="mr-5">
			<Input
				id="areaOfExpertise"
				label="Fachgebiet"
				suggestions
				placeholder="Fachgebiet"
				bind:value={areaOfExpertise}
				errorMsg={form?.errors?.areaOfExpertise ?? ''}
				required />
		</div>
		<div class="mr-5">
			<Input
				id="specialization"
				label="Keywords"
				placeholder="Spezialisierung"
				suggestions
				csv
				value={form?.formData?.specialization ?? data.userData?.specialization ?? ''}
				errorMsg={form?.errors?.specialization ?? ''}
				bind:filledIn={specializationFilledIn}
				required />
		</div>
		<div>
			<Select id="language" label="Sprache" options={[{ text: '🇩🇪', id: 'de'}, { text: '🇬🇧', id: 'en'}, { text: '🇩🇪/🇬🇧', id: 'de,en'}]}/>
		</div>
	</div>

	<Input
		id="title"
		label="Titel"
		placeholder="Titel"
		bind:value={title}
		errorMsg={form?.errors?.title ?? ''}
		required />
	<Textarea
		id="description"
		label="Beschreibung (Markdown unterstützt)"
		placeholder="Beschreibung des Themas (inkl. Voraussetzungen, Aufgabenstellung, etc.)"
		bind:value={description}
		errorMsg={form?.errors?.description ?? ''}
		required />

	<div class="w-full flex flex-wrap justify-start">
		<div class="mr-5">
			<Input
				id="professor"
				label="Leitende(r) Professor*in"
				placeholder="Leitende(r) Professor*in"
				suggestions
				bind:value={professor}
				errorMsg={form?.errors?.professor ?? ''}
				required />
		</div>
		<div class="mr-5">
			<Input
				id="supervisor"
				label="Betreuende Personen"
				placeholder="Betreuende Personen"
				suggestions
				csv
				value={form?.formData?.supervisor ?? data.userData?.name ?? ''}
				errorMsg={form?.errors?.supervisor ?? ''}
				bind:filledIn={supervisorFilledIn}
				required />
		</div>

		<div class="mr-5">
			<Input
				id="technologies"
				label="Technologien"
				placeholder="Java, Python, C++ ..."
				suggestions
				csv
				value={form?.formData?.technologies ?? ''}
				errorMsg={form?.errors?.technologies ?? ''}
				bind:filledIn={technologiesFilledIn}
				required />
		</div>
		<div>
			<Input
				id="email"
				label="E-Mail Kontakt"
				placeholder="me@tu-darmstadt.de"
				type="mail"
				suggestions
				bind:value={email}
				errorMsg={form?.errors?.email ?? ''}
				required />
		</div>
	</div>
	<div class="mb-3">
		<div class="form-control w-full max-w-xs">
			<label class="label" for="pdfUpload">
				<span class="label-text">PDF Dateien hochladen</span>
			</label>
			<input bind:files name="files" id="pdfUpload" type="file" multiple class="file-input file-input-bordered w-full max-w-xs" accept="application/pdf"/>
			{#if files && files.length > 0}
				<h2>Ausgewählte Dateien:</h2>
				{#each files as file}
					<div class="flex justify-between mb-1">
						<span>{file.name}</span>
					</div>
				{/each}
			{/if}
		</div>
	</div>

	<Textarea
		id="other"
		label="Sonstiges (z.B. Zeitfenster, nützliche Links, etc.) (Markdown unterstützt)"
		placeholder="Sonstige Informationen"
		value={form?.formData?.other ?? ''} />

	<div class="flex justify-end">
		<button type="submit" class="btn btn-outline mr-5" name="draft" value="true">
			Entwurf speichern
		</button>
		<button type="submit" class:hidden={!allRequiredFieldsFilled} class="btn btn-primary">Hochladen</button>
	</div>
</form>
