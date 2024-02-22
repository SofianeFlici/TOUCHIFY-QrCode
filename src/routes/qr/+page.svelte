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

<!-- <div
	class="flex flex-col justify-center align-middle items-center
			sm:w-full"
>
	<a
		href="/mylist"
		class="w-4/6 mb-4 mt-4 ml-2 text-sm
		sm:w-2/6 sm:ml-4
		dark:border-slate-200 dark:hover:text-slate-500"
	>
		{$_('back')}
	</a>
	<div class="w-4/6 flex flex-col justify-center align-middle items-center rounded">
		<div
			class=" sm:w-6/6 flex flex-col justify-center content-center items-center align-middle shrink-0 sm:p-2"
		>
			{#if qrItems && qrOptions && qrItems.type in displayConfig}
				<div class="qr-preview bg-white aspect-square p-2 rounded" bind:this={qrCodeElement}></div>
				<div
					class="flex flex-col justify-center align-middle items-center bg-white
							dark:bg-slate-700 rounded w-full mt-4"
				>
					<div class="flex w-60 flex-wrap bg-red-400 items-center align-middle content-center">
						{#each displayConfig[qrItems.type] as { key, label}}
							<p class="p-2 font-semibold">{label}: {qrItems.data[key]}</p>
						{/each}
					</div>

					<div>
						<p class="text-xs mt-2 mb-4 justify-center flex">
							{qrItems.type} · {qrItems.date.toLocaleDateString()}
						</p>
					</div>
					<div class="flex justify-around w-full mb-2">
						<button
							type="button"
							class="w-3/6 bg-transparent m-2 rounded border border-gray-500 hover:border-gray-700 text-gray-500 hover:text-gray-700 font-semibold py-2
								 dark:text-white dark:font-normal dark:bg-slate-950 dark:border-none dark:hover:bg-slate-900 dark:hover:text-white"
							on:click={edit}
						>
							{$_('view.load')}
						</button>
						<button
							type="button"
							class="w-3/6 bg-transparent m-2 rounded border border-gray-500 hover:border-gray-700 text-gray-500 hover:text-gray-700 font-semibold py-2
								dark:text-white dark:font-normal dark:bg-slate-950 dark:border-none dark:hover:bg-slate-900 dark:hover:text-white"
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
				<div class="w-full flex flex-col bg-white dark:bg-slate-700 rounded mt-4">
					<div class=" flex justify-center align-middle items-center content-center w-full">
						<InputRadioButtons bind:value={defaultStyle} text={(styles) => styles} options={styles}
						></InputRadioButtons>
					</div>

					<button
						type="button"
						class="bg-slate-800 text-white text-sm py-2 rounded w-full mt-2"
						on:click={download}
					>
						{$_('download.button')}
					</button>
				</div>
			{/if}
		</div>
	</div>
</div> -->

<div class="w-[70%] flex justify-center flex-col items-center">
	<div class="mb-2 mt-4 sm:self-start sm:flex sm:justify-start">
		<!-- Ajout de cette div pour aligner à gauche -->
		<a
			href="/mylist"
			class="border border-t-indigo rounded-md p-2 text-t-indigo font-semibold text-sm
	dark:border-white dark:text-white">{chevron} Retour</a
		>
	</div>
	<div class="mt-4 mb-4">
		<div
			class="qr-preview bg-white aspect-square p-8 rounded-md
		sm:p-14"
			bind:this={qrCodeElement}
		></div>
	</div>
	<div
		class="bg-white w-full rounded-md text-t-indigo font-semibol
	dark:text-white dark:bg-t-black"
	>
		{#if qrItems && qrOptions && qrItems.type in displayConfig}
			<div class="flex flex-col justify-center align-middle items-center rounded w-full mt-4">
				<div class="flex w-60 flex-wrap items-center align-middle text-sm justify-center">
					{#each displayConfig[qrItems.type] as { key }}
						<p class="p-2 font-semibold">{qrItems.data[key]}</p>
					{/each}
				</div>
				<div>
					<p class="text-sm mt-2 mb-4 justify-center flex font-semibold">
						{qrItems.type} · {qrItems.date.toLocaleDateString()}
					</p>
				</div>
			</div>
		{/if}
	</div>
	<div class="flex w-full justify-between">
		<button
			type="button"
			class="w-[48%] rounded-md mt-4 border p-2 border-t-indigo text-white bg-t-indigo
			dark:bg-transparent dark:border-t-white"
			on:click={edit}
		>
			{$_('view.load')}
		</button>
		<button
			type="button"
			class="w-[48%] rounded-md mt-4 border p-2 border-t-indigo text-white bg-t-indigo
			dark:bg-transparent dark:border-t-white"
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
