<script>
	import '../app.postcss';
	import 'highlight.js/styles/atom-one-dark.css';
	import AccountCircle from 'svelte-material-icons/AccountCircle.svelte';
	import FilePlus from 'svelte-material-icons/FilePlus.svelte';
	import ViewDashboard from 'svelte-material-icons/ViewDashboard.svelte';
	import Logout from 'svelte-material-icons/LogoutVariant.svelte';
	import { page } from '$app/stores';

	export let data;
</script>

<div class="min-h-full">
	<nav class="navbar bg-base-100">
		<div class="flex-1">
			<img src="/tud_logo.png" alt="TU Darmstadt Logo" height="50px" id="tud-logo" />
			<a href="/" class="btn btn-ghost normal-case text-xl">Thesisfinder</a>
		</div>
		{#if data.loggedIn}
			<a
				href="/overview"
				class="btn btn-ghost btn-md"
				selected={$page.route.id.startsWith('/overview')}>
				<ViewDashboard />
				<span>Themenübersicht</span>
			</a>
			{#if data.isEmployee}
				<a
					href="/create"
					class="btn btn-ghost btn-md"
					selected={$page.route.id.startsWith('/created')}>
					<FilePlus />
					<span>Thema erstellen</span>
				</a>
			{/if}
			<a
				href="/profile"
				class="btn btn-ghost btn-md"
				selected={$page.route.id.startsWith('/profile')}>
				<AccountCircle />
				<span>Profil</span>
			</a>
			<a href="/logout" class="btn btn-ghost mr-3 text-error">
				<Logout />
				<span>Logout</span>
			</a>
		{/if}
	</nav>
</div>
<slot />

<style lang="scss">
	a.btn[selected='true'] {
		background-color: hsl(var(--p));
		color: white;
	}
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
