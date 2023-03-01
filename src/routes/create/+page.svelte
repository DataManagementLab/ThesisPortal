<script>
	export let form;

	import { Input, Textarea } from '$lib/components';

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

	<div class="w-full flex justify-start">
		<div class="mr-5">
			<div>
				{#each thesisType as tType}
					<div class="form-control">
						<label class="label justify-start cursor-pointer">
							<input type="checkbox" class="checkbox" name="thesisType_{tType.id}" checked={form?.formData.thesisType.includes(tType.id) ?? false}/>
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
				value={form?.formData?.subjectArea ?? ''}
				errorMsg={form?.errors?.subjectArea ?? ''} />
		</div>
		<div class="mr-5">
			<Input
				id="areaOfExpertise"
				label="Fachgebiet"
				suggestions
				placeholder="Fachgebiet"
				value={form?.formData?.areaOfExpertise ?? ''}
				errorMsg={form?.errors?.areaOfExpertise ?? ''} />
		</div>
		<div>
			<Input
				id="specialization"
				label="Spezialisierung"
				placeholder="Spezialisierung"
				suggestions
				csv
				value={form?.formData?.specialization ?? ''}
				errorMsg={form?.errors?.specialization ?? ''} />
		</div>
	</div>

	<Input
		id="title"
		label="Titel"
		placeholder="Titel"
		value={form?.formData?.title ?? ''}
		errorMsg={form?.errors?.title ?? ''} />
	<Textarea
		id="description"
		label="Beschreibung"
		placeholder="Beschreibung des Themas (inkl. Voraussetzungen, Aufgabenstellung, etc.)"
		value={form?.formData?.description ?? ''}
		errorMsg={form?.errors?.description ?? ''} />

	<div class="w-full flex justify-start">
		<div class="mr-5">
			<Input
				id="professor"
				label="Leitende(r) Professor*in"
				placeholder="Leitende(r) Professor*in"
				suggestions
				value={form?.formData?.professor ?? ''}
				errorMsg={form?.errors?.professor ?? ''} />
		</div>
		<div class="mr-5">
			<Input
				id="supervisor"
				label="Betreuende Personen"
				placeholder="Betreuende Personen"
				suggestions
				csv
				value={form?.formData?.supervisor ?? ''}
				errorMsg={form?.errors?.supervisor ?? ''} />
		</div>

		<div class="mr-5">
			<Input
				id="technologies"
				label="Technologien"
				placeholder="Java, Python, C++ ..."
				suggestions
				csv
				value={form?.formData?.technologies ?? ''}
				errorMsg={form?.errors?.technologies ?? ''} />
		</div>
		<div>
			<Input
				id="email"
				label="E-Mail Kontakt"
				placeholder="me@tu-darmstadt.de"
				type="mail"
				suggestions
				value={form?.formData?.email ?? ''}
				errorMsg={form?.errors?.email ?? ''} />
		</div>
	</div>

	<Textarea
		id="other"
		label="Sonstiges (z.B. Zeitfenster, nützliche Links, etc.)"
		placeholder="Sonstige Informationen"
		value={form?.formData?.other ?? ''} />

	<div class="flex justify-end">
		<button type="submit" class="btn btn-outline mr-5" name="draft" value="true">
			Entwurf speichern
		</button>
		<button type="submit" class="btn btn-primary">Hochladen</button>
	</div>
</form>

<style lang="scss">
	form#createTopic {
		margin-left: calc(50% - 700px);
		width: 1400px;
		text-align: left;
	}
</style>
