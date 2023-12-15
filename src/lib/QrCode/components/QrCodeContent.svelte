<script lang="ts">
    import Card from "$lib/components/Card.svelte";
    import InputRadioButton from "$lib/components/InputRadioButton.svelte";
    import { ListQrCodeDataType } from "../qrcode.data";
    import type { QrCodeData } from "../qrcode.data";
    
    export let dataContent:QrCodeData;
    
    let defaultContent = "URL";
    
    let visible = false;
    
    let qrCodeData: QrCodeData = dataContent;



    const data_types = ListQrCodeDataType();

    function selectedType(data_type: any){
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
        {#if defaultContent == "URL"}
            <input type="text" class="text-black text-sm rounded mt-3 mb-3 border bg-gray-200 w-full p-2 placeholder-black" placeholder="https://www.example.com" />
        {/if}
        {#if defaultContent == "Email"}
            <label for="email" class="text-black text-sm font-semibold">Adresse email</label>
            <input type="email" class="text-black text-sm rounded mt-3 mb-3 border bg-gray-200 w-full p-2 placeholder-black" />
            <label for="subject" class="text-black text-sm font-semibold">Sujet</label>
            <input type="subject" class="text-black text-sm rounded mt-3 border bg-gray-100 w-full p-2 placeholder-black" />
        {/if}
    {/if}
</Card>