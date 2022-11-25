<script>
	import { each } from 'svelte/internal';

	let topics = [
		{
			title: 'Beispiel2',
			graduration: 'Master',
			subject: 'Fachgebiet1',
			supervisor: 'Mustermann',
			deadline: '01.04.2023'
		},
		{
			title: 'Beispiel3',
			graduration: 'Bachelor',
			subject: 'Fachgebiet2',
			supervisor: 'Mustermann',
			deadline: '01.04.2023'
		},
		{
			title: 'Beispiel4',
			graduration: 'Bachelor',
			subject: 'Fachgebiet3',
			supervisor: 'Musterfrau',
			deadline: '01.04.2023'
		},
		{
			title: 'Beispiel2',
			graduration: 'Master',
			subject: 'Fachgebiet1',
			supervisor: 'Mustermann',
			deadline: '01.04.2023'
		},
		{
			title: 'Beispiel3',
			graduration: 'Bachelor',
			subject: 'Fachgebiet2',
			supervisor: 'Mustermann',
			deadline: '01.04.2023'
		},
		{
			title: 'Beispiel4',
			graduration: 'Bachelor',
			subject: 'Fachgebiet3',
			supervisor: 'Musterfrau',
			deadline: '01.04.2023'
		}
	];
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
				<th>Deadline zur Anmeldung</th>
			</tr>
		</thead>
		<tbody>
			{#each topics as topic}
				<tr>
					<td><a href="/topic_overview">{topic.title}</a></td>
					<td>{topic.supervisor}</td>
					<td>{topic.subject}</td>
					<td>{topic.graduration}</td>
					<td>{topic.deadline}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
