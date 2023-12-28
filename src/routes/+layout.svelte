<script lang="ts">
	import '../app.pcss';
	import NavBar from '$lib/components/NavBar/NavBar.svelte';
	import { onMount } from 'svelte';
	import { isDarkMode, initDarkMode } from '$lib/utils/darkmode';

	// faire un isloading pour charger les données avant d afficher les éléments de la page -----
	onMount(initDarkMode);
</script>

<NavBar />

<main class={`container h-full mx-auto flex justify-center relative`}>
	<slot />
</main>
