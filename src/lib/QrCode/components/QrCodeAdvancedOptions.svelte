<script lang='ts'>
    import Card from "$lib/components/Card.svelte";
    import InputRadioButton from "$lib/components/InputRadioButton.svelte";
	import type { Options } from "qr-code-styling";

    export let qrOptions: Options["qrOptions"];
    
    let styles = ["L", "M", "Q", "H"] as const;
    let modes = [ "Numeric", "Alphanumeric", "Byte", "Kanji"] as const;
</script>


<Card>
    {#if qrOptions}
        <div class="flex flex-col">
            <h2 class="font-semibold m-1 mb-2">Options avancées</h2>
            <p class="font-semibold text-sm m-1">Numéro de type</p>
            <div>
                <input type="number" bind:value={qrOptions.typeNumber} min="0" max="40"  class="text-black text-sm rounded mt-3 mb-3 border bg-gray-200 p-2 placeholder-black w-44" />
            </div>
            <div>
                {#each styles as style}
                    <InputRadioButton on:click={() => {if (qrOptions) qrOptions.errorCorrectionLevel = style}}>{style}</InputRadioButton>
                {/each}  
            </div>
            <div>
                {#each modes as mode}
                    <InputRadioButton on:click={() => {if (qrOptions) qrOptions.mode = mode}}>{mode}</InputRadioButton>
                {/each}  
            </div>
        </div> 
    {/if}
</Card>
