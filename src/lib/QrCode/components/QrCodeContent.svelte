<script lang="ts">
    import Card from "$lib/components/Card.svelte";
    import InputRadioButton from "$lib/components/InputRadioButton.svelte";

    let contentData = ["URL", "Email"/*,  "Téléphone", "SMS", "Contact", "Evénement", "Géolocalisation", "Wifi"*/];
    let defaultContent = "URL";
    let defaultContentValue = "https://touchify.io";

    let visible = false;
</script>

<Card>
    <div class="flex flex-col">
        <h1 class="font-semibold mb-2">Contenu du QR Code</h1>
        <input type="button" value={defaultContent} class="text-black rounded m-1 text-sm" on:click={() => visible = !visible} />
        <input type="text" value={defaultContentValue} class="bg-gray-200 rounded p-2 m-1 w-50" /> 
        {#if visible}
            <div class="flex flex-wrap">
                {#each contentData as content}
                    <InputRadioButton on:click={() => defaultContent = content}>{content}</InputRadioButton>
                {/each}
            </div>
        {/if}
    </div>
    
</Card>