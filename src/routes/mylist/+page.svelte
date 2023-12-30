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

<div class="mt-5 flex justify-center flex-col  w-5/6 sm:w-full">
	<a
		href="/"
		class="w-16 p-1 h-9 text-small flex items-center sm:ml-48 rounded border sm:p-2 border-gray-500 hover:border-gray-700 text-gray-500 hover:text-gray-700 font-semibold sm:py-2"
	>
		{$_('back')}
	</a>
	<div
		class="mt-2 border-y-2 items-center flex-col-reverse flex border-gray-400 bg-slate-300  sm:w-full sm:bg-transparent sm:border-hidden"
	>
		{#each qrList as qr, i}
			<div class="mt-2 flex justify-center">
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
