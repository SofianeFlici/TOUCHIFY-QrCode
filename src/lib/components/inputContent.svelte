<script lang="ts">
	import type { Options } from 'qr-code-styling';
    import { _ } from 'svelte-i18n';
	export let value: string;
	export let nameType: string = 'text';
	export let options: Options;
</script>

{#if nameType == 'text'}
	<input
		type="text"
		class="text-t-indigo border-t-indigo text-sm rounded-md mt-3 mb-3 border bg-white w-full p-2 placeholder-black dark:bg-t-black dark:text-white dark:border-white"
		bind:value
        placeholder={value}
	/>
{/if}
{#if nameType == 'date'}
	<input
		type="date"
		class="text-t-indigo border-t-indigo text-sm rounded-md mt-3 mb-3 border bg-white w-full p-2 placeholder-black"
		bind:value
	/>
{/if}
