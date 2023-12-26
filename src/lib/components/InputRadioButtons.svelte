<script lang="ts">
    export let value: string = "";
    export let options: readonly string[] = [];
    export let text: (option:string) => string = (option:string) => option;
</script>

<div>
    {#each options as option}
        <button type="button" on:click={() => {value = option}} 
            class="
                py-1 px-2 rounded m-1 text-sm sm:text-base
                {value === option? 'bg-slate-500 text-white': 'bg-slate-100 hover:bg-slate-300 text-black'}
                ">
            {text(option)}
        </button>
    {/each}  
</div>
