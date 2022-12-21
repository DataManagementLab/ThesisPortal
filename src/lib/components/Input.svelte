<script>
	import { onMount } from 'svelte';
	import Close from 'svelte-material-icons/Close.svelte';
	import fuzzysort from 'fuzzysort';

	export let id;
	export let type = 'text';
	export let label;
	export let value = '';
	export let placeholder = '';
	export let disabled = false;
	export let required = false;
	export let suggestions = undefined;
	export let csv = undefined;

	let loadedSuggestions = [];
	let inputValue = '';

	onMount(() => {
		loadSuggestions();
		if (csv !== undefined) {
			if (Array.isArray(value)) {
				value = value.join(',') + ',';
			}
		}
		inputValue = value;
		if (csv !== undefined) value = '';
	});

	function update(e) {
		if ((e.charCode === 13 || e.charCode === ','.charCodeAt(0)) && csv !== undefined) {
			e.preventDefault();
			appendValue();
		} else {
			value += String.fromCharCode(e.charCode);
			if (csv === undefined) inputValue = value;
		}
		loadSuggestions();
		e.target.scrollLeft = e.target.scrollWidth;
	}

	function appendValue() {
		if (csv === undefined) {
			inputValue = value;
			return;
		}
		inputValue += `${value},`;
		value = '';
	}

	function loadSuggestions() {
		if (suggestions === undefined) return;
		fetch('/api/suggestions', {
			method: 'POST',
			body: JSON.stringify({
				field: id,
				query: value
			})
		}).then(async (data) => {
			data = await data.json();
			if (value === '') {
				loadedSuggestions = data;
				return;
			}
			let s = Symbol();
			loadedSuggestions = fuzzysort
				.go(
					value,
					data.map((v) => ({ target: v, [s]: fuzzysort.prepare(v) })),
					{ key: s }
				)
				.map((x) => x.target);
		});
	}

	function removeTag(item) {
		inputValue = inputValue.replace(`${item},`, '');
	}

	//workaround to allow dynamic type for inputs
	function addType(node) {
		node.type = type;
	}
</script>

<div class:suggestions={suggestions !== undefined}>
	<label class="label font-medium pb-1" for={id}>
		<span class="label-text">{label} {#if csv !== undefined}
			(Komma separiert)
		{/if}</span>
	</label>
	<input type="hidden" name={id} value={inputValue} />
	{#if csv !== undefined && inputValue.length > 0}
		<div>
			{#each inputValue.substring(0, inputValue.length - 1).split(',') as item}
				<div class="tag bg-base-200">
					<span>{item}</span>
					<button class="btn btn-circle btn-xs" on:click|preventDefault={() => removeTag(item)}
						><Close /></button
					>
				</div>
			{/each}
		</div>
	{/if}
	<input
		class="input w-full outline-0 bg-base-200"
		class:mb-5={suggestions === undefined}
		class:hasResults={loadedSuggestions.length > 0}
		use:addType
		{placeholder}
		{required}
		{disabled}
		{id}
		autocomplete="off"
		bind:value
		on:keypress|preventDefault={update}
	/>
	{#if suggestions !== undefined && loadedSuggestions.length > 0}
		<div class="bg-base-200 w-full datalist">
			{#each loadedSuggestions as suggestion}
				<button
					class="option"
					on:click|preventDefault={() => {
						value = suggestion;
						appendValue();
					}}>{suggestion}</button
				>
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">

	::placeholder {
		color: hsl(var(--nc) / var(--tw-bg-opacity));
		opacity: .3;
	}
	input {
		&:hover,
		&:focus {
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
				&:is(input.hasResults) {
					border-bottom: 0;
					border-radius: var(--rounded-btn) var(--rounded-btn) 0 0;
				}
				& + .datalist {
					max-height: 200px;
					overflow-y: scroll;
					border-width: 1px;
				}
			}
			& + .datalist:hover,
			.datalist:active,
			.datalist:focus {
				max-height: 200px;
				overflow-y: scroll;
				border-width: 1px;
			}
		}
	}
	.datalist {
		display: block;
		position: absolute;
		z-index: 100;
		overflow: hidden;
		max-height: 0rem;
		transition: max-height 0.5s;
		border-radius: 0 0 0.5rem 0.5rem;
		border-color: hsl(var(--p) / var(--tw-bg-opacity));
		margin-top: -1px;

		.option {
			cursor: pointer;
			display: block;
			width: 100%;
			padding: 1rem;
			text-align: start;
			&:hover {
				background-color: hsl(var(--b1) / var(--tw-bg-opacity));
			}
		}
	}

	.tag {
		display: inline-block;
		border-radius: 5px;
		padding: 3px 1px 3px 5px;
		font-size: 1rem;
		margin: 0px 0px 5px 5px;
		border: 1px solid hsl(var(--b2) / var(--tw-bg-opacity));

		&:hover {
			border-color: hsl(var(--p) / var(--tw-bg-opacity));
		}
		button {
			height: 1rem;
			width: 1rem;
			min-height: 1rem;
			min-width: 1rem;
			vertical-align: middle;
			background-color: transparent;
			border: none;
			&:hover {
				color: hsl(var(--p) / var(--tw-bg-opacity));
				background-color: hsl(var(--b3) / var(--tw-bg-opacity));
			}
		}
	}
</style>
