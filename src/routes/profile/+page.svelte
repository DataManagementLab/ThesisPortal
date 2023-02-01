<script>
	import { TopicView } from '$lib/components';
	export let data;
</script>

<div id="topics">
	{#if data.isEmployee}
		<div class="flex flex-wrap gap-5 w-full">
			<div class="card">
				<div class="card-body">
					<h2 class="card-title">Erstellte Themen</h2>
					<TopicView data={data.topics} showDeleteButton showArchiveButton />
				</div>
			</div>
			<div class="card">
				<div class="card-body">
					<h2 class="card-title">Entwürfe</h2>
					<TopicView data={data.drafts} draft="true" showDeleteButton showArchiveButton />
					{#if data.archived > 0}
						<div class="card-actions">
							<a href="/profile/archive" class="btn btn-primary">Archivierte Themen ({data.archived})</a>
						</div>
					{/if}
				</div>
			</div>
		</div>
	{/if}
	<div class="card shadow-xl bg-base-100 p-5 mt-5 w-full" style="max-width: 100%">
		<h2 class="text-3xl font-bold mx-5 my-3">Favorisierte Themen</h2>
		<TopicView data={data.favorites} favorites={data.favorites} />
	</div>
</div>

<style lang="postcss">
	#topics {
		@apply m-5;
	}
	.card {
		@apply shadow-xl;
		@apply bg-base-100;
		max-width: 50rem;
	}
</style>
