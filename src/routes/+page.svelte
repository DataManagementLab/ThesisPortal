<script>
	import { Select, TopicView } from '$lib/components';

	export let data;

	let thesisType = [
		{ id: 'Bachelor', text: 'Bachelor Thesis' },
		{ id: 'Master', text: 'Master Thesis' }
	];

	let specifications = [];

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
		<button type="submit" class="btn btn-primary">Suchen</button>
	</div>
</form>

<div class="card shadow-xl bg-base-100 p-5 m-5">
	<h2 class="text-3xl font-bold mx-5 my-3">Themenübersicht</h2>
	<TopicView data={data.topics} />
</div>
