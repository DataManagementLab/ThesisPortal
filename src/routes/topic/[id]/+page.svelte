<script>
	import Pencil from 'svelte-material-icons/Pencil.svelte';
	export let data;

	function nl2br(str) {
		if (typeof str === 'undefined' || str === null) {
			return '';
		}
		return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br>$2');
	}
</script>

<div class="card shadow-lg p-5 m-5 bg-base-100">
	<h1 class="text-2xl mb-2">
		{data.topic.title} ({data.topic.thesisType}) {#if data.isEmployee}
			<a href="/edit/{data.topic.id.split(':')[1]}" class="btn btn-primary btn-sm btn-circle">
				<Pencil />
			</a>
		{/if}
	</h1>
	Fachbereich: {data.topic.subjectArea}
	<br />
	Fachgebiet: {data.topic.areaOfExpertise}
	<br />
	<!--Makes E-Mail clickable and redirects to local E-Mailprovider-->
	<a href="mailto:{data.topic.email}">Email: {data.topic.email}</a>
	Ansprechperson: {data.topic.professor}
	<br />
	Weitere Betreuende Person(en): {data.topic.supervisor}
	<br />
	Spezialisierung: {data.topic.specialization}
	<br />
	Technologien: {data.topic.technologies}
	<br />
	<br />
	<br />
	<p>
		{@html nl2br(data.topic.description)}
	</p>
	<br />
	{data.topic.other}
	<br />
</div>
