<script lang="ts">
	// j'import ma db
	import db from '$lib/db.js';
	// j'import le onMount : qui est un hook qui permet d'executer une fonction au chargement de la page
	import { onMount } from 'svelte';
	// j'import le Options de qr-code-styling : qui permet de customiser le qr code
	import type { Options } from 'qr-code-styling';
	import { _ } from 'svelte-i18n';
	import QrListCard from '$lib/components/QrListCard.svelte';
	// je donne un type à mes données

	type QrCode = {
		qr: any;
		options: Options;
	};

	// je déclare mes variables

	let data: Options[] = [];
	let qrList: QrCode[] = [];
	let qrCodeElement: HTMLElement[] = [];

	onMount(async () => {
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

			//-------------------------------------------------------------------------------------

			//-------------- Recupération de tous les QRCode ----------------------------------------------
			const { default: QRCodeStyling } = await import('qr-code-styling');
			qrList = data.map((options) => {
				const qr = new QRCodeStyling(options);
				return { qr, options };
			});
			//-------------------------------------------------------------------------------------
		} catch (error) {
			console.error('Failed to load options:', error);
		}
	});
	console.log('qrList = ', qrList);

	$: if (qrCodeElement.length > 0) {
		qrList.forEach((qrCode, i) => {
			if (qrCodeElement[i]) {
				qrCode.qr.append(qrCodeElement[i]); //sert à mettre à jour le qr
			}
		});
	}
</script>

<div class="mt-5">
	<a
		href="/"
		class="rounded border p-2 border-gray-500 hover:border-gray-700 text-gray-500 hover:text-gray-700 font-semibold py-2"
	>
		{$_('back')}
	</a>
	<div
		class="mt-2 flex border-y-2 border-gray-400 bg-slate-300 shadow sm:flex-col sm:bg-transparent sm:border-hidden"
	>
		{#each qrList as qr, i}
			<div class="mt-2">
				<QrListCard>
					<a href={`/qr?id=${qr.options.id}`}>{qr.options.data}</a>
				</QrListCard>
			</div>
		{/each}
	</div>
</div>

<style>
	.qr-preview > :global(canvas) {
		width: 100%;
		height: 100%;
	}
</style>
