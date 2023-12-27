<script lang="ts">
	// j'import ma db
	import db from '$lib/db.js';
	// j'import le onMount : qui est un hook qui permet d'executer une fonction au chargement de la page
	import { onMount } from 'svelte';
	// j'import le Options de qr-code-styling : qui permet de customiser le qr code
	import type { Options } from 'qr-code-styling';
	import { _ } from 'svelte-i18n';
	import { writable } from 'svelte/store';
	import Card from '$lib/components/Card.svelte';
	///////////// recupération de l'id dans l'url ///////////////////////
	let qrCodeId = writable<string>('');

	let id: string = '';

	///////////// -------------------------------- ///////////////////////

	// je donne un type à mes données
	type QrCode = {
		qr: any;
		options: Options;
	};

	// je déclare mes variables

	let data: Options[] = [];
	let qrList: QrCode[] = [];
	let qrCodeElement: HTMLElement | null = null; // ou simplement 'HTMLElement'

	let test: string;
	let qrCode: QrCode | null = null;

	$: onMount(async () => {
		///////////// recupération de l'id dans l'url ///////////////////////

		const urlParams = new URLSearchParams(window.location.search);
		id = urlParams.get('id') as string;

		///////////// -------------------------------- ///////////////////////

		test = id;
		try {
			data = await db.options.toArray();

			//-------------- Recupération d'un seul QRCode ----------------------------------------------

			// maintenant que j'ai mes objets avec les options je peux les afficher dans le qr code
			// je récupère le qr code
			// const { default: QRCodeStyling } = await import("qr-code-styling");
			// je crée une nouvelle instance de qr code
			// let qrCode = new QRCodeStyling(data[0]);
			// je récupère l'élément html qui contiendra le qr code
			// let qrCodeElement = document.querySelector(".qr-preview");
			// je lui ajoute le qr code
			// qrCode.append(qrCodeElement);
			// je met à jour le qr code
			// qrCode.update(data[0]);

			const allOptions = await db.options.toArray();
			const optionForId = allOptions.find((option) => option.id.toString() === id);
			if (optionForId) {
				const { default: QRCodeStyling } = await import('qr-code-styling');
				qrCode = {
					qr: new QRCodeStyling(optionForId),
					options: optionForId
				};
				qrCode.qr.append(qrCodeElement);
			}
		} catch (error) {
			console.error('Failed to load options:', error);
		}
	});
	console.log('id = ', id);
	console.log('qrList = ', qrList);

	///////////// recupération de l'id dans l'url ///////////////////////

	///////////// -------------------------------- ///////////////////////

	console.log('qrCodeId = ', qrCodeId);

	$: if (qrCodeElement && qrCode) {
		qrCode.qr.append(qrCodeElement);
	}
</script>

<div class="mt-5">
	<a
		href="/mylist"
		class="bg-transparent ml-4 p-2 rounded border border-gray-500 hover:border-gray-700 text-gray-500 hover:text-gray-700 font-semibold py-2"
	>
		{$_('back')}
	</a>
	<div
		class="flex border-y-2 border-gray-400 bg-slate-300  sm:flex-col sm:bg-transparent sm:border-hidden mt-2"
	>
		<Card>
			<div class="w-6/6 flex flex-col justify-center content-center items-center align-middle shrink-0 sm:p-2">
				{#if qrCode}
					<p class="bg-white rounded">{qrCode.options.data}</p>
					<div
						class="qr-preview bg-white aspect-square p-2 rounded w-2/6 sm:w-4/6 shadow mt-2 mb-2"
						bind:this={qrCodeElement}
					></div>
					<div class="w-full justify-around flex">
						<button
							class="bg-transparent p-2 border border-gray-500 hover:border-gray-700 rounded text-gray-500 hover:text-gray-700 font-semibold py-2 sm:mx-2 sm:my-2"
						>
							{$_('view.load')}
						</button>
						<button
							class="bg-transparent border p-2 border-gray-500 hover:border-gray-700 rounded text-gray-500 hover:text-gray-700 font-semibold py-2 sm:mx-2 sm:my-2"
						>
							{#if $_('view.delete') == 'Supprimer'}
								{$_('view.delete')}
							{:else}
								{$_('view.delete')}
							{/if}
						</button>
					</div>
				{/if}
			</div>
		</Card>
	</div>
</div>

<style>
	.qr-preview > :global(canvas) {
		width: 100%;
		height: 100%;
	}
</style>
