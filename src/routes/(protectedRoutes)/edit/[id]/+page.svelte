<script>
	import { Input, Textarea } from '$lib/components';
	import PDFIcon from 'svelte-material-icons/FilePdfBox.svelte';
	import Delete from 'svelte-material-icons/Delete.svelte';

	export let data;

	let thesisType = [
		{ id: 'Bachelor', text: 'Bachelor Thesis', checked: data.data.thesisType.includes('Bachelor') },
		{ id: 'Master', text: 'Master Thesis', checked: data.data.thesisType.includes('Master') }
	];

	let files;
</script>

<div id="createTopic" class="card shadow-xl bg-base-100 p-5 m-5">
	<form
		action="?/updateTopic"
		enctype="multipart/form-data"
		method="POST">
		<h2 class="text-3xl font-bold mx-5 my-3">Thema erstellen</h2>

		<div class="w-full flex justify-start flex-wrap">
			<div class="mr-5">
				<div>
					{#each thesisType as tType}
						<div class="form-control">
							<label class="label justify-start cursor-pointer">
								<input
									type="checkbox"
									class="checkbox"
									name="thesisType_{tType.id}"
									checked={tType.checked ? 'checked' : ''} />
								<span class="label-text ml-2">{tType.text}</span>
							</label>
						</div>
					{/each}
				</div>
				<label class="label font-medium pb-1" for="thesisType">
					{#if data?.errors?.thesisType}
						<span class="label-text-alt text-error">*{data?.errors?.thesisType}*</span>
					{/if}
				</label>
			</div>
			<div class="mr-5">
				<Input
					id="subjectArea"
					value={data.data.subjectArea}
					label="Fachbereich"
					suggestions
					placeholder="Fachbereich"
					errorMsg={data?.errors?.subjectArea ?? ''} />
			</div>
			<div class="mr-5">
				<Input
					id="areaOfExpertise"
					value={data.data.areaOfExpertise}
					label="Fachgebiet"
					suggestions
					placeholder="Fachgebiet"
					errorMsg={data?.errors?.areaOfExpertise ?? ''} />
			</div>
			<div>
				<Input
					id="specialization"
					value={data.data.specialization}
					label="Spezialisierung"
					suggestions
					csv
					placeholder="Spezialisierung"
					errorMsg={data?.errors?.specialization ?? ''} />
			</div>
		</div>

		<Input
			id="title"
			label="Titel"
			placeholder="Titel"
			value={data.data.title}
			errorMsg={data?.errors?.title ?? ''} />
		<Textarea
			id="description"
			label="Beschreibung"
			placeholder="Beschreibung des Themas"
			value={data.data.description}
			errorMsg={data?.errors?.description ?? ''} />

		<div class="w-full flex justify-start flex-wrap">
			<div class="mr-5">
				<Input
					id="professor"
					label="Leitende(r) Professor*in"
					placeholder="Leitende(r) Professor*in"
					value={data.data.professor}
					suggestions
					errorMsg={data?.errors?.professor ?? ''} />
			</div>
			<div class="mr-5">
				<Input
					id="supervisor"
					label="Betreuende Personen"
					placeholder="Betreuende Personen"
					value={data.data.supervisor}
					suggestions
					csv
					errorMsg={data?.errors?.supervisor ?? ''} />
			</div>

			<div class="mr-5">
				<Input
					id="technologies"
					label="Zu verwendende Technologien"
					placeholder="Java, Python, C++ ..."
					value={data.data.technologies}
					suggestions
					csv
					errorMsg={data?.errors?.technologies ?? ''} />
			</div>
			<div>
				<Input
					id="email"
					label="E-Mail Kontakt"
					placeholder="me@tu-darmstadt.de"
					type="mail"
					value={data.data.email}
					suggestions
					errorMsg={data?.errors?.email ?? ''} />
			</div>
		</div>

		<Textarea
			id="other"
			label="Sonstiges"
			placeholder="Sonstige Informationen"
			value={data.data.other} />
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
		<input type="hidden" name="createdAt" value={data.data.createdAt} />
		<input type="hidden" name="lastUpdatedAt" value={data.data.lastUpdatedAt} />
		<div class="flex justify-end">
			<button type="submit" class="btn btn-outline mr-5" name="draft" value="true">
				Entwurf speichern
			</button>
			<button type="submit" class="btn btn-primary">Veröffentlichen</button>
		</div>
	</form>
	{#if data.files.length > 0}
		<div>
			<h2 class="mb-3">Dateien</h2>
			<div>
				{#each data.files as file}
					<form class="flex justify-between mb-2">
						<a
							href="/uploads/{data.data.id.split(":")[1]}/{file}"
							class="btn btn-primary btn-sm mr-2"
							title="Datei herunterladen">
							<span class="text-3xl"><PDFIcon /></span>
							{file}
						</a>
						<button
							class="btn btn-error btn-sm btn-circle text-white"
							type="submit"
							formaction="?/deleteFile"
							formmethod="POST"
							name="file"
							value="{file}">
							<span class="text-xl"><Delete /></span>
						</button>
					</form>
					{#if data.files.indexOf(file) != data.files.length - 1}
						<hr class="mb-2 border-t border-b-0">
					{/if}
				{/each}
			</div>
		</div>
	{/if}
</div>
<style lang="scss">
	@media (min-width: 1440px) {
		div#createTopic {
			margin-left: calc(50% - 700px);
			width: 1400px;
			text-align: left;
		}
	}
</style>
