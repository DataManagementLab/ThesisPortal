<script>
	import Star from 'svelte-material-icons/Star.svelte';
	import StarOutline from 'svelte-material-icons/StarOutline.svelte';

	export let data;
	export let draft = false;
	export let favorites = [];

	console.log(favorites);
</script>

{#each data as topic}
	<div class="card bg-base-200 mb-3" >
		<div class="card-body">
			<h2 class="card-title text-primary">
				<a href="/{draft ? 'edit' : 'topic'}/{topic.id.split(':')[1]}">{topic.title}</a>
				<span class="right font-normal text-sm">von {topic.professor}</span>
				<form action="?/markUnmarkFavorite" method="POST" id="favorite">	
					<input type="hidden" name='type' value={favorites.find(elem =>	elem.topic == topic.id)?'unfavorize':'favorize'}>
					{#if favorites.find(elem =>	elem.topic == topic.id)}
						<input type="hidden" name='favoriteId' value={favorites.find(elem => elem.topic == topic.id).id}>
					{/if}
					<button name='topicId' value={ topic.id }>
						{#if favorites.find(elem =>	elem.topic == topic.id)}
							<Star />
						{:else}
							<StarOutline />
						{/if}
					</button>

				</form>
			</h2>
			<div>
				{#each topic.thesisType as tt}
					<span class="badge badge-primary">{tt}</span>
				{/each}
				{#each topic.technologies as tech}
					<span class="badge">{tech}</span>
				{/each}
			</div>
			<p>{topic.description.split(' ').slice(0, 100).join(' ')}...</p>
		</div>
	</div>
	
{/each}
{#if data.length == 0}
	<div class="card bg-base-200">
		<div class="card-body">
			<h2 class="card-title">Keine {draft ? 'Entwürfe' : 'Themen'} gefunden</h2>
		</div>
	</div>
{/if}

<style lang="scss">
	div.card {
		&:hover {
			background-color: hsl(var(--b3));
		}
		.card-body {
			div .badge {
				margin-right: 0.25rem;
			}
			p {
				max-height: 4.5rem;
				text-overflow: ellipsis;
				overflow: hidden;
			}
		}
	}
</style>
