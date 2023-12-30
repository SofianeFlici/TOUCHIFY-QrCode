<script lang="ts">
	import type { Options } from 'qr-code-styling';

	import QrCodeContent from '$lib/QrCode/components/QrCodeContent.svelte';
	import QrCodeGeneralStyle from '$lib/QrCode/components/QrCodeGeneralStyle.svelte';
	import ButtonSave from '$lib/components/ButtonSave.svelte';
	import QrCodeBorder from '$lib/QrCode/components/QrCodeBorder.svelte';
	import QrCodePoint from '$lib/QrCode/components/QrCodePoint.svelte';
	import QrCodeAddImage from '$lib/QrCode/components/QrCodeAddImage.svelte';
	import QrCodeAdvancedOptions from '$lib/QrCode/components/QrCodeAdvancedOptions.svelte';
	import QrCodeDownload from '$lib/QrCode/components/QrCodeDownload.svelte';
	// import type { QrCodeData } from "$lib/QrCode/qrcode.data";

	let data: string = 'https://touchify.io';
	let blobUrl: string;
	let blob: Blob | null = null;

	$: console.log('+page.svelte blob = ', blob);

	$: console.log('+page.svelte data = ', data);

	// export let dataContent:QrCodeData;

	// let qrCodeData: QrCodeData = dataContent;

	let options: Options = {
		image: undefined,
		data: data,
		width: 500,
		height: 500,
		dotsOptions: {
			color: '#4267b2',
			type: 'square'
		},
		imageOptions: {
			crossOrigin: 'anonymous',
			margin: 20
		},
		cornersSquareOptions: {
			type: undefined
		},
		cornersDotOptions: {},
		backgroundOptions: {
			color: 'transparent'
		},
		qrOptions: {
			typeNumber: 0,
			errorCorrectionLevel: 'Q',
			mode: 'Byte'
		}
	};
	$: console.log('+page.svelte blobUrl = ', blobUrl);
	$: options.data = data;
</script>

<div class="grid grid-cols-1 sm:grid-cols-[auto_240px] grow lg:grid-cols-[auto_320px]">
	<section class="mb-48 sm:mb-0">
		<QrCodeContent bind:data />
		<ButtonSave data={options} {blob} />
		<QrCodeGeneralStyle
			bind:dotsOptions={options.dotsOptions}
			bind:backgroundOptions={options.backgroundOptions}
		/>
		<QrCodeBorder bind:cornersSquareOptions={options.cornersSquareOptions} />
		<QrCodePoint bind:cornersDotOptions={options.cornersDotOptions} />
		<QrCodeAddImage bind:blobUrl bind:blob/>
		<QrCodeAdvancedOptions bind:qrOptions={options.qrOptions} />
	</section>

	<section class="grid grid-rows-1 fixed bottom-0 border-black sm:relative">
		<div class="sm:fixed sm:w-[240px] lg:w-[320px]">
			<QrCodeDownload bind:options bind:blobUrl />
		</div>
	</section>
</div>

<style>
</style>
