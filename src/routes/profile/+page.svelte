<script>
	import { TopicView } from '$lib/components';
	export let data;
</script>

<div class="flex flex-wrap md:max-xl">
	<div class="card">
		<h2 class="text-3xl font-bold mx-5 my-3">Erstellte Themen</h2>
		<TopicView data={data.topics} />
	</div>
	<div class="card">
		<h2 class="text-3xl font-bold mx-5 my-3">Entwürfe</h2>
		<TopicView data={data.drafts} draft="true" />
	</div>
</div>

<style lang="postcss">
	.card {
		@apply shadow-xl;
		@apply bg-base-100;
		@apply p-2;
		@apply mt-5;
		@apply ml-5;
		@apply min-w-min;
		@apply md:w-2/5;
	}
</style>
