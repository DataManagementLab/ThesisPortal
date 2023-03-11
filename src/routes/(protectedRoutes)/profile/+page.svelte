<script>
	import Settings from './Settings.svelte';
	export let data;
	export let form;
</script>

<h2 class="card-title">Einstellungen</h2>
<Settings user={data.user} {form} tab={form?.openSettings} />
