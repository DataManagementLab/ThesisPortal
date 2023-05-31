<script>
	import Email from 'svelte-material-icons/Email.svelte';
	import Pencil from 'svelte-material-icons/Pencil.svelte';
	import Person from 'svelte-material-icons/AccountCircle.svelte';
	import Star from 'svelte-material-icons/Star.svelte';
	import StarOutline from 'svelte-material-icons/StarOutline.svelte';
	import CalendarMonth from 'svelte-material-icons/CalendarMonth.svelte';
	import CalendarSync from 'svelte-material-icons/CalendarSync.svelte';
	import { enhance } from '$app/forms';
	import md from 'markdown-it';
	import hljs from 'highlight.js';

	export let data;

	const syntaxHighlighting = {
		highlight: function (str, lang) {
			if (lang && hljs.getLanguage(lang)) {
				try {
					return hljs.highlight(str, { language: lang }).value;
				} catch (__) {
					/*dont care*/
				}
			}
			return ''; // use external default escaping
		}
	};
</script>

<div class="card card-compact md:card-normal shadow-lg m-3 md:m-5 bg-base-100">
	<div class="card-body">
		<div class="text-sm breadcrumbs w-full">
			<ul>
				<li>{data.topic.subjectArea}</li>
				<li>{data.topic.areaOfExpertise}</li>
				<li>{data.topic.specialization}</li>
			</ul>
		</div>
		<div class="flex justify-between items-start flex-wrap lg:flex-nowrap">
			<div class="flex flex-wrap w-full">
				<h1 class="text-5xl m-2 w-full">
					{data.topic.title}
					{#if data.isEmployee}({data.topic.views ?? 0} mal angesehen){/if}
					<form
						action="?/markUnmarkFavorite"
						method="POST"
						id="favorite"
						class="inline"
						use:enhance>
						<input
							type="hidden"
							name="type"
							value={data.favorites.find((elem) => elem.topic == data.topic.id)
								? 'unfavorize'
								: 'favorize'} />
						{#if data.favorites.find((elem) => elem.topic == data.topic.id)}
							<input
								type="hidden"
								name="favoriteId"
								value={data.favorites.find((elem) => elem.topic == data.topic.id).id} />
						{/if}
						<button
							name="topicId"
							value={data.topic.id}
							class="inline text-2xl text-warning"
							title={data.favorites.find((elem) => elem.topic == data.topic.id)
								? 'Entfavorisieren'
								: 'Favorisieren'}>
							{#if data.favorites.find((elem) => elem.topic == data.topic.id)}
								<Star />
							{:else}
								<StarOutline />
							{/if}
						</button>
					</form>
					{#if data.isEmployee && data.topic.author == data.user}
						<a
							title="edit"
							href="/edit/{data.topic.id.split(':')[1]}"
							class="btn btn-primary btn-sm btn-circle">
							<Pencil />
						</a>
					{/if}
				</h1>
				<div>
					{#each data.topic.thesisType as tt}
						<span class="badge badge-primary badge-lg mb-2">{tt}</span>
					{/each}
					{#each data.topic.technologies as tech}
						<span class="badge badge-lg ml-1 mb-2">{tech}</span>
					{/each}
				</div>
			</div>
			<div class="card bg-base-200 p-3 w-full lg:w-max mt-3 lg:mt-0">
				<div class="icon-text" title="Veröffentlichungsdatum"><CalendarMonth /> {new Date(data.topic.createdAt).toLocaleDateString('de-DE')}</div>
				{#if data.topic.lastUpdatedAt} <div class="icon-text" title="Datum der letzten Änderung"><CalendarSync /> {new Date(data.topic.lastUpdatedAt).toLocaleDateString('de-DE')}</div> {/if}
				<div class="icon-text"><Person /> {data.topic.professor}</div>
				{#each data.topic.supervisor as supervisor}
					<div class="icon-text"><Person /> {supervisor}</div>
				{/each}
				<div class="icon-text">
					<a href="mailto:{data.topic.email}" class="link link-primary link-hover email">
						<Email />
						{data.topic.email}
					</a>
				</div>
			</div>
		</div>
		<div class="card bg-base-200 mt-2 card-compact md:card-normal">
			<div class="card-body">
				{@html md(syntaxHighlighting).render(data.topic.description)}
			</div>
		</div>
		{#if data.topic.other && data.topic.other.trim().length > 0}
			<div class="card bg-base-200 mt-3">
				<div class="card-body">
					{@html md(syntaxHighlighting).render(data.topic.other)}
				</div>
			</div>
		{/if}
	</div>
</div>

<style lang="scss" global>
	.icon-text {
		font-size: 1.25rem;
		svg {
			display: inline-block;
		}
	}
</style>
