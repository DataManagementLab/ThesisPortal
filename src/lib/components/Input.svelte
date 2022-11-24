<script>
	export let id;
	export let label;
	export let value = '';
	export let placeholder = '';
	export let type = 'text';
	export let disabled = false;
	export let required = false;
</script>

<label class="label font-medium pb-1" for={id}>
	<span class="label-text">{label}</span>
</label>
<input
	class="input input-bordered w-full mb-5 outline-0"
	{type}
	{placeholder}
	{required}
	{disabled}
	{id}
	name={id}
	{value}
/>
