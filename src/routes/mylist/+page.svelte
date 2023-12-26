<script lang=ts>
    // j'import ma db
    import db  from "$lib/db.js";
    // j'import le onMount : qui est un hook qui permet d'executer une fonction au chargement de la page
    import { onMount } from "svelte";
    // j'import le Options de qr-code-styling : qui permet de customiser le qr code
    import type { Options } from "qr-code-styling";
    import { _ } from 'svelte-i18n';
    import Card from "$lib/components/Card.svelte";

    // je donne un type à mes données

    type QrCode = {
        qr: any;
        options: Options;
    };

    // je déclare mes variables 

    let data : Options[] = [];
    let qrList: QrCode[] = [];
    let qrCodeElement: HTMLElement[] = [];

    onMount(async () => {
        try{
        data = await db.options.toArray();
        
        //-------------- Recupération d'un seul QRCode ----------------------------------------------

        // maintenant que j'ai mes objets avec les options je peux les afficher dans le qr code
        // je récupère le qr code
        // const { default: QRCodeStyling } = await import("qr-code-styling");
        // je crée une nouvelle instance de qr code
        // let qrCode = new QRCodeStyling(data[0]);
        // je récupère l'élément html qui contiendra le qr code
        // let qrCodeElement = document.querySelector(".qr-preview");
        // je lui ajoute le qr code
        // qrCode.append(qrCodeElement);
        // je met à jour le qr code
        // qrCode.update(data[0]);

        //-------------------------------------------------------------------------------------

        //-------------- Recupération de tous les QRCode ----------------------------------------------
        const { default: QRCodeStyling } = await import("qr-code-styling");
        qrList = data.map((options) => {
           const qr = new QRCodeStyling(options);
            return { qr, options };
        });
        //-------------------------------------------------------------------------------------

    } catch (error) {
        console.error('Failed to load options:', error);
    }
});
console.log('qrList = ', qrList);

$: if (qrCodeElement.length > 0) {
        qrList.forEach((qrCode, i) => {
            if (qrCodeElement[i]) {
                qrCode.qr.append(qrCodeElement[i]);
            }
        });
    }
</script>
<div class="mt-5">
    <a href="/" class="bg-transparent rounded border border-gray-500 hover:border-gray-700 text-gray-500 hover:text-gray-700 font-semibold py-2">
        {$_('back')}
    </a>
    <div class="flex border-y-2 border-gray-400 bg-slate-300 shadow sm:flex-col sm:bg-transparent sm:border-hidden">
        <div class="mr-0 w-2/6 shrink-0  sm:p-2 ">
        {#each qrList as qr, i }
            <p class="bg-white rounded">{qr.options.data}</p>
            <div class="qr-preview m-4 bg-white aspect-square p-2 rounded sm:m-2" bind:this={qrCodeElement[i]}></div>
                <div>
                    <button class="bg-transparent border border-gray-500 hover:border-gray-700 rounded text-gray-500 hover:text-gray-700 font-semibold py-2 sm:mx-2 sm:my-2">
                        {$_('view.load')}
                    </button>
                    <button class="bg-transparent border border-gray-500 hover:border-gray-700 rounded text-gray-500 hover:text-gray-700 font-semibold py-2 sm:mx-2 sm:my-2" on:click={() => deleteQrCode(i)}>
                        {#if $_('view.delete') == 'Supprimer'}
                            {$_('view.delete')}
                        {:else}
                            {$_('view.delete')}
                        {/if}
                    </button>
                </div>
        {/each}
        </div>
    </div>
</div>

<style>
    .qr-preview > :global(canvas) {
        width: 100%;
        height: 100%;
    }
    
</style>