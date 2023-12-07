<script lang='ts'>
    import Card from "$lib/components/Card.svelte";
    import InputRadioButton from "$lib/components/InputRadioButton.svelte";

    let styles = ["L", "M", "Q", "H"]
    let defaultStyle = "Q";
    let modes = [ "Numérique", "Alphanumérique", "Byte", "Kanji"]
    let defaultMode = "Byte";
</script>


<Card>
    <div class="flex flex-col">
        <h2 class="font-semibold m-1 mb-2">Point des coins</h2>
        <p class="font-semibold m-1">Style</p>
        <div>
            {#each styles as style}
                <InputRadioButton on:click={() => defaultStyle = style}>{style}</InputRadioButton>
            {/each}  
        </div>
        <div>
            {#each modes as mode}
                <InputRadioButton on:click={() => defaultMode = mode}>{mode}</InputRadioButton>
            {/each}  
        </div>
    </div> 

</Card>
