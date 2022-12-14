<script>
	import { onMount } from 'svelte';
	import fuzzysort from 'fuzzysort';

	export let id;
	export let type = 'text';
	export let label;
	export let value = '';
	export let placeholder = '';
	export let disabled = false;
	export let required = false;
	export let suggestions = undefined;

	let loadedSuggestions = [];

	onMount(()=>{
		loadSuggestions();
	})

	function update(e){
		if (e.charCode === 13) {
			e.preventDefault();
		} else {
			value += String.fromCharCode(e.charCode);
		}
		loadSuggestions();
	}

	function loadSuggestions(){
		if(suggestions === undefined)
			return;
		fetch("/api/suggestions", {
			method: 'POST',
			body: JSON.stringify({
				field: id,
				query: value
			})
		}).then(async data => {
			data = await data.json();
			let s = Symbol();
			loadedSuggestions = fuzzysort.go(value, data.map(v => ({target: v, [s]: fuzzysort.prepare(v)})), {key: s}).map(x => x.target);
		})
	}
	function typeAction(node){
		node.type = type;
	}
</script>

<div class:suggestions={suggestions !== undefined}>
	<label class="label font-medium pb-1" for={id}>
		<span class="label-text">{label}</span>
	</label>
	<input
		class="input w-full outline-0 bg-base-200"
		class:mb-5={suggestions === undefined}
		class:hasResults={loadedSuggestions.length > 0}
		use:typeAction
		{placeholder}
		{required}
		{disabled}
		{id}
		name={id}
		autocomplete="off"
		bind:value={value}
		on:keypress|preventDefault={update}
	/>
	{#if suggestions !== undefined && loadedSuggestions.length > 0}
		<datalist class="bg-base-200 w-full">
			{#each loadedSuggestions as suggestion}
				<option value={suggestion} on:click={() => value = suggestion}>{suggestion}</option>
			{/each}
		</datalist>
	{/if}
</div>

<style lang="scss">
	input {
		&:hover, &:focus{
			border-color: hsl(var(--p) / var(--tw-bg-opacity));
		}
	}
	.suggestions {
		position: relative;
		& > input {
			&:focus {
				background-color: hsl(var(--b3) / var(--tw-bg-opacity));
				border-color: hsl(var(--p) / var(--tw-bg-opacity));
				z-index: 101;
				position: relative;
				&:is(input.hasResults){
					border-bottom: 0;
					border-radius: var(--rounded-btn) var(--rounded-btn) 0 0;
				}
				& + datalist {
					max-height: 200px;
					overflow-y: scroll;
					border-width: 1px;
				}
			}
			& + datalist:hover,
			datalist:active,
			datalist:focus {
				max-height: 200px;
				overflow-y: scroll;
				border-width: 1px;
			}
		}
	}
	datalist {
		display: block;
		position: absolute;
		z-index: 100;
		overflow: hidden;
		max-height: 0rem;
		transition: max-height 0.5s;
		border-radius: 0 0 0.5rem 0.5rem;
		border-color: hsl(var(--p) / var(--tw-bg-opacity));
		margin-top: -1px;

		option {
			cursor: pointer;
			padding: 1rem;
			&:hover {
				background-color: hsl(var(--b1) / var(--tw-bg-opacity));
			}
		}
	}
</style>
