<script lang="ts">
	import type { Options } from 'qr-code-styling';
	import { onMount } from 'svelte';
	import QrCodeContent from '$lib/QrCode/components/QrCodeContent.svelte';
	import QrCodeGeneralStyle from '$lib/QrCode/components/QrCodeGeneralStyle.svelte';
	import ButtonSave from '$lib/components/ButtonSave.svelte';
	import QrCodeBorder from '$lib/QrCode/components/QrCodeBorder.svelte';
	import QrCodePoint from '$lib/QrCode/components/QrCodePoint.svelte';
	import QrCodeAddImage from '$lib/QrCode/components/QrCodeAddImage.svelte';
	import QrCodeAdvancedOptions from '$lib/QrCode/components/QrCodeAdvancedOptions.svelte';
	import QrCodeDownload from '$lib/QrCode/components/QrCodeDownload.svelte';
	import QrCodeDefinedChoice from '$lib/QrCode/components/QrCodeDefinedChoice.svelte';
	import db, { type QrCodeItem } from '$lib/db';

	let id: string = '';
	let defaultContent = 'URL';

	onMount(async () => {
		const urlParams = new URLSearchParams(window.location.search);
		id = urlParams.get('id') as string;

		if (id) {
			try {
				// Récupération des données de la table 'options'
				const item: QrCodeItem | undefined = await db.options.get(parseInt(id));
				if (item) {
					options = item.options;

					if (item.image) {
						blob = item.image;
						options.image = URL.createObjectURL(item.image);
					}
				}
			} catch (error) {
				console.error('Failed to load options or images:', error);
			}
		}
	});

	let data: string = 'https://touchify.io';
	let blob: Blob | null = null;

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
	$: options.data = data;
</script>

<div class="grid grid-cols-1 sm:grid-cols-[auto_240px] grow lg:grid-cols-[auto_320px]">
	<section class="mb-48 sm:mb-0">
		<QrCodeDefinedChoice bind:options={options} />
		<QrCodeContent bind:data bind:defaultContent={defaultContent} />
		<ButtonSave data={options} {blob} {id} {defaultContent} />
		<QrCodeGeneralStyle
			bind:dotsOptions={options.dotsOptions}
			bind:backgroundOptions={options.backgroundOptions}
		/>
		<QrCodeBorder bind:cornersSquareOptions={options.cornersSquareOptions} />
		<QrCodePoint bind:cornersDotOptions={options.cornersDotOptions} />
		<QrCodeAddImage bind:blobUrl={options.image} bind:blob bind:imageOptions={options.imageOptions} />
		<QrCodeAdvancedOptions bind:qrOptions={options.qrOptions} />
	</section>

	<section class="grid grid-rows-1 fixed bottom-0 border-black sm:relative">
		<div class="sm:fixed sm:w-[240px] lg:w-[320px]">
			<QrCodeDownload bind:options />
		</div>
	</section>
</div>
