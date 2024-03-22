<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import jsQR from 'jsqr';
	import { parseData, innerHtml } from '$lib/utils/parseQrData';

	let videoElement: HTMLVideoElement;
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null;
	let result: string = '';
	let renderedData:any = [];

	function reset() {
		result = '';
		startVideo();
	}

	function startVideo() {
		navigator.mediaDevices
			.getUserMedia({ video: { facingMode: 'environment' } })
			.then((stream) => {
				videoElement.srcObject = stream;
				videoElement.play();
				scanQRCode();
			})
			.catch((error) => {
				console.error('Error accessing the camera', error);
			});
	}

	onMount(() => {
		ctx = canvas.getContext('2d');
		startVideo();
	});

	function scanQRCode() {
		const scan = () => {
			if (videoElement.readyState === videoElement.HAVE_ENOUGH_DATA) {
				canvas.height = videoElement.videoHeight;
				canvas.width = videoElement.videoWidth;
				ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
				const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
				const code = jsQR(imageData.data, imageData.width, imageData.height);
				if (code) {
					result = code.data;
					renderedData = parseData(result);
					console.log('QR code data', renderedData);
					videoElement.srcObject?.getTracks().forEach((track) => track.stop());
				}
			}
			if (!result) {
				requestAnimationFrame(scan);
			}
		};
		scan();
	}

	function stopVideo() {
		if (videoElement?.srcObject) {
			videoElement.srcObject.getTracks().forEach((track: any) => track.stop());
			videoElement.srcObject = null;
		}
	}

	onDestroy(() => {
		stopVideo();
	});
</script>

<div
	class="w-full justify-center flex flex-col items-center text-t-indigo absolute top-0 right-0 left-0 bottom-0
			dark:text-t-ciel"
>
	{#if result == ''}
		<video bind:this={videoElement} width="700" height="700" aria-label="Flux vidéo pour la lecture de codes QR" class="-z-1 absolute"></video>
		<canvas bind:this={canvas} width="400" height="400" style="display: none;"></canvas>
		<div
			class="relative w-20 h-20 flex justify-center items-center
		sm:w-52 sm:h-52"
		>
			<div
				class="absolute top-0 left-0 w-[32%] h-[32%] border-t-4 border-l-4 border-current rounded-tl-xl"
			></div>
			<div
				class="absolute top-0 right-0 w-[32%] h-[32%] border-t-4 border-r-4 border-current rounded-tr-xl"
			></div>
			<div
				class="absolute bottom-0 left-0 w-[32%] h-[32%] border-b-4 border-l-4 border-current rounded-bl-xl"
			></div>
			<div
				class="absolute bottom-0 right-0 w-[32%] h-[32%] border-b-4 border-r-4 border-current rounded-br-xl"
			></div>
		</div>
		<p class="text-xs font-semibold mt-4 z-10 sm:text-md">Scannez le QR code</p>
	{:else}
		{#each renderedData as { key, value }}
			{@html innerHtml(key, value)}
		{/each}

		<div class="w-full flex flex-col justify-center items-center">
			<button
				class="text-xs border border-t-indigo bg-white rounded-md p-2 dark:bg-t-black dark:text-white dark:border-white
			sm:text-sm"
				on:click={reset}
			>
				Scanner un autre QrCode
			</button>
		</div>
	{/if}
</div>

<style>
</style>
