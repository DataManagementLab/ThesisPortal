<script>
    import { TopicView } from '$lib/components';
    export let data;
</script>

<div class="flex flex-wrap md:max-xl">
    <div class="card shadow-xl bg-base-100 p-2 mt-5 ml-5 md:w-2/5">
        <h2 class="text-3xl font-bold mx-5 my-3">Erstellte Themen</h2>
        <TopicView data={data.topics}/>
    </div>
    <div class="card shadow-xl bg-base-100 p-2 mt-5 ml-5 md:w-2/5">
        <h2 class="text-3xl font-bold mx-5 my-3">Entwürfe</h2>
        <TopicView data={data.drafts}/>
    </div>
</div>
