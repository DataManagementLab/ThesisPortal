<script>
	import '../app.postcss';
	import AccountCircle from 'svelte-material-icons/AccountCircle.svelte';
	import FilePlus from 'svelte-material-icons/FilePlus.svelte';
	import ViewDashboard from 'svelte-material-icons/ViewDashboard.svelte';
	import Logout from 'svelte-material-icons/LogoutVariant.svelte';

	export let data;
</script>

<div class="min-h-full">
	<nav class="navbar bg-base-100">
		<div class="flex-1">
			<img src="/tud_logo.png" alt="TU Darmstadt Logo" height="50px" id="tud-logo" />
			<a href="/" class="btn btn-ghost normal-case text-xl">Thesisfinder</a>
		</div>
		<a href="/overview" class="btn btn-ghost btn-md">
			<ViewDashboard />
			<span>Themenübersicht</span>
		</a>
		{#if data.isEmployee}
			<a href="/create" class="btn btn-ghost btn-md">
				<FilePlus />
				<span>Thema erstellen</span>
			</a>
		{/if}
		<a href="/profile" class="btn btn-ghost btn-md">
			<AccountCircle />
			<span>Profil</span>
		</a>
		<a href="/logout" class="btn btn-ghost mr-3 text-error">
			<Logout />
			<span>Logout</span>
		</a>
	</nav>
</div>
<slot />

<style lang="scss">
	nav.navbar > a {
		font-size: 1.5rem;
		margin-right: 0.25rem;
		padding: 0.5rem;
		> span {
			font-size: 0.9rem;
			margin-left: 0.25rem;
		}
	}
	@media (max-width: 830px) {
		nav.navbar > a > span {
			display: none;
		}
	}
</style>
