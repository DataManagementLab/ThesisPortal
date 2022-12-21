<script>
	export let id;
	export let label;
	export let value = '';
	export let placeholder = '';
	export let type = 'text';
	export let disabled = false;
	export let required = false;
	export let errorMessage = '';
</script>

<label class="label font-medium pb-1" for={id}>
	<span class="label-text">{label}</span>
</label>
<input
	class="input w-full mb-5 outline-0 bg-base-200"
	{type}
	{placeholder}
	{required}
	{disabled}
	{id}
	name={id}
	{value}
/>
<label class="label font-medium pb-1" for={id}>
	{#if errorMessage}
		<span class="label-text-alt text-error">{errorMessage}</span>
	{/if}
</label>

<style lang="scss">
	input {
		&:hover,
		&:focus {
			border-color: hsl(var(--p) / var(--tw-bg-opacity));
		}
	}
</style>
