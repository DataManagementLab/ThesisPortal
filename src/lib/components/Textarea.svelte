<script>
	export let id;
	export let label;
	export let value = '';
	export let placeholder = '';
	export let disabled = false;
	export let required = undefined;
	export let errorMsg = '';

	value = value.trim();
</script>

<label class="label font-medium pb-1" for={id}>
	<span class="label-text">
		{label}
		{#if required}
			<span class="label-text-alt text-error" title="Pflichtfeld">*</span>
		{/if}
	</span>
</label>
<textarea
	class="textarea textarea-bordered w-full mb-5 h-36 outline-0 bg-base-300"
	{placeholder}
	{disabled}
	{id}
	name={id}
	{value} />
<label class="label font-medium pb-1" for={id}>
	{#if errorMsg}
		<span class="label-text-alt text-error">*{errorMsg}*</span>
	{/if}
</label>

<style lang="scss">
	::placeholder {
		color: hsl(var(--nc) / var(--tw-bg-opacity));
		opacity: 0.3;
	}
	@media (prefers-color-scheme: light) {
		::placeholder {
			color: hsl(var(--n) / var(--tw-bg-opacity));
			opacity: 0.5;
		}
	}
	textarea {
		min-height: 3rem;
		&:hover,
		&:focus {
			border-color: hsl(var(--p) / var(--tw-bg-opacity));
		}
	}
</style>
