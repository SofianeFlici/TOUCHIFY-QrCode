<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { IconChevronUp, IconChevronDown } from 'obra-icons-svelte';
	export let open = false;
	export let title: string;

	console.log('QrCodeBorder.svelte title = ', title);
</script>

<button class="w-full" on:click={() => (open = !open)}>
	<div class="flex justify-between">
		<h2 class="font-semibold m-1 mb-2">{$_(title)}</h2>
		<p class="mt-1">
			{#if open}
            <svelte:component this={IconChevronDown} />
			{:else}
            <svelte:component this={IconChevronUp} />
			{/if}
		</p>
	</div>
</button>

<div class="panel" style="display: {open ? 'block' : 'none'}">
	<slot />
</div>

<style>
	.panel {
		display: none;
	}
</style>
