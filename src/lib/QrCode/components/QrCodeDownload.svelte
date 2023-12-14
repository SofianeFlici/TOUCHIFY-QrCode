<script lang='ts'>
    import { onMount } from "svelte";
    import type { Options } from "qr-code-styling";
    import Card from "$lib/components/Card.svelte";
    import InputRadioButton from "$lib/components/InputRadioButton.svelte";
    export let classNames: string = "default";

    export let options: Options;

    let qrCode: any;
    let qrCodeElement: HTMLElement;

    onMount(async () => {
        const { default: QRCodeStyling } = await import("qr-code-styling");
        qrCode = new QRCodeStyling(options);
        if (qrCodeElement) {
            qrCode.append(qrCodeElement);
        }
    });

    $: if (qrCode) {
        qrCode.update(options);
    }

    let styles = ["JPEG", "PNG", "SVG", "WEBP"];
    let defaultStyle = "SVG";
</script>


<div class="flex border-y-2 border-gray-400 bg-slate-300 shadow sm:flex-col sm:bg-transparent sm:border-hidden">
    <div class="mr-0 w-2/6 shrink-0 sm:w-full sm:p-2 ">
        <div class="qr-preview m-4 bg-white aspect-square p-2 rounded sm:m-2" bind:this={qrCodeElement}></div>
    </div>

    <Card>
        <div class="col-auto rounded">
            {#each styles as style}
                <InputRadioButton on:click={() => defaultStyle = style}>{style}</InputRadioButton>
            {/each}  
        </div>
    
        <button class="bg-slate-800 text-white text-sm py-2 rounded w-full mt-2">
            Télécharger
        </button>
    </Card>
</div>
<style>
    .qr-preview > :global(canvas) {
        width: 100%;
        height: 100%;
    }
    
</style>