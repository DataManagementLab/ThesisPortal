<script>
	import '../app.postcss';
	import { PUBLIC_HOST, PUBLIC_PORT } from '$env/static/public';
</script>

<div class="min-h-full">
	<nav class="navbar bg-base-100">
		<div class="flex-1">
			<a href="/" class="btn btn-ghost normal-case text-xl">Thesisfinder</a>
		</div>
		<a href="/topic_overview" class="btn btn-ghost mr-5">Themenübersicht</a>
		<a href="/inputScreen" class="btn btn-ghost mr-5">Eingabemaske</a>
		<a
			href="https://login.tu-darmstadt.de/idp/profile/cas/login?service={PUBLIC_HOST}:{PUBLIC_PORT}"
			class="btn btn-primary mr-5 px-7">Login</a
		>
	</nav>
</div>
<slot />
