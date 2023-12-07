<script lang="ts">
    import "../app.pcss";
	import NavBar from "$lib/components/NavBar/NavBar.svelte";
</script>

<NavBar />

<main class="container h-full mx-auto px-4 sm:p-4">
    <slot />
</main>

<style>
    * {
        padding: 0;
        margin: 0;
        border: border-box;
    }
</style>