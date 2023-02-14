<script>
	import { TopicView } from '$lib/components';
	import Settings from './Settings.svelte';
	export let data;
	let openTab = 0;
</script>

<div id="topics" class="m-5">
	{#if data.isEmployee}
		<div class="tabs tabs-boxed bg-base-200">
			<button on:click={() => (openTab = 0)} class="tab" class:tab-active={openTab == 0}>
				Einstellungen
			</button>
			<button on:click={() => (openTab = 1)} class="tab" class:tab-active={openTab == 1}>
				Erstellte Themen
			</button>
			<button on:click={() => (openTab = 2)} class="tab" class:tab-active={openTab == 2}>
				Entwürfe
			</button>
			<button on:click={() => (openTab = 3)} class="tab" class:tab-active={openTab == 3}>
				Archiv
			</button>
		</div>
		<div class="card">
			<div class="card-body">
				{#if openTab == 0}
					<h2 class="card-title">Einstellungen</h2>
					<Settings user={data.user} />
				{/if}
				{#if openTab == 1}
					<h2 class="card-title">Erstellte Themen</h2>
					<TopicView data={data.topics} showDeleteButton showArchiveButton />
				{/if}
				{#if openTab == 2}
					<h2 class="card-title">Entwürfe</h2>
					<TopicView data={data.drafts} draft="true" showDeleteButton showArchiveButton />
				{/if}
				{#if openTab == 3}
					<h2 class="card-title">Archiv</h2>
					<TopicView data={data.archived} showDeleteButton showArchiveButton />
				{/if}
			</div>
		</div>
	{/if}
	<div class="card shadow-xl bg-base-100 p-5 mt-5 w-full" style="max-width: 100%">
		<h2 class="text-3xl font-bold mx-5 my-3">Favorisierte Themen</h2>
		<TopicView data={data.favorites} favorites={data.favorites} />
	</div>
</div>

<style lang="postcss">
	.tabs {
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}
	.tabs + div {
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	}
	.card {
		@apply shadow-xl;
		@apply bg-base-100;
	}
</style>
