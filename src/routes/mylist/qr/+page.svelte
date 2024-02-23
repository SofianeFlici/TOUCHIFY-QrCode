<script lang="ts">
	import db from '$lib/db';
	import { onMount } from 'svelte';
	import type { default as QRCodeStyling, Options } from 'qr-code-styling';
	import { _ } from 'svelte-i18n';
	import InputRadioButtons from '$lib/components/InputRadioButtons.svelte';
	import { displayConfig } from '$lib/QrCode/qrcode.data';

	let id: number;

	let qrCodeElement: HTMLElement | null = null;
	let qrCode: QRCodeStyling | null = null;
	let qrOptions: Options | null = null;

	let chevron = '<<';

	let styles = ['JPEG', 'PNG', 'SVG', 'WEBP'];
	let defaultStyle: string = 'SVG';
	let qrItems: any;

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
				const { default: QRCodeStyling } = await import('qr-code-styling');
				qrItems = item;
				qrOptions = item.options;
				qrCode = new QRCodeStyling(item.options);

				if (qrCodeElement) {
					qrCode.append(qrCodeElement);
				}
			}
		} catch (error) {
			console.error('Failed to load options:', error);
		}
	});

	$: if (qrCodeElement && qrCode) {
		qrCode.append(qrCodeElement);
	}

	function download() {
		if (!qrCode) {
			return;
		}
		qrCode.download({
			name: 'qrcode',
			extension: defaultStyle
		});
	}

	async function edit() {
		if (qrCode) {
			try {
				window.location.href = `/?id=${id}`;
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
lg:pr-40 lg:pl-40 lg:pb-40"
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
			<span>Retour</span></a
		>
	</div>
	<div class="mt-4 mb-4 sm:w-full">
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
			<div class="flex flex-col justify-center items-center content-center rounded w-full">
				<div class="flex w-full justify-center">
					<p class="font-bold text-sm truncate">
						{#each displayConfig[qrItems.type] as { key }}
							{qrItems.data[key]}&nbsp;
						{/each}
					</p>
				</div>
				<div>
					<p class="text-xs mt-2 justify-center flex">
						{qrItems.type} &bull; {qrItems.date.toLocaleDateString()}
					</p>
				</div>
			</div>
		{/if}
	</div>
	<div class="flex w-full justify-between">
		<button
			type="button"
			class="w-[48%] rounded-md mt-4 border p-2 border-t-indigo text-white bg-t-indigo
			dark:bg-transparent dark:border-white"
			on:click={edit}
		>
			{$_('view.load')}
		</button>
		<button
			type="button"
			class="w-[48%] rounded-md mt-4 border p-2 border-t-indigo text-white bg-t-indigo
			dark:bg-transparent dark:border-white"
			on:click={destroy}
		>
			{#if $_('view.delete') == 'Supprimer'}
				{$_('view.delete')}
			{:else}
				{$_('view.delete')}
			{/if}
		</button>
	</div>
</div>

<style>
	.qr-preview > :global(canvas) {
		width: 100%;
		height: 100%;
	}
</style>
