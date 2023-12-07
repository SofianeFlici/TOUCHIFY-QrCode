<script lang='ts'>
    import { onMount } from "svelte";
    import type { Options } from "qr-code-styling";
    import Card from "$lib/components/Card.svelte";
    import InputRadioButton from "$lib/components/InputRadioButton.svelte";

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

    let styles = ["JPEG", "PNG", "SVG", "WEBP"];
    let defaultStyle = "SVG";
</script>


<div class="flex border-y-2 border-gray-400 bg-gray-300 shadow">
    <Card>
        <div class="qr-preview relative" bind:this={qrCodeElement}></div>
    </Card>

    <Card>
        <div class="flex flex-col">
            <div class="flex mb-2">
                {#each styles as style}
                    <InputRadioButton on:click={() => defaultStyle = style}>{style}</InputRadioButton>
                {/each}  
            </div>
            <div class="">
                <button class="bg-gray-600 text-white  text-sm py-2 px-4 rounded w-full mt-2">
                    Télécharger
                </button>
            </div>
        </div>
    </Card>
</div>
<style>
    .qr-preview > :global(canvas) {
        width: 100%;
        height: 100%;
    }
</style>