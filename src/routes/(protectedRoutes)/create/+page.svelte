<script>
	export let data;
	export let form;

	import { Input, Textarea, Select } from '$lib/components';

	let thesisType = [
		{ id: 'Bachelor', text: 'Bachelor Thesis' },
		{ id: 'Master', text: 'Master Thesis' }
	];
</script>

<form
	action="?/createTopic"
	method="POST"
	id="createTopic"
	class="card shadow-xl bg-base-100 p-5 m-5">
	<h2 class="text-3xl font-bold mx-5 my-3">Thema erstellen</h2>

	<div class="w-full flex flex-wrap justify-start">
		<div class="mr-5">
			<div>
				{#each thesisType as tType}
					<div class="form-control">
						<label class="label justify-start cursor-pointer">
							<input
								type="checkbox"
								class="checkbox"
								name="thesisType_{tType.id}"
								checked={form?.formData.thesisType.includes(tType.id) ?? false} />
							<span class="label-text ml-2">{tType.text}</span>
						</label>
					</div>
				{/each}
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
				value={form?.formData?.subjectArea ?? data.userData?.subjectArea ?? ''}
				errorMsg={form?.errors?.subjectArea ?? ''}
				required />
		</div>
		<div class="mr-5">
			<Input
				id="areaOfExpertise"
				label="Fachgebiet"
				suggestions
				placeholder="Fachgebiet"
				value={form?.formData?.areaOfExpertise ?? data.userData?.areaOfExpertise ?? ''}
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
				required />
		</div>
		<div>
			<Select id="language" label="Sprache" options={[{ text: '🇩🇪', id: 'de'}, { text: '🇬🇧', id: 'en'}, { text: '🇩🇪/🇬🇧', id: 'de_en'}]}/>
		</div>
	</div>

	<Input
		id="title"
		label="Titel"
		placeholder="Titel"
		value={form?.formData?.title ?? ''}
		errorMsg={form?.errors?.title ?? ''}
		required />
	<Textarea
		id="description"
		label="Beschreibung (Markdown unterstützt)"
		placeholder="Beschreibung des Themas (inkl. Voraussetzungen, Aufgabenstellung, etc.)"
		value={form?.formData?.description ?? ''}
		errorMsg={form?.errors?.description ?? ''}
		required />

	<div class="w-full flex flex-wrap justify-start">
		<div class="mr-5">
			<Input
				id="professor"
				label="Leitende(r) Professor*in"
				placeholder="Leitende(r) Professor*in"
				suggestions
				value={form?.formData?.professor ?? ''}
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
				required />
		</div>
		<div>
			<Input
				id="email"
				label="E-Mail Kontakt"
				placeholder="me@tu-darmstadt.de"
				type="mail"
				suggestions
				value={form?.formData?.email ?? data.userData?.email ?? ''}
				errorMsg={form?.errors?.email ?? ''}
				required />
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
		<button type="submit" class="btn btn-primary">Hochladen</button>
	</div>
</form>
