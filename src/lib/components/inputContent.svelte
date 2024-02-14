<script lang="ts">
    import { _ } from 'svelte-i18n';
	export let value: string;
	export let nameType: string = 'text';
</script>

{#if nameType == 'text'}
	<input
		type="text"
		class="text-t-indigo border-t-indigo text-sm rounded-md mt-3 mb-3 border-2 bg-white w-full p-2 placeholder-black dark:bg-slate-600 dark:text-white dark:border-slate-500"
		bind:value
        placeholder={value}
	/>
{/if}
{#if nameType == 'date'}
	<input
		type="date"
		class="text-t-indigo border-t-indigo text-sm rounded-md mt-3 mb-3 border-2 bg-white w-full p-2 placeholder-black"
		bind:value
	/>
{/if}
