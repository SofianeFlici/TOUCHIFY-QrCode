<script lang="ts">
    export let value: string | undefined;
    export let options: readonly string[] = [];
    export let text: (option:string) => string = (option:string) => option;
</script>

<div>
    {#each options as option}
        <button type="button" on:click={() => {value = option}} 
            class="
                py-1 px-2 rounded-md m-1 text-xs sm:text-sm dark:bg-t-black dark:text-white dark:border-white
                {value === option? 'bg-t-indigo text-white  dark:bg-t-ciel dark:text-white': 'border-t-indigo text-t-indigo hover:bg-slate-300 border dark:border-white dark:bg-t-black dark:text-white'}
                ">
            {text(option)}
        </button>
    {/each}  
</div>
