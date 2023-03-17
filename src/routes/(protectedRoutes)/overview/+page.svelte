<script>
	import { Input, TopicView } from '$lib/components';
	import Search from 'svelte-material-icons/Magnify.svelte';
	import ArrowDown from 'svelte-material-icons/ChevronDown.svelte';
	import ArrowUp from 'svelte-material-icons/ChevronUp.svelte';
	import Close from 'svelte-material-icons/Close.svelte';
	import { invalidateAll } from '$app/navigation';

	export let data;

	let formData = {
		query: data.searchData?.query ?? '',
		thesisType: data.searchData?.thesisType ?? {},
		areaOfExpertise: data.searchData?.areaOfExpertise ?? '',
		specialization: data.searchData?.specialization ?? '',
		person: data.searchData?.person ?? '',
		technologies: data.searchData?.technologies ?? ''
	};

	export const snapshot = {
		capture: () => {
			return formData;
		},
		restore: (value) => {
			formData = value;
		}
	};

	let filterOpen = false;
	let thesisType = [
		{ id: 'Bachelor', text: 'Bachelor Thesis' },
		{ id: 'Master', text: 'Master Thesis' }
	];
</script>

<form action="/search" method="GET" id="search" class="card shadow-xl bg-base-100 p-5 m-5">
	<div class="flex input-group" id="search-bar">
		<input
			type="search"
			placeholder="Suche"
			class="input outline-0 bg-base-200"
			name="query"
			bind:value={formData.query} />
		<button class="btn" title="Suche starten"><Search /></button>
		<button class="btn" title="Filtern" on:click|preventDefault={() => (filterOpen = !filterOpen)}>
			{#if filterOpen}
				<ArrowUp />
			{:else}
				<ArrowDown />
			{/if}
		</button>
		{#if data.searchData !== undefined}
			<a class="btn" title="Suche zurücksetzen" href="/overview" on:click={invalidateAll}>
				<Close />
			</a>
		{/if}
	</div>
	<div id="filter" class:open={filterOpen} class="flex flex-wrap gap-5">
		<div>
			<label class="label font-medium pt-1" for="">Nur Themen für:</label>
			{#each thesisType as tType}
				<div class="form-control">
					<label class="label justify-start cursor-pointer">
						<input
							type="checkbox"
							class="checkbox"
							name="thesisType_{tType.id}"
							bind:checked={formData.thesisType[tType.id]} />
						<span class="label-text ml-2">{tType.text}</span>
					</label>
				</div>
			{/each}
		</div>
		<div class="mr-5">
			<Input
				id="areaOfExpertise"
				label="Fachgebiet"
				suggestions
				bind:value={formData.areaOfExpertise} />
		</div>
		<div class="mr-5">
			<Input
				id="specialization"
				label="Keywords"
				suggestions
				bind:value={formData.specialization} />
		</div>
		<div class="mr-5">
			<Input
				id="person"
				label="Betreuende Person"
				placeholder="Betreuende Person"
				suggestions
				bind:value={formData.person} />
		</div>
		<div class="mr-5">
			<Input
				id="technologies"
				label="Zu verwendende Technologien"
				placeholder="Java, Python, C++ ..."
				suggestions
				bind:value={formData.technologies} />
		</div>
	</div>
</form>

<div class="card shadow-xl bg-base-100 p-3 md:p-5 m-5">
	<h2 class="text-3xl font-bold mx-5 my-3">Themenübersicht</h2>
	<TopicView data={data.topics} favorites={data.favorites} showFavoriteIcon={true} />
</div>

<style lang="scss">
	#search {
		border: 1px solid hsl(var(--b2));
		#search-bar {
			input {
				width: calc(100% - 7rem);
				+ button + button {
					border-left-width: 0;
				}
				+ button + button + a {
					border-left-width: 0;
					font-size: 1.5rem;
					background-color: transparent;
					border-color: hsl(var(--b2));
					color: hsl(var(--n));
					@media (prefers-color-scheme: dark) {
						color: hsl(var(--nc));
					}
					&:hover {
						background-color: hsl(var(--p));
						color: hsl(var(--nc));
						@media (prefers-color-scheme: dark) {
							color: hsl(var(--n));
						}
					}
				}
			}
			button {
				font-size: 1.5rem;
				background-color: transparent;
				border-color: hsl(var(--b2));
				color: hsl(var(--n));
				@media (prefers-color-scheme: dark) {
					color: hsl(var(--nc));
				}
				&:hover {
					background-color: hsl(var(--p));
					color: hsl(var(--nc));
					@media (prefers-color-scheme: dark) {
						color: hsl(var(--n));
					}
				}
			}
		}
		#filter {
			max-height: 600px;
			transition: max-height 0.5s, opacity 0s 0s;
			margin-top: 10px;
			overflow: visible;
			opacity: 1;
			&:not(.open) {
				max-height: 0;
				overflow: hidden;
				opacity: 0;
				transition: max-height 0.5s, opacity 0s 0.1s;
			}
		}
	}
</style>
