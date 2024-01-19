<script lang="ts">
	import db from '$lib/db';
	import { onMount } from 'svelte';
	import type { default as QRCodeStyling, Options } from 'qr-code-styling';
	import Card from '$lib/components/Card.svelte';
	import { _ } from 'svelte-i18n';
	import InputRadioButtons from '$lib/components/InputRadioButtons.svelte';

	let id: number;

	let qrCodeElement: HTMLElement | null = null;
	let qrCode: QRCodeStyling | null = null;
	let qrOptions: Options | null = null;

	let styles = ['JPEG', 'PNG', 'SVG', 'WEBP'];
	let defaultStyle = 'SVG';

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
					await db.options.delete(id); // Ensuite, supprimer l'entrée options
					console.log(`Deleted options and image for id: ${id}`);
				}
				window.location.href = '/mylist';
			} catch (error) {
				console.error('Failed to delete options or image:', error);
			}
		}
	}
</script>

<div class="mt-5 w-80">
	<a
		href="/mylist"
		class="flex w-16 sm:ml-24 bg-transparent p-2 rounded border border-gray-500 hover:border-gray-700 text-gray-500 hover:text-gray-700 font-semibold py-2 dark:text-white dark:font-normal"
	>
		{$_('back')}
	</a>
	<div
		class="flex justify-center p-2 border-y-2 border-gray-400 bg-slate-300 sm:flex-col sm:bg-transparent sm:border-hidden mt-2"
	>
		<div
			class=" sm:w-6/6 flex flex-col justify-center content-center items-center align-middle shrink-0 sm:p-2"
		>
			{#if qrCode && qrOptions}
				<p class="bg-white rounded">{qrOptions.data}</p>
				<div
					class="qr-preview bg-white aspect-square p-2 rounded w-2/6 sm:w-4/6 shadow mt-2 mb-2"
					bind:this={qrCodeElement}
				></div>
				<Card>
					<div class="w-full justify-around flex">
						<button
							class="bg-transparent ml-4 p-2 rounded border border-gray-500 hover:border-gray-700 text-gray-500 hover:text-gray-700 font-semibold py-2 dark:text-white dark:font-normal dark:bg-slate-950 dark:border-none dark:hover:bg-slate-900 dark:hover:text-white"
							on:click={edit}
						>
							{$_('view.load')}
						</button>
						<button
							class="bg-transparent ml-4 p-2 rounded border border-gray-500 hover:border-gray-700 text-gray-500 hover:text-gray-700 font-semibold py-2 dark:text-white dark:font-normal dark:bg-slate-950 dark:border-none dark:hover:bg-slate-900 dark:hover:text-white"
							on:click={destroy}
						>
							{#if $_('view.delete') == 'Supprimer'}
								{$_('view.delete')}
							{:else}
								{$_('view.delete')}
							{/if}
						</button>
					</div>
				</Card>

				<Card>
					<div class="col-auto rounded">
						<InputRadioButtons bind:value={defaultStyle} text={(styles) => styles} options={styles}
						></InputRadioButtons>
					</div>
			
					<button class="bg-slate-800 text-white text-sm py-2 rounded w-full mt-2" on:click={download}>
						{$_('download.button')}
					</button>
				</Card>
			{/if}
		</div>
	</div>
</div>

<style>
	.qr-preview > :global(canvas) {
		width: 100%;
		height: 100%;
	}
</style>
