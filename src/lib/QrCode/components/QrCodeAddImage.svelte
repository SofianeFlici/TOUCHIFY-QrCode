<script lang="ts">
    import Card from "$lib/components/Card.svelte";
	import type { Options } from "qr-code-styling";

    export let qrImage: Options["image"];
    let blob_url: string;

    function onImageChange(e: any){
        const file = e.target.files[0];
        if(file){
            blob_url = URL.createObjectURL(file);
            qrImage = blob_url;
        }
    }

    $: console.log(qrImage);

</script>
<Card>
    <div class="flex flex-col">
        <h2 class="font-semibold m-1 mb-2">Ajouter une image</h2>
        <img src={qrImage} alt="">
        <div>
            <input type="file" bind:value={qrImage} on:change={onImageChange} />
        </div>
    </div>
</Card>
