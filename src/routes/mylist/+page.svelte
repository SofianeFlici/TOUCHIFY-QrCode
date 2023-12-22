<script lang=ts>
    // j'import ma db
    import db  from "$lib/db.js";
    // j'import le onMount : qui est un hook qui permet d'executer une fonction au chargement de la page
    import { onMount } from "svelte";
    // j'import le Options de qr-code-styling : qui permet de customiser le qr code
    import type { Options } from "qr-code-styling";

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


<div class="flex border-y-2 border-gray-400 bg-slate-300 shadow sm:flex-col sm:bg-transparent sm:border-hidden">
    <div class="mr-0 w-2/6 shrink-0 sm:w-full sm:p-2 ">
    {#each qrList as qr, i }
    <p>{qr.options.data}</p>
    <div class="qr-preview m-4 bg-white aspect-square p-2 rounded sm:m-2" bind:this={qrCodeElement[i]}></div>
    {/each}
    </div>
</div>