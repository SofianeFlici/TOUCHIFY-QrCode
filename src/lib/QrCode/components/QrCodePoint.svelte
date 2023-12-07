<script lang='ts'>
    import Card from "$lib/components/Card.svelte";
    import InputColor from "$lib/components/InputColor.svelte";
    import InputRadioButton from "$lib/components/InputRadioButton.svelte";

    let style = ["Aucun", "Carré", "Point"]
    let defaultStyle = "Aucun";
</script>


<Card>
    <div class="flex flex-col">
        <h2 class="font-semibold m-1 mb-2">Point des coins</h2>
        <p class="font-semibold m-1">Style</p>
        <div>
            {#each style as style}
                <InputRadioButton on:click={() => defaultStyle = style}>{style}</InputRadioButton>
            {/each}  
        </div>
        <div>
            <p class="font-semibold m-1">Couleur</p>
            <InputColor />
        </div>
    </div> 

</Card>
