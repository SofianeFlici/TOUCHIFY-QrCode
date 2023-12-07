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

    type QrCodeData = {
        type: string;
        url: string;
    };

    let qrCodeData: QrCodeData = {
        type: "url",
        url: "touchify.io"
    };

    let options: Options = {
        data: qrCodeData.url,
        image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
        width: 500,
        height: 500,
        dotsOptions: {
            color: "#4267b2",
            type: "rounded"
        },
        imageOptions: {
            crossOrigin: "anonymous",
            margin: 20
        }
    };

    console.log(options);
</script>

<main>
    <div class="left">
        <QrCodeContent />
        <ButtonSave />
        <QrCodeGeneralStyle />
        <QrCodeBorder />
        <QrCodePoint />
        <QrCodeAddImage />
        <QrCodeAdvancedOptions />
    </div>

    <div class="fixed bottom-0 border-black">
        <QrCodeDownload {options}  />
    </div>
</main>


<style>
    * {
        background-color: #E2E8F0;
    }

    .left{
        margin-bottom: 30vh;
    }
</style>