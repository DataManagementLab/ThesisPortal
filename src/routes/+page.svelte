<script>
	import { Input, TopicView } from '$lib/components';
	import Search from 'svelte-material-icons/Magnify.svelte';
	import ArrowDown from 'svelte-material-icons/ChevronDown.svelte';
	import ArrowUp from 'svelte-material-icons/ChevronUp.svelte';

	export let data;

	let filterOpen = false;
	let thesisType = [
		{ id: 'Bachelor', text: 'Bachelor Thesis' },
		{ id: 'Master', text: 'Master Thesis' }
	];
</script>

<form action="?/search" method="POST" id="search" class="card shadow-xl bg-base-100 p-5 m-5">
	<div class="flex" id="search-bar">
		<input type="search" placeholder="Suche" class="input outline-0 bg-base-200"/>
		<button class="btn" title="Suche starten"><Search /></button>
		<button class="btn" title="Filtern" on:click|preventDefault={()=>filterOpen = !filterOpen}>
			{#if filterOpen}
				<ArrowUp />
			{:else}
				<ArrowDown />
			{/if}
	</button>
	</div>
	<div id="filter" class:open={filterOpen}>
		laksjd
	</div>
</form>

<form
	action="?/filterTopic"
	method="POST"
	id="filterTopic"
	class="card shadow-xl bg-base-100 p-5 m-5">
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
			<Input id="specification" label="Fachgebiet" suggestions />
		</div>
		<div class="mr-5">
			<Input
				id="professor"
				label="Leitende(r) Professor*in"
				placeholder="Leitende(r) Professor*in"
				suggestions />
		</div>
		<div class="mr-5">
			<Input
				id="technologies"
				label="Zu verwendende Technologien"
				placeholder="Java, Python, C++ ..."
				suggestions />
		</div>
		<button type="submit" class="btn btn-primary" name="action" value="filter">Suchen</button>
		<button type="submit" class="btn btn-primary" name="action" value="showAll">
			Alle anzeigen
		</button>
	</div>
</form>

<div class="card shadow-xl bg-base-100 p-5 m-5">
	<h2 class="text-3xl font-bold mx-5 my-3">Themenübersicht</h2>
	<TopicView data={data.topics} />
</div>

<style lang="scss">
	#search {
		border: 1px solid hsl(var(--b2));
		#search-bar {
			input {
				border-top-right-radius: 0;
				border-bottom-right-radius: 0;
				width: calc(100% - 7rem);
				+ button {
					border-radius: 0;
				}
				+ button + button {
					border-top-left-radius: 0;
					border-bottom-left-radius: 0;
					border-left-width: 0;
				}
			}
			button {
				font-size: 1.5rem;
				background-color: transparent;
				border-color: hsl(var(--b2));
				&:hover {
					background-color: hsl(var(--p));
				}
			}
		}
		#filter{
			overflow: hidden;
			max-height: 30px;
			transition: max-height .5s;
			&:not(.open) {
				max-height: 0;
			}
		}
	}
</style>