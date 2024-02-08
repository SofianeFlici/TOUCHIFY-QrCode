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

<div class="flex bg-t-ciel w-72 rounded-md justify-around items-center p-2 h-44">
	<div class="bg-white h-36 w-36 rounded-md">
		<div class="qr-preview bg-white rounded-md p-4" bind:this={qrCodeElement}></div>
	</div>

	<div class="h-36">
		<div class="bg-white w-28 h-20 flex flex-col justify-around p-2 rounded-md text-[10px]">
			<select
				class="w-full rounded-md text-t-indigo p-1 border-2 border-t-indigo text-xs hover:border-t-indigo mb-2"
				bind:value={defaultStyle}
			>
				{#each styles as style}
					<option value={style}>{style}</option>
				{/each}
			</select>
			<button
				class="border-2 border-t-indigo bg-white rounded-md p-1 w-full flex justify-center items-center text-t-indigo"
			>
				<IconDownload size={16} />
				{$_('download.button')}
			</button>
		</div>

		<div class="text-[10px] flex flex-col justify-between h-14 mt-2 text-white">
			<button class="bg-t-indigo w-full flex justify-center p-1 items-center rounded">
				<IconDownload size={16} />
				<p class="ml-2">
					{$_('download.button')}
				</p>
			</button>

			<button
				type="button"
				class="bg-t-indigo w-full flex justify-center p-1 items-center rounded"
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
