<script lang="ts">
    import type { Options } from "qr-code-styling";

    import QrCodeContent from "$lib/QrCode/components/QrCodeContent.svelte";
    import QrCodeGeneralStyle from "$lib/QrCode/components/QrCodeGeneralStyle.svelte";
    import ButtonSave from "$lib/components/ButtonSave.svelte";
    import QrCodeBorder from "$lib/QrCode/components/QrCodeBorder.svelte";
    import QrCodePoint from "$lib/QrCode/components/QrCodePoint.svelte";
    import QrCodeAddImage from "$lib/QrCode/components/QrCodeAddImage.svelte";
    import QrCodeAdvancedOptions from "$lib/QrCode/components/QrCodeAdvancedOptions.svelte";
    import QrCodeDownload from "$lib/QrCode/components/QrCodeDownload.svelte";

    export let defaultContent: string;

    $: console.log(defaultContent);

    type QrCodeData = {
        type: string;
        url: string;
    };

    let qrCodeData: QrCodeData = {
        type: "url",
        url: "touchify.io"
    };

    let options: Options = {
        image: undefined,
        data: qrCodeData.url,
        width: 500,
        height: 500,
        dotsOptions: {
            color: "#4267b2",
            type: "rounded"
        },
        imageOptions: {
            crossOrigin: "anonymous",
            margin: 20
        },
        cornersSquareOptions: {},
        cornersDotOptions: {},
        backgroundOptions: {
            color: "transparent"
        },
        qrOptions: {
            typeNumber: 0,
            errorCorrectionLevel: "Q",
            mode: "Byte",
        }
    };

</script>

<div class="grid grid-cols-1 sm:grid-cols-[auto_240px] grow lg:grid-cols-[auto_320px]">
    <section class="mb-48 sm:mb-0 ">
        <QrCodeContent bind:options />
        <ButtonSave />
        <QrCodeGeneralStyle bind:dotsOptions={options.dotsOptions} />
        <QrCodeBorder bind:cornersSquareOptions={options.cornersSquareOptions} />
        <QrCodePoint bind:cornersDotOptions={options.cornersDotOptions} />
        <QrCodeAddImage bind:qrImage={options.image} />
        <QrCodeAdvancedOptions bind:qrOptions={options.qrOptions} />
    </section>

    <section class="grid grid-rows-1 fixed bottom-0 border-black sm:relative">
        <div class="sm:fixed sm:w-[240px] lg:w-[320px]">
            <QrCodeDownload {options}  />
        </div>
    </section>
</div>


<style>

</style>