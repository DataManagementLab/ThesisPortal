<script>
    import { Input, Textarea, Select } from '$lib/components';

    export let data;

    let thesisType = [
		{ id: 'Bachelor', text: 'Bachelor Thesis', checked: data.thesisType.includes('Bachelor') },
		{ id: 'Master', text: 'Master Thesis', checked: data.thesisType.includes('Master') }
	];

	let areaOfExpertise = [
		{ id: 1, text: 'IT-Sicherheit' },
		{ id: 2, text: 'Netze und verteilte Systeme' },
		{ id: 3, text: 'Robotik, Computational und Computer Engineering' },
		{ id: 4, text: 'Software-Systeme und formale Grundlagen' },
		{ id: 5, text: 'Visual & Interactive Computing' },
		{ id: 6, text: 'Web, Wissens- und Informationsverarbeitung' }
	];
</script>

<form
	action="?/updateTopic"
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
							<input type="checkbox" class="checkbox" name="thesisType_{tType.id}" checked={tType.checked?'checked':''}/>
							<span class="label-text ml-2">{tType.text}</span>
						</label>
					</div>
				{/each}
			</div>
		</div>
		<div class="mr-5">
			<Select options={areaOfExpertise} id="areaOfExpertise" label="Spezialisierung" selected={data.areaOfExpertise}/>
		</div>
		<div>
			<Input id="specification" label="Fachgebiet" placeholder="Fachgebiet" value={data.specification}/>
		</div>
	</div>

	<Input id="title" label="Titel" placeholder="Titel" value={data.title}/>
	<Textarea id="description" label="Beschreibung" placeholder="Beschreibung des Themas" value={data.description}/>

	<div class="w-full flex justify-start">
		<div class="mr-5">
			<Input
				id="professor"
				label="Leitende(r) Professor*in"
				placeholder="Leitende(r) Professor*in"
                value={data.professor}
			/>
		</div>
		<div class="mr-5">
			<Input
				id="technologies"
				label="Zu verwendende Technologien"
				placeholder="Java / Python / C++ ..."
                value={data.technologies}
			/>
		</div>
		<div>
			<Input id="email" label="E-Mail Kontakt" placeholder="me@tu-darmstadt.de" type="mail" value={data.email}/>
		</div>
	</div>

	<Textarea id="other" label="Sonstiges" placeholder="Sonstige Informationen" value={data.other}/>
	<div class="flex justify-end">
		<button type="submit" class="btn btn-outline mr-5" name="draft" value="true">Entwurf speichern</button>
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