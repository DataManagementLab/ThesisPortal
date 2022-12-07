<script>
    export let data;
</script>

<table class="table table-zebra table-compact m-5">
    <thead>
        <tr>
            <th>Titel</th>
            <th>Betreuer*in</th>
            <th>Fachgebiet</th>
            <th>Abschluss</th>
        </tr>
    </thead>
    <tbody>
        {#each data as topic}
            <tr class="hover">
                <td><a href="/topic/{topic.id.split(':')[1]}" class="underline text-primary">{topic.title}</a></td>
                <td>{topic.professor}</td>
                <td>{topic.specification}</td>
                <td>{topic.thesisType.join(', ')}</td>
            </tr>
        {/each}
        {#if data.length == 0}
            <tr>
                <td colspan="4" class="text-center">Keine Themen gefunden</td>
            </tr>
        {/if}
    </tbody>
</table>