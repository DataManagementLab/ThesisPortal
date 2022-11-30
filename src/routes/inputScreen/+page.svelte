<script>
	import { Input, Select, Textarea } from '$lib/components';

	let thesisType = [
		{ id: 1, text: 'Bachelor Thesis' },
		{ id: 2, text: 'Master Thesis' },
		{ id: 3, text: 'Bachelor Thesis oder Master Thesis' }
	];

	let areaOfExpertise = [
		{ id: 1, text: 'IT-Sicherheit' },
		{ id: 2, text: 'Netze und verteilte Systeme' },
		{ id: 3, text: 'Robotik, Computational und Computer Engineering' },
		{ id: 4, text: 'Software-Systeme und formale Grundlagen' },
		{ id: 5, text: 'Visual & Interactive Computing' },
		{ id: 6, text: 'Web, Wissens- und Informationsverarbeitung' }
	];
	export let form;
</script>

<form action="?/createTopic" method="POST" id="createTopic" class="card shadow-xl bg-base-100 p-5 m-5">
	<h2 class="text-3xl font-bold mx-5 my-3">Thema erstellen</h2>

	<div class="w-full flex justify-start">
		<div class="mr-5">
			<Select options={thesisType} id="thesisType" label="Thesistyp" />
		</div>
		<div class="mr-5">
			<Select options={areaOfExpertise} id="areaOfExpertise" label="Fachgebiet" />
		</div>
		<div>
			<Input id="specification" label="Fachgebiet" placeholder="Fachgebiet" />
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
			/>
		</div>
		<div class="mr-5">
			<Input
				id="technologies"
				label="Zu verwendende Technologien"
				placeholder="Java / Python / C++ ..."
			/>
		</div>
		<div>
			<Input id="email" label="E-Mail Kontakt" placeholder="me@tu-darmstadt.de" type="mail" />
		</div>
	</div>

	<Textarea id="other" label="Sonstiges" placeholder="Sonstige Informationen" />
	<div class="flex justify-end">
		<button type="submit" class="btn btn-outline mr-5">Entwurf speichern</button>
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
