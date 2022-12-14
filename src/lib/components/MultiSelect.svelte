<script>
	import Close from 'svelte-material-icons/Close.svelte';

	export let id = '';
	export let value = '';
	export let readonly = false;
	export let placeholder = '';
	export let label;
	export let data;
	export let component = null;
	let selected = new Set();

	function selectOption(elem) {
		selected = selected.add(data.filter((x) => x.id == elem)[0]);
		value = "";
		reset();
	}
	function selectCustom(e){
		if(e.charCode === 13){
			let existing = data.filter(x => x.id === value);
			if(existing.length > 0){
				selected = selected.add(existing[0]);
			} else {
				selected = selected.add({
					id: value,
					text: value
				});
			}
			value = "";
		} else {
			value += String.fromCharCode(e.charCode);
		}
		reset();
	}
	function removeSelected(id) {
		selected = new Set([...selected].filter((x) => x.id != id));
		reset();
	}
	function reset(){
		let searchTerm = value.toLowerCase().replaceAll(/[,.-]/g,' ');
		for (let option of data){
			let text = option.text.toLowerCase().replaceAll(/[,.-]/g,' ');
			if((value == "" || text.indexOf(searchTerm) > -1) && !selected.has(option)){
				component.querySelector(`option[value="${option.id}"]`).style.display = 'block';
			} else {
				component.querySelector(`option[value="${option.id}"]`).style.display = 'none';
			}
		}
	}
</script>

<div class="multiselect" bind:this={component}>
	<label for={id} class="label">{label}</label>
	<input type="hidden" name={id} value={[...selected].map(x => x.id).join(',')}>
	<div id="{id}_selections" class="selections">
		{#each Array.from(selected) as sel}
			<div>
				<span>{sel.text}</span>
				<button class="btn btn-circle btn-xs" on:click|preventDefault={() => removeSelected(sel.id)}
					><Close /></button
				>
			</div>
		{/each}
	</div>
	<input
		type="text"
		{id}
		class="input w-full mb-0 outline-0 bg-base-200 min-w-[25rem]"
		{placeholder}
		disabled={readonly}
		bind:value
		autocomplete="off"
		on:keypress|preventDefault={selectCustom}
	/>
	<datalist id="{id}-data" class="bg-base-200 w-full">
		{#each data as option}
			<option value={option.id} on:click={() => selectOption(option.id)}>{option.text}</option>
		{/each}
		{#if selected.size === data.length}
			<div class="alert alert-warning rounded-lg">
				<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
				<span>keine weiteren Vorschläge gefunden</span>
			</div>
		{/if}
	</datalist>
</div>

<style lang="scss">
	.multiselect {
		position: relative;
		& > input {
			&:hover{
				border-color: hsl(var(--p)/var(--tw-bg-opacity));
			}
			&:focus {
				background-color: hsl(var(--b3) / var(--tw-bg-opacity));
				border-radius: var(--rounded-btn) var(--rounded-btn) 0 0;
				border-color: hsl(var(--p)/var(--tw-bg-opacity));
				border-bottom: 0;
				z-index: 101;
				position: relative;
				& + datalist {
					max-height: 200px;
					overflow-y: scroll;
					border-width: 1px;
				}
			}
			& + datalist:hover, datalist:active, datalist:focus {
				max-height: 200px;
				overflow-y: scroll;
				border-width: 1px;
			}
		}

		.selections {
			padding: 0.5rem;
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
		border-color: hsl(var(--p)/var(--tw-bg-opacity));
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
