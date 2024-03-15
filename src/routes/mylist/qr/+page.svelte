<script lang="ts">
	import db from '$lib/db';
	import { onMount } from 'svelte';
	import type { default as QRCodeStyling, Options } from 'qr-code-styling';
	import { _ } from 'svelte-i18n';
	import { displayConfig } from '$lib/QrCode/qrcode.data';
	import SelectDownload from '$lib/components/selectDownload.svelte';
	import Accordion from '$lib/components/Accordion.svelte';

	let id: number;

	let qrCodeElement: HTMLElement | null = null;
	let qrCode: QRCodeStyling | null = null;
	let qrOptions: Options | null = null;
	let defaultStyle: string = 'SVG';
	let qrItems: any;
	let title = 'view.data';

	onMount(async () => {
		const urlParams = new URLSearchParams(window.location.search);
		const idParam = urlParams.get('id') as string;
		if (!idParam) {
			return;
		}

		id = parseInt(idParam);

		try {
			const item = await db.options.get(id);
			if (item?.image) {
				item.options.image = URL.createObjectURL(item.image);
			}

			if (item) {
				console.log('/qr ------ item', item);
				const { default: QRCodeStyling } = await import('qr-code-styling');
				qrItems = item;
				qrOptions = item.options;
				qrCode = new QRCodeStyling(item.options);

				if (qrCodeElement) {
					qrCode.append(qrCodeElement);
				}
			}

			console.log('qrItems', qrItems);
		} catch (error) {
			console.error('Failed to load options:', error);
		}
	});

	$: if (qrCodeElement && qrCode) {
		qrCode.append(qrCodeElement);
	}

	async function edit() {
		if (qrCode) {
			try {
				window.location.href = `../createQr/?id=${id}`;
			} catch (error) {
				console.error('Failed to send id :', error);
			}
		}
	}

	async function destroy() {
		if (qrCode) {
			try {
				if (id) {
					await db.options.delete(id);
					console.log(`Deleted options and image for id: ${id}`);
				}
				window.location.href = '/mylist';
			} catch (error) {
				console.error('Failed to delete options or image:', error);
			}
		}
	}
</script>

<div
	class="w-[70%] flex justify-center flex-col items-center
sm:pr-20 sm:pl-20 sm:pb-20
"
>
	<div class="mb-2 mt-4 sm:self-start sm:flex sm:justify-start">
		<a
			href="/mylist"
			class="border flex items-center border-t-indigo rounded-md p-2 text-t-indigo font-semibold text-sm
	dark:border-white dark:text-white"
		>
			<span class="mr-1"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					viewBox="0 0 256 256"
					><path
						d="M205.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L131.31,128ZM51.31,128l74.35-74.34a8,8,0,0,0-11.32-11.32l-80,80a8,8,0,0,0,0,11.32l80,80a8,8,0,0,0,11.32-11.32Z"
					></path></svg
				>
			</span>
			<span>{$_('back')}</span></a
		>
	</div>
	<div class="mt-2 mb-4 sm:w-full">
		<div
			class="qr-preview bg-white aspect-square p-8 rounded-md
		sm:p-14"
			bind:this={qrCodeElement}
		></div>
	</div>
	<div
		class="bg-white w-full rounded-md text-t-indigo font-semibol p-4
	dark:text-white dark:bg-t-black"
	>
		{#if qrItems && qrOptions && qrItems.type in displayConfig}
			<Accordion {title} open={true}>
				<div
					class="flex flex-col justify-center items-center content-center rounded-md w-full border border-t-indigo mt-4 p-2
							dark:border-white"
				>
					<div class="flex flex-col items-center p-1">
						{#each displayConfig[qrItems.type] as { key, label }}
							<span class="font-semibold text-sm">
								{$_(`qrLabel.${label}`)} : {qrItems.data[key]}&nbsp;
							</span>
						{/each}
					</div>
					<div>
						<p class="text-xs mt-2 justify-center flex">
							{qrItems.type} &bull; {qrItems.date.toLocaleDateString()}
						</p>
					</div>
				</div>
			</Accordion>
		{/if}
	</div>
	<div class="flex w-full justify-between">
		<button
			type="button"
			class="w-[48%] rounded-md mt-4 border p-2 border-t-indigo text-white bg-t-indigo
			dark:bg-t-ciel dark:border-t-ciel dark:text-black"
			on:click={edit}
		>
			{$_('view.load')}
		</button>
		<button
			type="button"
			class="w-[48%] rounded-md mt-4 border p-2 border-t-indigo text-white bg-t-indigo
			dark:bg-t-ciel dark:border-t-ciel dark:text-black"
			on:click={destroy}
		>
			{#if $_('view.delete') == 'Supprimer'}
				{$_('view.delete')}
			{:else}
				{$_('view.delete')}
			{/if}
		</button>
	</div>
	<div class="w-full mt-4">
		<SelectDownload {defaultStyle} {qrCode} />
	</div>
</div>

<style>
	.qr-preview > :global(canvas) {
		width: 100%;
		height: 100%;
	}
</style>
