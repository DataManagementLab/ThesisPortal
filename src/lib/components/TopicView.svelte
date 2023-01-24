<script>
	import Star from 'svelte-material-icons/Star.svelte';
	import StarOutline from 'svelte-material-icons/StarOutline.svelte';
	import Delete from 'svelte-material-icons/Delete.svelte';
	import { enhance } from '$app/forms';

	export let data;
	export let draft = false;
	export let favorites = [];
	export let showFavoriteIcon = false;
	export let showDeleteButton = false;
</script>

{#each data as topic}
	<div class="card bg-base-200 mb-3">
		<div class="card-body">
			<h2 class="card-title text-primary">
				<a href="/{draft ? 'edit' : 'topic'}/{topic.id.split(':')[1]}">{topic.title}</a>
				<span class="right font-normal text-sm">von {topic.professor}</span>
				<form action="?/markUnmarkFavorite" method="POST" id="favorite" use:enhance>
					<input
						type="hidden"
						name="type"
						value={favorites.find((elem) => elem.topic == topic.id) ? 'unfavorize' : 'favorize'} />
					{#if favorites.find((elem) => elem.topic == topic.id)}
						<input
							type="hidden"
							name="favoriteId"
							value={favorites.find((elem) => elem.topic == topic.id).id} />
					{/if}
					<button name="topicId" value={topic.id}>
						{#if showFavoriteIcon}
							{#if favorites.find((elem) => elem.topic == topic.id)}
								<Star />
							{:else}
								<StarOutline />
							{/if}
						{/if}
					</button>
				</form>
				<form action="?/deleteTopic" method="POST" id=delete >
					<input 
						type="hidden"
						name="deleteTopicId"
						value={topic.id} />
					<label for="delete-id-{topic.id.split(':')[1]}" >
						{#if showDeleteButton}
							<Delete />
						{/if}
					</label>
					<input type="checkbox" id="delete-id-{topic.id.split(':')[1]}" class="modal-toggle" />
					<div class="modal">
						<div class="modal-box">
							<h3 class="font-bold text-lg">
								Soll dieses Thesis Thema "{topic.title}" wirklich gelöscht werden?
							</h3>
							<div class="modal-action">
								<button class="btn" >
									Bestätigen
								</button>
								<label for="delete-id-{topic.id.split(':')[1]}" class="btn">Abbrechen</label>
							</div>
						</div>
					</div>
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
