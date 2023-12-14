<script lang="ts">
    import "../app.pcss";
	import NavBar from "$lib/components/NavBar/NavBar.svelte";
</script>

<NavBar />

<main class="container h-full mx-auto flex justify-center relative">
    <slot />
</main>
