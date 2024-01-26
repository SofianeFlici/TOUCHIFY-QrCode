<script lang="ts">
	import { onMount } from 'svelte';
	import type { Options } from 'qr-code-styling';
	import Card from '$lib/components/Card.svelte';
	import InputRadioButtons from '$lib/components/InputRadioButtons.svelte';
	import { IconBookmark, IconDownload } from 'obra-icons-svelte';
	import db from '$lib/db';
	import type { QrCodeData } from '$lib/QrCode/qrcode.data';
	import { _ } from 'svelte-i18n';

	export let options: Options;

	let qrCode: any;
	let qrCodeElement: HTMLElement; // HTMLElement | null = null;

	export let data: QrCodeData;
	export let blob: Blob | null = null;
	export let defaultContent: string;
	export let id: string | null;

	async function saveOptions() {
		const numericId = id ? parseInt(id) : null;

		const item = {
			type: defaultContent,
			date: new Date(),
			data: data,
			options: options,
			image: blob
		};

		try {
			if (numericId) {
				// Obtenir les options existantes.
				const dbItem = await db.options.get(numericId);
				if (!dbItem) {
					console.error(`No options found with id: ${numericId}`);
					return;
				}

				// Mettez à jour les options avec les nouvelles données.
				await db.options.update(numericId, item);
				console.log('Options updated successfully');
			} else {
				// Ajoutez de nouvelles options.
				await db.options.add(item);
				console.log('Options saved successfully');
			}
		} catch (error) {
			console.error('Failed to save options:', error);
		}
	}

	onMount(async () => {
		const opts = Object.assign({}, options);
		const { default: QRCodeStyling } = await import('qr-code-styling');
		qrCode = new QRCodeStyling(opts); // QRCodeStyling(options);
		if (qrCodeElement) {
			qrCode.append(qrCodeElement); // qrCodeElement && qrCode.append(qrCodeElement);
		}
	});

	$: if (qrCode) qrCode.update(options);

	function download() {
		qrCode.download({
			name: 'qrcode',
			extension: defaultStyle
		});
	}

	let styles = ['JPEG', 'PNG', 'SVG', 'WEBP'];
	let defaultStyle = 'SVG';
</script>

<div
	class="flex border-y-2 border-gray-400 bg-slate-300 sm:flex-col sm:bg-transparent sm:border-hidden dark:bg-slate-600 dark:sm:bg-slate-900 dark:border-none"
>
	<div class="mr-0 w-2/6 shrink-0 sm:w-full sm:p-2">
		<div
			class="qr-preview m-4 bg-white aspect-square p-4 rounded sm:m-2"
			bind:this={qrCodeElement}
		></div>
	</div>

	<Card>
		<div class="col-auto rounded">
			<InputRadioButtons bind:value={defaultStyle} text={(styles) => styles} options={styles}
			></InputRadioButtons>
		</div>

		<button class="bg-slate-800 text-white text-sm py-2 rounded w-full mt-2 flex justify-center items-center" on:click={download}>
			<IconDownload size={16} />
			<span class="ml-2">
			{$_('download.button')}
			</span>
		</button>
		<button
			type="button"
			class="bg-slate-800 text-white text-sm py-2 rounded w-full mt-2 flex justify-center items-center"
			on:click={saveOptions}
		>
			<IconBookmark size={16} />
			<span class="ml-2">{$_('menu.save')}</span>
		</button>
	</Card>
</div>

<style>
	.qr-preview > :global(canvas) {
		width: 100%;
		height: 100%;
	}
</style>
