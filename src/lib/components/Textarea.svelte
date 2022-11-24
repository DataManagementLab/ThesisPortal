<script>
	export let id;
	export let label;
	export let value = '';
	export let placeholder = '';
	export let disabled = false;
	export let required = false;
</script>

<label class="label font-medium pb-1" for={id}>
	<span class="label-text">{label}</span>
</label>
<textarea
	class="input w-full mb-5 p-3 h-40 outline-0 bg-base-200"
	{placeholder}
	{required}
	{disabled}
	{id}
	name={id}>{value}</textarea
>

<style lang="scss">
	textarea {
		min-height: 50px;
		&:hover,
		&:focus {
			border-color: hsl(var(--p) / var(--tw-bg-opacity));
		}
	}
</style>
