<script lang="ts">
	import type { Options } from 'qr-code-styling';
	import { onMount } from 'svelte';
	import QrCodeContent from '$lib/QrCode/components/QrCodeContent.svelte';
	import QrCodeGeneralStyle from '$lib/QrCode/components/QrCodeGeneralStyle.svelte';
	import QrCodeBorder from '$lib/QrCode/components/QrCodeBorder.svelte';
	import QrCodePoint from '$lib/QrCode/components/QrCodePoint.svelte';
	import QrCodeAddImage from '$lib/QrCode/components/QrCodeAddImage.svelte';
	import QrCodeAdvancedOptions from '$lib/QrCode/components/QrCodeAdvancedOptions.svelte';
	import QrCodeDownload from '$lib/QrCode/components/QrCodeDownload.svelte';
	import QrCodeDefinedChoice from '$lib/QrCode/components/QrCodeDefinedChoice.svelte';
	import db, { type QrCodeItem } from '$lib/db';
	import type { QrCodeData } from '$lib/QrCode/qrcode.data';

	let id: string = '';
	let defaultContent = 'URL';
	let optionsType: string;

	let options: Options;

	onMount(async () => {
		const urlParams = new URLSearchParams(window.location.search);
		id = urlParams.get('id') as string;

		if (id) {
			try {
				// Récupération des données de la table 'options'
				const item: QrCodeItem | undefined = await db.options.get(parseInt(id));
				if (item) {
					options = item.options;
					data = item.data;
					defaultContent = item.type;
					optionsType = item.type;

					console.log('options', item.options);

					if (item.image) {
						blob = item.image;
						options.image = URL.createObjectURL(item.image);
					}
				}
			} catch (error) {
				console.error('Failed to load options or images:', error);
			}
		}

		options = options || {
			dotOptions:{
				type:undefined,
			},
			image: undefined,
			data: '',
			width: 500,
			height: 500,
			dotsOptions: {
			},
			imageOptions: {
				crossOrigin: 'anonymous',
				margin: 20
			},
			cornersSquareOptions: {
				type: undefined
			},
			cornersDotOptions: {},
			backgroundOptions: {},
			qrOptions: {
				typeNumber: 0,
				errorCorrectionLevel: 'Q',
				mode: 'Byte'
			}
		};
	});

	let data: QrCodeData = {};
	let blob: Blob | null = null;

</script>

{#if options}
	<div
		class="w-[100vh] h-full flex flex-col mt-2 justify-center
	sm:flex-row-reverse sm:mt-0"
	>
		<div
			class="mb-24 sm:mb-0 px-4 sm:-ml-4
	sm:w-2/3
	"
		>
			<QrCodeDownload bind:options {data} {blob} {id} {defaultContent} />
		</div>
		<div class="w-full mt-2">
			<QrCodeContent bind:data bind:options bind:defaultContent {optionsType} />
			<QrCodeGeneralStyle
				bind:dotsOptions={options.dotsOptions}
				bind:backgroundOptions={options.backgroundOptions}
			/>

			<QrCodeBorder bind:cornersSquareOptions={options.cornersSquareOptions} bind:generalOptions={options.dotsOptions} />
			<QrCodePoint bind:cornersDotOptions={options.cornersDotOptions} />
			<QrCodeAddImage
				bind:blobUrl={options.image}
				bind:blob
				bind:imageOptions={options.imageOptions}
			/>
			<QrCodeAdvancedOptions bind:qrOptions={options.qrOptions} />
		</div>
	</div>
{/if}

<!-- A Definir -->
<!-- <QrCodeDefinedChoice bind:options /> -->
