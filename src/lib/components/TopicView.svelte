<script>
	export let data;
	export let draft = false;
</script>

{#each data as topic}
	<a class="card bg-base-200 mb-3" href="/{draft ? 'edit' : 'topic'}/{topic.id.split(':')[1]}">
		<div class="card-body">
			<h2 class="card-title text-primary">
				{topic.title}
				<span class="right font-normal text-sm">von {topic.professor}</span>
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
	</a>
{/each}
{#if data.length == 0}
	<div class="card bg-base-200">
		<div class="card-body">
			<h2 class="card-title">Keine {draft ? 'Entwürfe' : 'Themen'} gefunden</h2>
		</div>
	</div>
{/if}

<style lang="scss">
	a.card {
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
