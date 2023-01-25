<script>
	import Email from 'svelte-material-icons/Email.svelte';
	import Pencil from 'svelte-material-icons/Pencil.svelte';
	import Person from 'svelte-material-icons/AccountCircle.svelte';
	export let data;

	function nl2br(str) {
		if (typeof str === 'undefined' || str === null) {
			return '';
		}
		return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br>$2');
	}
</script>

<div class="card shadow-lg p-5 m-5 bg-base-100">
	<div class="flex justify-between items-end">
		<div>
			<div class="text-sm breadcrumbs">
				<ul>
				<li>{data.topic.subjectArea}</li> 
				<li>{data.topic.areaOfExpertise}</li> 
				<li>{data.topic.specialization}</li>
				</ul>
			</div>
			<h1 class="text-5xl m-2">
				{data.topic.title} {#if data.isEmployee}
					<a href="/edit/{data.topic.id.split(':')[1]}" class="btn btn-primary btn-sm btn-circle">
						<Pencil />
					</a>
				{/if}
			</h1>
			<div>
				{#each data.topic.thesisType as tt}
					<span class="badge badge-primary badge-lg">{tt}</span>
				{/each}
				{#each data.topic.technologies as tech}
					<span class="badge badge-lg ml-2">{tech}</span>
				{/each}
			</div>
		</div>
		<div>
			<div class="icon-text"><Person /> {data.topic.professor}</div>
			{#each data.topic.supervisor as supervisor}
				<div class="icon-text"><Person /> {supervisor}</div>
			{/each}
			<div class="icon-text">
				<a href="mailto:{data.topic.email}" class="link link-primary link-hover email">
					<Email /> {data.topic.email}
				</a>
			</div>
		</div>
	</div>
	<br />
	<div class="card bg-base-200">
		<div class="card-body">
			{@html nl2br(data.topic.description)}
		</div>
	</div>
	{#if data.topic.other && data.topic.other.trim().length > 0}
		<div class="card bg-base-200 mt-3">
			<div class="card-body">
				{@html nl2br(data.topic.other)}
			</div>
		</div>
	{/if}
</div>

<style lang="scss" global>
	.icon-text {
		font-size: 1.25rem;
		svg {
			display: inline-block;
		}
	}
</style>