<script>
	import Star from 'svelte-material-icons/Star.svelte';
	import StarOutline from 'svelte-material-icons/StarOutline.svelte';
	import Delete from 'svelte-material-icons/Delete.svelte';
	import Archive from 'svelte-material-icons/Archive.svelte';
	import { enhance } from '$app/forms';

	export let data;
	export let draft = false;
	export let favorites = [];
	export let showFavoriteIcon = false;
	export let showDeleteButton = false;
	export let showArchiveButton = false;
	export let showViewCounter = false;
</script>

{#each data as topic}
	<div class="card card-compact md:card-normal bg-base-200 mb-3">
		<div class="card-body">
			<h2 class="card-title text-primary">
				<a href="/{draft ? 'edit' : 'topic'}/{topic.id.split(':')[1]}">{topic.title}</a>
				<span class="right font-normal text-sm">
					von {topic.professor}
					{#if showViewCounter}({topic.views ?? 0} mal angesehen){/if}
				</span>
				{#if showFavoriteIcon}
					<form action="?/markUnmarkFavorite" method="POST" id="favorite" use:enhance>
						<input
							type="hidden"
							name="type"
							value={favorites.find((elem) => elem.topic == topic.id)
								? 'unfavorize'
								: 'favorize'} />
						{#if favorites.find((elem) => elem.topic == topic.id)}
							<input
								type="hidden"
								name="favoriteId"
								value={favorites.find((elem) => elem.topic == topic.id).id} />
						{/if}
						<button
							name="topicId"
							value={topic.id}
							class="text-warning"
							title={favorites.find((elem) => elem.topic == topic.id)
								? 'Entfavorisieren'
								: 'Favorisieren'}>
							{#if favorites.find((elem) => elem.topic == topic.id)}
								<Star />
							{:else}
								<StarOutline />
							{/if}
						</button>
					</form>
				{/if}
				{#if showDeleteButton}
					<form action="?/deleteTopic" method="POST" id="delete">
						<input type="hidden" name="deleteTopicId" value={topic.id} />
						<label
							for="delete-id-{topic.id.split(':')[1]}"
							class="text-error cursor-pointer"
							title="Löschen">
							<Delete />
						</label>
						<input type="checkbox" id="delete-id-{topic.id.split(':')[1]}" class="modal-toggle" />
						<div class="modal">
							<div class="modal-box">
								<h3 class="font-bold text-lg">
									Soll dieses Thesisthema "{topic.title}" wirklich gelöscht werden?
								</h3>
								<div class="modal-action">
									<button class="btn btn-error">Bestätigen</button>
									<label for="delete-id-{topic.id.split(':')[1]}" class="btn btn-primary">
										Abbrechen
									</label>
								</div>
							</div>
						</div>
					</form>
				{/if}
				{#if showArchiveButton}
					{#if !topic.archived}
						<form action="?/archiveTopic" method="POST" id="archive">
							<input type="hidden" name="archiveTopicId" value={topic.id} />
							<label
								for="archive-id-{topic.id.split(':')[1]}"
								class="text-error cursor-pointer"
								title="Archivieren">
								<Archive />
							</label>
							<input
								type="checkbox"
								id="archive-id-{topic.id.split(':')[1]}"
								class="modal-toggle" />
							<div class="modal">
								<div class="modal-box">
									<h3 class="font-bold text-lg">
										Soll dieses Thesisthema "{topic.title}" wirklich archiviert werden?
									</h3>
									<p class="text-sm text-base-content mt-2">
										Dieses Thema wird dann nicht mehr in der Liste der verfügbaren Themen angezeigt.
									</p>
									<div class="modal-action">
										<button class="btn btn-error">Bestätigen</button>
										<label for="archive-id-{topic.id.split(':')[1]}" class="btn btn-primary">
											Abbrechen
										</label>
									</div>
								</div>
							</div>
						</form>
					{:else}
						<form action="?/unarchiveTopic" method="POST" id="archive">
							<input type="hidden" name="unarchiveTopicId" value={topic.id} />
							<label
								for="unarchive-id-{topic.id.split(':')[1]}"
								class="text-success cursor-pointer"
								title="Aus Archiv entfernen">
								<Archive />
							</label>
							<input
								type="checkbox"
								id="unarchive-id-{topic.id.split(':')[1]}"
								class="modal-toggle" />
							<div class="modal">
								<div class="modal-box">
									<h3 class="font-bold text-lg">
										Soll dieses Thesisthema "{topic.title}" wirklich entarchiviert werden?
										<br />
									</h3>
									<p class="text-sm text-base-content mt-2">
										Es wird dann wieder in der Liste der verfügbaren Themen angezeigt.
									</p>
									<div class="modal-action">
										<button class="btn btn-error">Bestätigen</button>
										<label for="unarchive-id-{topic.id.split(':')[1]}" class="btn btn-primary">
											Abbrechen
										</label>
									</div>
								</div>
							</div>
						</form>
					{/if}
				{/if}
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
