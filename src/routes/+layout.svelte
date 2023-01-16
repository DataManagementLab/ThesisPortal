<script>
	import '../app.postcss';
	import { PUBLIC_HOST, PUBLIC_PORT } from '$env/static/public';

	export let data;
</script>

<div class="min-h-full">
	<nav class="navbar bg-base-100">
		<div class="flex-1">
			<a href="/" class="btn btn-ghost normal-case text-xl">Thesisfinder</a>
		</div>
		<a href="/" class="btn btn-ghost mr-3">Themenübersicht</a>
		{#if data.isEmployee}
			<a href="/create" class="btn btn-ghost mr-3">Thema erstellen</a>
		{/if}
		<a href="/profile" class="btn btn-ghost mr-3">Profil</a>
		<a
			href="https://login-dev.hrz.tu-darmstadt.de/idp/profile/cas/login?service={PUBLIC_HOST}:{PUBLIC_PORT}"
			class="btn btn-primary mr-3 px-7">
			Login
		</a>
	</nav>
</div>
<slot />
