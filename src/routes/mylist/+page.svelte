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
			console.log('mylist data =', data);
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

	$: if (qrCodeElement.length > 0) {
		qrList.forEach((qrCode, i) => {
			if (qrCodeElement[i]) {
				qrCode.qr.append(qrCodeElement[i]); //sert à mettre à jour le qr
			}
		});
	}
</script>

<div class="bg-red-400 h-52 w-full mt-4">
	<a href="/" class="border-slate-800 border-2 rounded-md text-slate-800 text-sm font-semibold p-2">
		{$_('back')}
	</a>
	<div class="bg-yellow-400 mt-4">
		{#each qrList as qr, i}
			<div class="mt-2 bg-blue-400">
				<div class="w-full bg-white rounded flex">
					<div class="flex-col px-4 py-1">
						<a class="text-sm font-semibold" href={`/qr?id=${qr.options.id}`}
							>{qr.options.options.data}</a
						>
						<p class="text-xs mt-2 mb-2">
							{qr.options.Type} · {qr.options.date.toLocaleDateString()}
						</p>
					</div>

					<div class="flex justify-end content-end">
						<p>Edit</p>
						<p>Delete</p>
					</div>
				</div>
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
