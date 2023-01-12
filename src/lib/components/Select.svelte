<script>
	export let id;
	export let label;
	export let disabled = false;
	export let required = false;
	export let selected = '';
	export let options;
</script>

<label class="label font-medium pb-1" for={id}>
	<span class="label-text">{label}</span>
</label>
<select
	id="thesisType"
	class="select max-w-xs mb-5 font-normal outline-0 bg-base-200"
	{disabled}
	{required}
	name={id}>
	{#each options as option}
		{#if selected == option.id}
			<option value={option.id} selected>
				{option.text}
			</option>
		{:else}
			<option value={option.id}>
				{option.text}
			</option>
		{/if}
	{/each}
</select>

<style lang="scss">
	select {
		&:hover,
		&:focus {
			border-color: hsl(var(--p) / var(--tw-bg-opacity));
		}
	}
</style>
