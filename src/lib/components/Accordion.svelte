<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { IconChevronUp, IconChevronDown } from 'obra-icons-svelte';
	import {page} from '$app/stores';

	export let open = false;
	export let title: string;

</script>

<div class="{($page.url.pathname.startsWith('/mylist/qr') ? 'hidden' : 'block' )}">
	<button type="button" class="w-full" on:click={() => (open = !open)}>
		<span class="flex justify-between items-center ">
			<h2 class="font-semibold">{$_(title)}</h2>
			<p>
				{#if open}
					<svelte:component this={IconChevronUp} />
				{:else}
					<svelte:component this={IconChevronDown} />
				{/if}
			</p>
		</span>
	</button>
	<div class="panel mt-2" style="display: {open ? 'block' : 'none'}">
		<slot />
	</div>
</div>

<div class="{($page.url.pathname.startsWith('/mylist/qr') ? 'block' : 'hidden' )}">
	<button class="w-full" on:click={() => (open = !open)}>
		<div class="flex justify-between items-center text-sm">
			<h2 class="font-semibold">Qr Code Data</h2>
				{#if open}
					<svelte:component this={IconChevronUp} />
				{:else}
					<svelte:component this={IconChevronDown} />
				{/if}
		</div>
	</button>
	<div class="panel" style="display: {open ? 'block' : 'none'}">
		<slot />
	</div>
</div>


<style>
	.panel {
		display: none;
	}
</style>
