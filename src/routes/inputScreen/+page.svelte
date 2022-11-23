<script>
	let questions = [
		{ id: 1, text: `Bachelor Thesis` },
		{ id: 2, text: `Master Thesis` },
		{ id: 3, text: `Bachelor Thesis oder Master Thesis` }
	];
    
    let areaOfExpertise = [
		{ id: 1, text: `IT-Sicherheit` },
		{ id: 2, text: `Netze und verteilte Systeme` },
        { id: 3, text: `Robotik, Computational und Computer Engineering` },
        { id: 4, text: `Software-Systeme und formale Grundlagen` },
        { id: 5, text: `Visual & Interactive Computing` },
        { id: 6, text: `Web, Wissens- und Informationsverarbeitung` }
	];

	let selected;
    let selected3;

	let title = 'Titel';
	let topicArea = 'Fachgebiet';
	let topicDescription = 'Themenbeschreibung';
	let professor = 'Leitende(r) Professor*in';
	let programmingLanguage = 'Verwendete Programmiersprache';
	let contact = 'E-Mail Kontakt';
	let moreInformation = 'Sonstiges';
</script>

<h2>Eingabemaske</h2>

<select bind:value={selected}>
	{#each questions as question}
		<option value={question}>
			{question.text}
		</option>
	{/each}
</select>

<br />

    <select bind:value={selected3} >
		{#each areaOfExpertise as areaOfExpertise}
			<option value={areaOfExpertise}>
				{areaOfExpertise.text}
			</option>
		{/each}
	</select>

<input bind:value={title} />

<div>
	<textarea bind:value={topicDescription} />
</div>

<input bind:value={topicArea} />
<input bind:value={professor} />
<input bind:value={programmingLanguage} />
<input bind:value={contact} />

<div>
	<textarea bind:value={moreInformation} />
</div>

<button type="submit"> Entwurf speichern </button>

<button type="submit"> Hochladen </button>

<style>
	select {
		width: 500px;
	}
	input {
		display: block;
		width: 500px;
		max-width: 100%;
	}
	div {
		width: 35%;
		text-align: left;
	}
	textarea {
		width: 100%;
		height: 100px;
	}
</style>
