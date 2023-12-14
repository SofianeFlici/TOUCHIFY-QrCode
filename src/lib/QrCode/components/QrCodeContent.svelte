<script lang="ts">
    import Card from "$lib/components/Card.svelte";
    import InputRadioButton from "$lib/components/InputRadioButton.svelte";
    import { ListQrCodeDataType } from "../qrcode.data";
    import FormField from "$lib/components/FormField.svelte";
	import type { Options } from "qr-code-styling";
    
    export let options: Options;

    let defaultContent = "URL";

    let visible = false;

    const data_types = ListQrCodeDataType();

    function selectedType(data_type: any){
        //prendre tout l objet data_type
        defaultContent = data_type.type; 
        visible = false;
    }

</script>

<Card>
    <h1 class="font-semibold mb-2">Contenu du QR Code</h1>
        <input type="button" value={defaultContent} class="mb-2 self-start justify-start text-sm" on:click={() => visible = !visible} />
    <div>
    {#if visible == true}
        {#each data_types as data_type}
        <InputRadioButton on:click={() => selectedType(data_type) }>{data_type.type}</InputRadioButton>
        {/each}
    {/if}
    </div>
    {#if visible == false}
        <FormField {defaultContent} />
    {/if}
</Card>