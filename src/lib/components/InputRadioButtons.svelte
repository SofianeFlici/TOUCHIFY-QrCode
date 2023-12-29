<script lang="ts">
    export let value: string;
    export let options: readonly string[] = [];
    export let text: (option:string) => string = (option:string) => option;
</script>

<div>
    {#each options as option}
        <button type="button" on:click={() => {value = option}} 
            class="
                py-1 px-2 rounded m-1 text-sm sm:text-base
                {value === option? 'bg-slate-500 text-white  dark:bg-slate-950 dark:text-white': 'bg-slate-100 hover:bg-slate-300 text-black border dark:border-slate-500 dark:bg-slate-600 dark:text-white'}
                ">
            {text(option)}
        </button>
    {/each}  
</div>
