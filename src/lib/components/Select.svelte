<script>
	export let id;
	export let label;
	export let disabled = false;
	export let required = false;
	export let options;
</script>

<label class="label font-medium pb-1" for={id}>
	<span class="label-text">{label}</span>
</label>
<select
	id="thesisType"
	class="select select-bordered max-w-xs mb-5 font-normal outline-0"
	{disabled}
	{required}
>
	{#each options as option}
		<option value={option.id}>
			{option.text}
		</option>
	{/each}
</select>
