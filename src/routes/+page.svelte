<script>
	import { Select, TopicView, Input } from '$lib/components';

	export let data;

	let thesisType = [
		{ id: 'Bachelor', text: 'Bachelor Thesis' },
		{ id: 'Master', text: 'Master Thesis' }
	];

	let specifications = [];

	let areaOfExpertise = [
		{ id: 1, text: 'IT-Sicherheit' },
		{ id: 2, text: 'Netze und verteilte Systeme' },
		{ id: 3, text: 'Robotik, Computational und Computer Engineering' },
		{ id: 4, text: 'Software-Systeme und formale Grundlagen' },
		{ id: 5, text: 'Visual & Interactive Computing' },
		{ id: 6, text: 'Web, Wissens- und Informationsverarbeitung' }
	];

	for (let specification of data.specifications) {
		specifications.push({
			id: specification.specification,
			text: specification.specification
		});
	}
</script>

<form
	action="?/filterTopic"
	method="POST"
	id="filterTopic"
	class="card shadow-xl bg-base-100 p-5 m-5"
>
	<div class="mr-5">
		{#each thesisType as tType}
			<div class="form-control">
				<label class="label justify-start cursor-pointer">
					<input type="checkbox" class="checkbox" name="thesisType_{tType.id}" />
					<span class="label-text ml-2">{tType.text}</span>
				</label>
			</div>
		{/each}
		<div class="mr-5">
			<Select options={specifications} id="specification" label="Fachgebiet" />
		</div>
		<div class="mr-5">
			<Select options={areaOfExpertise} id="areaOfExpertise" label="Spezialisierung" />
		</div>
		<div class="mr-5"> 
			<Input id="professor" label="Leitende(r) Professor*in" placeholder="Leitende(r) Professor*in"/>
		</div>
		<button type="submit" class="btn btn-primary">Suchen</button>
	</div>
</form>

<div class="card shadow-xl bg-base-100 p-5 m-5">
	<h2 class="text-3xl font-bold mx-5 my-3">Themenübersicht</h2>
	<TopicView data={data.topics} />
</div>
