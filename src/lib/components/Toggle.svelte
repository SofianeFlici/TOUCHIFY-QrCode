<script lang='ts'>
    import { _ } from 'svelte-i18n';
    export let value;
    export let text = '';

</script>

<label class="inline-flex items-center cursor-pointer">
    <input
        type="checkbox"
        class="sr-only peer"
        bind:checked={value}
    />
    <div
        class="relative w-10 h-6 border-t-indigo peer-focus:outline-none rounded-full border peer dark:bg-t-black peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[0.175rem] after:start-[0.175rem] dark:after:bg-white after:bg-t-indigo after:peer-checked:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-white peer-checked:bg-t-indigo dark:peer-checked:bg-t-ciel"
    ></div>
    {#if text}
        <span class="ms-3 text-sm dark:text-gray-300">{$_(`${text}`)}</span>
    {/if}
</label>