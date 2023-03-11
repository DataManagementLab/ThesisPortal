<script>
	import TopicView from '$lib/components/TopicView.svelte';
	export let data;
</script>

<h2 class="card-title">Archiv</h2>
<TopicView data={data.archived} showDeleteButton showArchiveButton />
