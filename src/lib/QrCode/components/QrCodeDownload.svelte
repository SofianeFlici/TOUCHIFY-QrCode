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

<div class="flex flex-col w-full p-4">
	<div
		class="flex bg-t-medium-blue w-full h-full rounded-md p-2 flex-grow justify-center
				dark:bg-t-black
				sm:flex-col sm:dark:py-4 sm:justify-around sm:items-center sm:w-full sm:p-0 sm:bg-transparent
				"
	>
		<div class="bg-white rounded-md mr-4 sm:mr-0">
			<div
				class="qr-preview bg-white rounded-md p-4 max-w-32 sm:max-w-52 md:max-w-60"
				bind:this={qrCodeElement}
			></div>
		</div>

		<div class="flex flex-col flex-grow max-w-48 text-[10px] justify-between max-h-full text-white 
					sm:max-w-64
					dark:text-black">
			<SelectDownload {defaultStyle} {qrCode} />
			<!-- <div class="text-[10px] flex flex-col justify-between h-full text-white dark:text-black"> -->
				<button
					type="button"
					class="bg-t-indigo w-full flex border-2 p-1 items-center rounded
							dark:bg-t-ciel dark:border-t-ciel
							md:text-sm lg:text-md"
					on:click={saveOptions}
				>
				<span class="bg-yellow-400 w-full flex justify-center items-center">

					<IconBookmark size={16} />
					<p class="ml-3">
						{$_('menu.save')}
					</p>
				</span>
				</button>
			<!-- </div> -->
		</div>
	</div>
</div>

<style>
	.qr-preview > :global(canvas) {
		width: 100%;
		height: 100%;
	}
</style>
