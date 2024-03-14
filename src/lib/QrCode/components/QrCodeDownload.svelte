<script lang="ts">
	import { onMount } from 'svelte';
	import type { Options } from 'qr-code-styling';
	import { IconBookmark } from 'obra-icons-svelte';
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
				const dbItem = await db.options.get(numericId);
				if (!dbItem) {
					console.error(`No options found with id: ${numericId}`);
					return;
				}

				await db.options.update(numericId, item);
				console.log('Options updated successfully');
			} else {
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
		qrCode = new QRCodeStyling(opts);
		if (qrCodeElement) {
			qrCode.append(qrCodeElement);
		}
	});

	$: if (qrCode) qrCode.update(options);

	let defaultStyle = 'SVG';
</script>

<div
	class="flex bg-t-medium-blue h-24 rounded-md dark:bg-transparent sm:h-full sm:bg-transparent sm:flex-col sm:fixed ">
	<div class="m-2 sm:m-4 bg-white rounded-md dark:bg-t-black p-2">
		<div class="h-full qr-preview bg-white rounded-md sm:p-4" bind:this={qrCodeElement}></div>
	</div>

	<div
		class="flex flex-col flex-grow text-white p-2
					sm:m-4
					dark:text-black"
	>
		<SelectDownload {defaultStyle} {qrCode} />
		<button
			type="button"
			class="bg-t-indigo flex sm:border-2 p-1 sm:p-2 items-center rounded-md text-sm
							dark:bg-t-ciel dark:border-t-ciel
							sm:mt-4
							sm:text-base"
			on:click={saveOptions}
		>
			<span class="w-full flex justify-center items-center">
				<IconBookmark size={16} />
				<p class="ml-3">
					{$_('menu.save')}
				</p>
			</span>
		</button>
	</div>
</div>

<style>
	.qr-preview > :global(canvas) {
		width: 100%;
		height: 100%;
	}
</style>
