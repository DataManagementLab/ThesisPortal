<script>
	import { each } from "svelte/internal";

    let topics = [
        {
            title: "Beispiel2",
            graduration: "Master",
            subject: "Fachgebiet1",
            supervisor: "Mustermann",
            deadline: "01.04.2023"
        },
        {
            title: "Beispiel3",
            graduration: "Bachelor",
            subject: "Fachgebiet2",
            supervisor: "Mustermann",
            deadline: "01.04.2023"
        },
        {
            title: "Beispiel4",
            graduration: "Bachelor",
            subject: "Fachgebiet3",
            supervisor: "Musterfrau",
            deadline: "01.04.2023"
        },
    ];
</script>

<h2>Themenübersicht</h2>

<table>
    <tr>
        <th>Titel</th>
        <th>Betreuer*in</th>
        <th>Fachgebiet</th>
        <th>Abschluss</th>
        <th>Deadline zur Anmeldung</th>
    </tr>
    {#each topics as topic}
        <tr>
            <a href="/topic_overview"><th>{topic.title}</th></a>
            <th>{topic.supervisor}</th>
            <th>{topic.subject}</th>
            <th>{topic.graduration}</th>
            <th>{topic.deadline}</th>
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