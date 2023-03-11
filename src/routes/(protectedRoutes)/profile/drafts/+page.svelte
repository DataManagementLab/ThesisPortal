<script>
	import TopicView from '$lib/components/TopicView.svelte';

	export let data;
</script>

<h2 class="card-title">Entwürfe</h2>
<TopicView data={data.drafts} draft="true" showDeleteButton showArchiveButton showViewCounter />
