<script>
	import '../app.postcss';
	import 'highlight.js/styles/atom-one-dark.css';
	import AccountCircle from 'svelte-material-icons/AccountCircle.svelte';
	import FilePlus from 'svelte-material-icons/FilePlus.svelte';
	import ViewDashboard from 'svelte-material-icons/ViewDashboard.svelte';
	import Logout from 'svelte-material-icons/LogoutVariant.svelte';
	import Sun from 'svelte-material-icons/WhiteBalanceSunny.svelte';
	import Moon from 'svelte-material-icons/MoonWaningCrescent.svelte';
	import { page } from '$app/stores';
	import { themeChange } from 'theme-change';
	import { onMount } from 'svelte';

	export let data;
	let darkMode;
	onMount(() => {
		themeChange(false);
		darkMode = localStorage.getItem('theme') == 'dark';
	});
</script>

<div class="min-h-full">
	<nav class="navbar bg-base-100">
		<div class="flex-1">
			<img src="/tud_logo.png" alt="TU Darmstadt Logo" height="50px" id="tud-logo" />
			<a href="/" class="btn btn-ghost normal-case text-xl">Thesisfinder</a>
		</div>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<label
			class="btn btn-circle swap swap-rotate text-2xl mr-2"
			data-toggle-theme="light,dark"
			on:click={() => themeChange(false)}>
			<input type="checkbox" bind:checked={darkMode} />
			<div class="swap-on fill-current" title="Helles Theme"><Sun /></div>
			<div class="swap-off fill-current" title="Dunkles Theme"><Moon /></div>
		</label>
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
<footer class="footer p-10 bg-base-200 text-base-content">
	<div>
		<img src="/tud_logo.png" alt="TU Darmstadt Logo" height="50px" id="tud-logo" />
		<b>Thesisfinder der TU-Darmstadt</b>
		Finde hier ein Thema für deine Thesis!
	</div>
	<div>
		<span class="footer-title">Quick links</span>
		<a class="link link-hover" href="/overview">Themenübersicht</a>
		<a class="link link-hover" href="/profile">Profil</a>
	</div>
	<div>
		<span class="footer-title">Ressourcen</span>
		<a class="link link-hover" href="/">Thesis guide</a>
	</div>
	<div>
		<span class="footer-title">Kontakt</span>
		<a class="link link-hover" href="mailto:liane.vogel@cs.tu-darmstadt.de">
			Hauptansprechpartner: Liane Vogel
		</a>
		<a class="link link-hover" href="mailto:benedict.mondini@stud.tu-darmstadt.de">
			Entwickler: Benedict Mondini
		</a>
		<a class="link link-hover" href="//github.com/DataManagementLab/ThesisPortal">GitHub</a>
	</div>
</footer>

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
