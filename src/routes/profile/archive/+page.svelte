<script>
    import { TopicView } from '$lib/components';
    export let data;
</script>

<div id="topics">
    <div class="flex flex-wrap gap-5 w-full">
        <div class="card">
            <div class="card-body">
                <h2 class="card-title">Archiv</h2>
                <TopicView data={data.archived} showDeleteButton showArchiveButton />
            </div>
        </div>
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