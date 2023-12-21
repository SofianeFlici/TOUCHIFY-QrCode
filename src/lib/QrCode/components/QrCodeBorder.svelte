<script lang='ts'>
    import Card from "$lib/components/Card.svelte";
    import InputColor from "$lib/components/InputColor.svelte";
    import InputRadioButton from "$lib/components/InputRadioButton.svelte";
	import type { Options } from "qr-code-styling";
    import { _ } from 'svelte-i18n';
    export let cornersSquareOptions: Options["cornersSquareOptions"];

    let types = [undefined,'dot','square','extra-rounded'] as const;
</script>


<Card>
    {#if cornersSquareOptions}
    <div class="flex flex-col">
        <h2 class="font-semibold m-1 mb-2">{$_(`corners.square.title`)}</h2>
        <p class="font-semibold m-1">{$_(`corners.square.type.label`)}</p>
        <div>
            {#each types as type}
                <InputRadioButton on:click={() => {if (cornersSquareOptions) cornersSquareOptions.type = type}}>{$_(`corners.square.type.${type}`)}</InputRadioButton>
            {/each}  
        </div>
        <div>
            <p class="font-semibold m-1">{$_(`corners.square.color.label`)}
            <InputColor bind:value = {cornersSquareOptions.color} />
        </div>
    </div> 
    {/if}
</Card>
