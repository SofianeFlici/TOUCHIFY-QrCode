<script lang="ts">
    export let value: string | undefined;
    export let options: readonly string[] = [];
    export let text: (option:string) => string = (option:string) => option;
</script>

<div>
    {#each options as option}
        <button type="button" on:click={() => {value = option}} 
            class="
                py-1 px-2 rounded-md m-1 text-xs sm:text-base dark:bg-t-black dark:text-white dark:border-white
                {value === option? 'bg-t-indigo text-white  dark:bg-t-ciel dark:text-white': 'bg-slate-100 hover:bg-slate-300 text-black border dark:border-slate-500 dark:bg-slate-600 dark:text-white'}
                ">
            {text(option)}
        </button>
    {/each}  
</div>
