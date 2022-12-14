<script>
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
	class="card shadow-xl bg-base-100 p-5 m-5"
>
	<h2 class="text-3xl font-bold mx-5 my-3">Thema erstellen</h2>

	<div class="w-full flex justify-start">
		<div class="mr-5">
			<div>
				{#each thesisType as tType}
					<div class="form-control">
						<label class="label justify-start cursor-pointer">
							<input type="checkbox" class="checkbox" name="thesisType_{tType.id}" />
							<span class="label-text ml-2">{tType.text}</span>
						</label>
					</div>
				{/each}
			</div>
		</div>
		<div class="mr-5">
			<!-- <MultiSelect data={areaOfExpertise} id="areaOfExpertise" label="Spezialisierung"/> -->
			<Input id="areaOfExpertise" label="Spezialisierung" suggestions placeholder="Spezialisierung"/>
		</div>
		<div>
			<Input id="specification" label="Fachgebiet" suggestions placeholder="Fachgebiet" />
		</div>
	</div>

	<Input id="title" label="Titel" placeholder="Titel" />
	<Textarea id="description" label="Beschreibung" placeholder="Beschreibung des Themas" />

	<div class="w-full flex justify-start">
		<div class="mr-5">
			<Input
				id="professor"
				label="Leitende(r) Professor*in"
				placeholder="Leitende(r) Professor*in"
				suggestions
			/>
		</div>

		<div class="mr-5">
			<Input
				id="technologies"
				label="Zu verwendende Technologien"
				placeholder="Java / Python / C++ ..."
				suggestions
			/>
		</div>
		<div>
			<Input id="email" label="E-Mail Kontakt" placeholder="me@tu-darmstadt.de" type="mail" suggestions/>
		</div>
	</div>

	<Textarea id="other" label="Sonstiges" placeholder="Sonstige Informationen" />
	<div class="flex justify-end">
		<button type="submit" class="btn btn-outline mr-5" name="draft" value="true"
			>Entwurf speichern</button
		>
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
