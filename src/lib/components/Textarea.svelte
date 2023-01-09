<script>
	export let id;
	export let label;
	export let value = '';
	export let placeholder = '';
	export let disabled = false;
	export let required = false;
	export let errorMsg='';
</script>

<label class="label font-medium pb-1" for={id}>
	<span class="label-text">{label}</span>
</label>
<textarea
	class="input w-full mb-5 p-3 h-36 outline-0 bg-base-200"
	{placeholder}
	{required}
	{disabled}
	{id}
	name={id}>{value}</textarea
>
<label class="label font-medium pb-1" for={id}>
	{#if errorMsg}
		<span class="label-text-alt text-error">*{errorMsg}*</span>
	{/if}
</label>

<style lang="scss">
	textarea {
		min-height: 3rem;
		&:hover,
		&:focus {
			border-color: hsl(var(--p) / var(--tw-bg-opacity));
		}
	}
</style>
