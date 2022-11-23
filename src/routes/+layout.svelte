<script>
	import '../app.postcss';
</script>

<div class="min-h-full">
	<nav class="navbar bg-base-100 border-b">
		<div class="flex-1">
			<a href="/" class="btn btn-ghost normal-case text-xl">Thesisfinder</a>
		</div>
		<a
			href="https://login.tu-darmstadt.de/idp/profile/cas/login?service=localhost"
			class="btn btn-primary">Login</a
		>
	</nav>
</div>
<slot />
