<script>
	export let data;

	function nl2br(str) {
		if (typeof str === 'undefined' || str === null) {
			return '';
		}
		return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br>$2');
	}
</script>

<div class="card shadow-lg p-5 m-5 bg-base-100">
	<h1 class="text-2xl mb-2">{data.topic.title} ({data.topic.thesisType})</h1>
	Spezialisierung: {data.topic.areaOfExpertise}<br />
	<a href= "mailto:{data.topic.email}">Email: {data.topic.email}</a>
	Ansprechperson: {data.topic.professor}<br />
	Fachgebiet: {data.topic.specification}<br />
	Technologien: {data.topic.technologies}<br /><br /><br />
	<p>
		{@html nl2br(data.topic.description)}
	</p>
	<br />
	{data.topic.other}<br />
</div>
