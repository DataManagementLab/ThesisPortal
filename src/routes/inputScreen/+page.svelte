<script>
	let questions = [
		{ id: 1, text: `Bachelor Thesis` },
		{ id: 2, text: `Master Thesis` },
	];

	let selected;

    let topicDescription = 'Themenbeschreibung';
    let professor = 'Leitende(r) Professor*in';
    let programmingLanguage = 'Verwendete Programmiersprache';
    let contact = 'E-Mail Kontakt';
</script>

<h2>Eingabemaske</h2>

	<select bind:value={selected} >
		{#each questions as question}
			<option value={question}>
				{question.text}
			</option>
		{/each}
	</select>

    <div>
        <textarea bind:value={topicDescription}></textarea>
    </div>
    <input bind:value={professor}>
    <input bind:value={programmingLanguage}>
    <input bind:value={contact}>

	<button type=submit>
		Entwurf speichern
	</button>

    <button type=submit>
		Hochladen
	</button>


<style>
    select{
        width: 500px;
    }
	input {
		display: block;
		width: 500px;
		max-width: 100%;
	}
    div{
        width:35%;
        text-align: left;
    }
    textarea{
        width: 100%; 
        height: 100px;
    }
</style>