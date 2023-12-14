<script lang='ts'>
    import Card from "$lib/components/Card.svelte";
    import InputColor from "$lib/components/InputColor.svelte";
    import InputRadioButton from "$lib/components/InputRadioButton.svelte";
    import type { Options } from "qr-code-styling";

    export let cornersDotOptions: Options["cornersDotOptions"];

    let types = [undefined, "square", "dot"] as const;
</script>


<Card>
    {#if cornersDotOptions}
    <div class="flex flex-col">
        <h2 class="font-semibold m-1 mb-2">Point des coins</h2>
        <p class="font-semibold m-1">Style</p>
        <div>
            {#each types as type}
                <InputRadioButton on:click={() => {if (cornersDotOptions) cornersDotOptions.type = type}}>{type}</InputRadioButton>
            {/each}  
        </div>
        <div>
            <p class="font-semibold m-1">Couleur</p>
            <InputColor bind:value = {cornersDotOptions.color} />
        </div>
    </div> 
    {/if}
</Card>
