<script>
	export let data;
</script>

<div class="hero min-h-[calc(100vh-5rem)] bg-base-200">
	<div class="hero-content text-center">
		<div class="max-w-md">
			<h1 class="text-5xl font-bold">Willkommen auf dem Thesisportal der TU-Darmstadt</h1>
			<p class="py-6">Finde hier das Thema für deine Thesis!</p>
			{#if data.user == undefined}
				<a
					href="{data.CAS_HOST}/cas/login?service={data.PUBLIC_HOST}{data.PUBLIC_PORT == 443 ? '' : ':'+data.PUBLIC_PORT}"
					class="btn btn-primary">
					Jetzt anmelden
				</a>
			{/if}
		</div>
	</div>
</div>
