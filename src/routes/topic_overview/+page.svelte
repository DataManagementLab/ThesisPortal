<script>
	import { each } from "svelte/internal";

    let topics = [
        {
            title: "Beispiel2",
            graduration: "Master",
            supervisor: "Mustermann"
        },
        {
            title: "Beispiel3",
            graduration: "Bachelor",
            supervisor: "Mustermann"
        },
        {
            title: "Beispiel4",
            graduration: "Bachelor",
            supervisor: "Musterfrau"
        },
    ];
</script>

<h2>Themenübersicht</h2>

<table>
    <tr>
        <th>Titel</th>
        <th>Betreuer*in</th>
        <th>Abschluss</th>
    </tr>
    {#each topics as topic}
        <tr>
            <th>{topic.title}</th>
            <th>{topic.supervisor}</th>
            <th>{topic.graduration}</th>
        </tr>
    {/each}
</table>

<style>
    table {
        font-family: arial;
        border-collapse: collapse;
        width: 100%;
    }

    th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }

    tr:nth-child(even) {
        background-color: #dddddd;
    }
</style>