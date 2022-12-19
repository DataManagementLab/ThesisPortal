<script>
	import { Input, TopicView } from '$lib/components';

	export let data;

	let thesisType = [
		{ id: 'Bachelor', text: 'Bachelor Thesis' },
		{ id: 'Master', text: 'Master Thesis' }
	];
</script>

<form
	action="?/filterTopic"
	method="POST"
	id="filterTopic"
	class="card shadow-xl bg-base-100 p-5 m-5"
>
	<div class="mr-5 flex">
		{#each thesisType as tType}
			<div class="form-control">
				<label class="label justify-start cursor-pointer">
					<input type="checkbox" class="checkbox" name="thesisType_{tType.id}" />
					<span class="label-text ml-2">{tType.text}</span>
				</label>
			</div>
		{/each}
		<div class="mr-5">
			<Input id="areaOfExpertise" label="Spezialisierung" suggestions />
		</div>
		<div class="mr-5">
			<Input id="specification" label="Fachgebiet" suggestions/>
		</div>
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
				placeholder="Java, Python, C++ ..."
				suggestions
			/>
		</div>
		<button type="submit" class="btn btn-primary" name="action" value="filter">Suchen</button>
		<button type="submit" class="btn btn-primary" name="action" value="showAll"
			>Alle anzeigen</button
		>
	</div>
</form>

<div class="card shadow-xl bg-base-100 p-5 m-5">
	<h2 class="text-3xl font-bold mx-5 my-3">Themenübersicht</h2>
	<TopicView data={data.topics} />
</div>
