<script>
	export let data;
</script>

<div class="card shadow-xl bg-base-100 p-5 m-5">
	<h2 class="text-3xl font-bold mx-5 my-3">Themenübersicht</h2>
	<table class="table table-zebra m-5">
		<thead>
			<tr>
				<th>Titel</th>
				<th>Betreuer*in</th>
				<th>Fachgebiet</th>
				<th>Abschluss</th>
			</tr>
		</thead>
		<tbody>
			{#each data.topics as topic}
				<tr>
					<td><a href="/topic/{topic.id.split(':')[1]}">{topic.title}</a></td>
					<td>{topic.professor}</td>
					<td>{topic.specification}</td>
					<td>{topic.areaOfExpertise==1?"Bachelor":"Master"}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
