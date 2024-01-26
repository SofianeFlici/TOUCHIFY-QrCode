<script lang="ts">
	import '../app.pcss';
	import NavBar from '$lib/components/NavBar/NavBar.svelte';
	import { onMount } from 'svelte';
	import { isDarkMode, initDarkMode } from '$lib/utils/darkmode';
	import Spinner from '$lib/components/Loader.svelte';

	// faire un isloading pour charger les données avant d afficher les éléments de la page -----
	let isLoading = true;
	onMount(async () => {
		await initDarkMode();
		isLoading = false;
	});
</script>

{#if isLoading}
	<div class="fixed w-full h-full flex justify-center items-center">
		<Spinner />
	</div>
{:else}
	<NavBar />

	<main
		class={`max-w-screen-lg h-full mx-auto flex justify-center relative text-slate-800 dark:text-slate-300`}
	>
		<slot />
	</main>
{/if}
