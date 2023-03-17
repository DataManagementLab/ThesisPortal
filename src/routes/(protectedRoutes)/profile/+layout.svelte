<script>
	import { TopicView } from '$lib/components';
	import { page } from '$app/stores';

	export let data;
</script>

<div id="topics" class="m-5">
	{#if data.isEmployee}
		<div class="tabs tabs-boxed bg-base-200">
			<a
				href="/profile"
				class="tab"
				class:tab-active={$page.route.id == '/(protectedRoutes)/profile'}>
				Einstellungen
			</a>
			<a
				href="/profile/topics"
				class="tab"
				class:tab-active={$page.route.id.startsWith('/(protectedRoutes)/profile/topics')}>
				Erstellte Themen
			</a>
			<a
				href="/profile/drafts"
				class="tab"
				class:tab-active={$page.route.id.startsWith('/(protectedRoutes)/profile/drafts')}>
				Entwürfe
			</a>
			<a
				href="/profile/archive"
				class="tab"
				class:tab-active={$page.route.id.startsWith('/(protectedRoutes)/profile/archive')}>
				Archiv
			</a>
		</div>
		<div class="card card-compact md:card-normal">
			<div class="card-body">
				<slot />
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
