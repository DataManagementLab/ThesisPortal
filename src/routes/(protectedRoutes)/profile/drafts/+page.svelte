<script>
	import { TopicView, Pagination } from '$lib/components';
	import { page } from '$app/stores';
	export let data;
</script>

<h2 class="card-title">Entwürfe</h2>
<div class="m-2 flex justify-center">
	<Pagination
		pageCount={data.pageCount}
		currentIndex={data.pageIndex}
		url="/profile/drafts"
		param="page" />
</div>
<TopicView data={data.drafts} draft="true" showDeleteButton showArchiveButton showViewCounter />
<div class="m-2 flex justify-center">
	<Pagination
		pageCount={data.pageCount}
		currentIndex={data.pageIndex}
		url="/profile/drafts"
		param="page" />
</div>