<script lang="ts">
	import db from '$lib/db';
	import { onMount } from 'svelte';
	import type { Options } from 'qr-code-styling';
	import Card from '$lib/components/Card.svelte';
	import { _ } from 'svelte-i18n';

	let id: string = '';
	type QrCode = {
		qr: any;
		options: Options;
	};

	export let options: Options;
	let qrCodeElement: HTMLElement | null = null;
	let qrCode: QrCode | null = null;
	let blobUrl: string = '';

	onMount(async () => {
		const urlParams = new URLSearchParams(window.location.search);
		id = urlParams.get('id') as string;

		try {
			let opts = await db.options.get(parseInt(id));
			if (opts && opts.image) {
				const { blob } = await db.images.get(opts.options.image);
				if (blob) {
					blobUrl = URL.createObjectURL(blob);
					opts = Object.assign({}, opts, { image: blobUrl });
				}
			}

			if (opts) {
				const { default: QRCodeStyling } = await import('qr-code-styling');
				qrCode = {
					qr: new QRCodeStyling(opts.options),
					options: opts
				};
				if (qrCodeElement) {
					qrCode.qr.append(qrCodeElement);
				}
			}
		} catch (error) {
			console.error('Failed to load options:', error);
		}
	});

	$: if (qrCodeElement && qrCode) {
		qrCode.qr.append(qrCodeElement);
	}

	async function edit() {
		if (qrCode) {
			const urlParams = new URLSearchParams(window.location.search);
			const idParam = urlParams.get('id');
			try {
				window.location.href = `/?id=${idParam}`;
			} catch (error) {
				console.error('Failed to send id :', error);
			}
		}
	}

	async function destroy() {
		if (qrCode) {
			try {
				const urlParams = new URLSearchParams(window.location.search);
				const idParam = urlParams.get('id');
				if (idParam) {
					const id = parseInt(idParam);
					const opts = await db.options.get(id);
					if (opts && opts.image) {
						await db.images.delete(opts.image); // Supprimer l'entrée image d'abord
					}
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
			{#if qrCode}
				<p class="bg-white rounded">{qrCode.options.options.data}</p>
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
