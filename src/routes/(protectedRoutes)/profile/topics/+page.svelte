<script>
	import TopicView from '$lib/components/TopicView.svelte';
	export let data;
</script>

<h2 class="card-title">Erstellte Themen</h2>
<TopicView data={data.topics} showDeleteButton showArchiveButton showViewCounter />
