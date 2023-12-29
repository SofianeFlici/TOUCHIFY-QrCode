<script lang="ts">
    export let value: string;
    export let nameType: string = "text";
</script>

{#if nameType == "text"}
<input type="text" class="text-black text-sm rounded mt-3 mb-3 border bg-slate-100 w-full p-2 placeholder-black dark:bg-slate-600 dark:text-white dark:border-slate-500" bind:value={value} />
{/if}
{#if nameType == "date"}
<input type="date" class="text-black text-sm rounded mt-3 mb-3 border bg-slate-100 w-full p-2 placeholder-black"  bind:value={value} />
{/if}

