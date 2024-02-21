<script lang="ts">
	import { onMount } from 'svelte';
	import type { Options } from 'qr-code-styling';
	import { IconBookmark, IconDownload } from 'obra-icons-svelte';
	import db from '$lib/db';
	import type { QrCodeData } from '$lib/QrCode/qrcode.data';
	import { _ } from 'svelte-i18n';
	import SelectDownload from '$lib/components/selectDownload.svelte';

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

	let defaultStyle = 'SVG';
</script>

<div
	class="flex bg-t-medium-blue w-[92%] rounded-md justify-around items-center p-2  dark:bg-t-black
sm:flex-col sm:justify-around sm:items-center sm:w-[70%] sm:p-0 sm:bg-transparent"
>
	<div
		class="bg-white h-36 w-36 rounded-md
	sm:w-full sm:mb-40"
	>
		<div class="qr-preview bg-white rounded-md p-4" bind:this={qrCodeElement}></div>
	</div>

	<div
		class="flex flex-col h-36 justify-between
	sm:w-full"
	>
		<SelectDownload {defaultStyle} />
		<div class="text-[10px] flex flex-col justify-between mt-2 text-white dark:text-black">
			<button
				type="button"
				class="bg-t-indigo w-full flex justify-center p-1 items-center rounded py-2 dark:bg-t-ciel"
				on:click={saveOptions}
			>
				<IconBookmark size={16} />
				<p class="ml-2">
					{$_('menu.save')}
				</p>
			</button>
		</div>
	</div>
</div>

<style>
	.qr-preview > :global(canvas) {
		width: 100%;
		height: 100%;
	}
</style>
