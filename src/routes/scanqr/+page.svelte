<script lang="ts">
    import { onMount } from 'svelte';
    import jsQR from 'jsqr';

    let videoElement: HTMLVideoElement;
    let canvasElement: HTMLCanvasElement;
    let canvasContext: CanvasRenderingContext2D | null;

    onMount(async () => {
        canvasContext = canvasElement.getContext('2d');
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
            if (videoElement) {
                videoElement.srcObject = stream;
                videoElement.play();
                scanQRCode();
            }
        } catch (error) {
            console.error('Erreur d’accès à la caméra:', error);
        }
    });

    function scanQRCode(): void {
        if (canvasContext && videoElement.readyState === videoElement.HAVE_ENOUGH_DATA) {
            canvasElement.height = videoElement.videoHeight;
            canvasElement.width = videoElement.videoWidth;
            canvasContext.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
            let imageData = canvasContext.getImageData(0, 0, canvasElement.width, canvasElement.height);
            let code = jsQR(imageData.data, imageData.width, imageData.height, {
                inversionAttempts: "dontInvert",
            });
            if (code) {
                console.log('QR Code trouvé:', code.data);
                // Vous pouvez gérer le QR code trouvé ici
            } else {
                // Pas de QR code trouvé, continuez à scanner
                requestAnimationFrame(scanQRCode);
            }
        } else {
            requestAnimationFrame(scanQRCode);
        }
    }
</script>

<video bind:this={videoElement} class="hidden"></video>
<canvas bind:this={canvasElement}></canvas>
