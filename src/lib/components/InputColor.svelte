<script lang='ts'>
    export let value = '#000000';
</script>

<div class="flex items-center">
    <input type="text" bind:value={value} class="bg-slate-100 border rounded p-2 m-1 w-20 dark:bg-slate-600 dark:border-slate-500"/>
    <input type="color" bind:value={value} class="input-color bg-gray-500" />
</div>

<style lang="postcss">
    .input-color {
        @apply appearance-none
            p-0
            w-10 h-10
            border-none
            bg-transparent
            cursor-pointer;
    }

    .input-color::color-swatch {
        @apply rounded-full border-4 border-slate-200;
    }
    :global(.dark) .input-color::color-swatch {
        @apply border-slate-600;
    }

    .input-color::-webkit-color-swatch-wrapper {
        @apply p-0;
    }
    .input-color::-webkit-color-swatch {
        @apply rounded-full border-4 border-slate-200;
    }
    :global(.dark) .input-color::-webkit-color-swatch {
        @apply border-slate-600;
    }

    .input-color::-moz-color-swatch {
        @apply rounded-full border-4 border-slate-200;
    }
    :global(.dark) .input-color::-moz-color-swatch {
        @apply border-slate-600;
    }
</style>
