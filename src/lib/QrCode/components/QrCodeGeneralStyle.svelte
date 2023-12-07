<script lang="ts">
    import  { createEventDispatcher } from 'svelte';
    import Card from "$lib/components/Card.svelte";
	import InputColor from "$lib/components/InputColor.svelte";
    import InputRadioButton from "$lib/components/InputRadioButton.svelte";
    
    let style = ["Carré", "Arrondi", "Très arrondi", "Points", "Classy", "Classy arrondi"];
    let defaultStyle = "Carré";
    let transparent = true;
    let degrade = false;

    const dispatch = createEventDispatcher();

    $: if (defaultStyle){
        dispatch('styleChange', {defaultStyle})
    }
</script>

<Card>
    <div class="flex flex-col">
        <h2 class="font-semibold m-1 mb-2">Style général</h2>
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
        <div>
            <input type="checkbox" value="transparent"on:click={() => transparent = !transparent} checked={transparent} class="m-1" /> transparent  
        </div>
        {#if !transparent}
            <div>
                <InputColor />
            </div>
            <input type="checkbox" value="degrade"on:click={() => degrade = !degrade} checked={degrade} class="m-1" /> dégradé
            {/if}
    </div> 

</Card>
