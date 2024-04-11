<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Html5Qrcode } from 'html5-qrcode';
	import {
		parseData,
		buildData,
		formatEventToIcs,
		downloadIcsFile,
		downloadVcfFile
	} from '$lib/utils/parseQrData';
	import { _ } from 'svelte-i18n';
	import { IconCopy } from 'obra-icons-svelte'

	let isScanning = false;

	// console.log('Scan QR code page ---- trad', $_);
	let renderedData: any = null;

	let html5QrCode: any;

	$: console.log('Rendered data:', renderedData);

	onMount(() => {
		html5QrCode = new Html5Qrcode('reader');

		Html5Qrcode.getCameras()
			.then((devices) => {
				if (devices && devices.length) {
					const backCamera = devices.find((device) => /back|rear/i.test(device.label));
					const cameraId = backCamera ? backCamera.id : devices[0].id;

					const config = {
						fps: 10,
						qrbox: 250,
						cameraId: cameraId
					};

					html5QrCode
						.start(
							{ facingMode: 'environment' }, // Préfère la caméra arrière sans utiliser l'ID
							config,
							(decodedText: string) => {
								console.log('Scan started ------------------');
								let result = parseData(decodedText);
								console.log('Parsed data:', result); // Affiche correctement l'objet
								renderedData = buildData(result);
								console.log('Built data:', renderedData);
								stopScanner();
							},

							(errorMessage: string) => {
								// console.error('Error scanning QR code', errorMessage);
							}
						)
						.then(() => {
							isScanning = true;
							// console.log('Scanner started');
						})
						.catch((err: string) => {
							// console.error('Unable to start the QR scanner', err);
						});
				}
			})
			.catch((err) => {
				console.error('Error getting cameras', err);
			});
	});

	onDestroy(() => {
		stopScanner();
	});

	function stopScanner(): Promise<void> {
		return new Promise((resolve, reject) => {
			if (isScanning) {
				html5QrCode
					.stop()
					.then(() => {
						console.log('Scanner stopped');
						isScanning = false;
						resolve(); // Résout la promesse si le scanner s'arrête avec succès
					})
					.catch((err:any) => {
						console.error('Failed to stop the scanner', err);
						reject(err); // Rejette la promesse en cas d'erreur
					});
			} else {
				console.log('Scanner is not running or already stopped');
				resolve(); // Résout la promesse car il n'est pas nécessaire d'arrêter le scanner
			}
		});
	}

	export function handleDownloadEvent() {
		if (renderedData.type === 'event') {
			const eventData = renderedData.content;
			if (eventData.summary && eventData.dtstart && eventData.dtend) {
				const icsData = formatEventToIcs(eventData);
				const fileName = eventData.summary || 'Event';
				downloadIcsFile(icsData, fileName);
			} else {
				console.error('Incomplete event data.');
			}
		}
	}

	function reset() {
		renderedData = null;
		stopScanner()
			.then(() => {
				console.log('Scanner stopped, restarting...');
				startScanner();
			})
			.catch((error) => {
				console.error("Erreur lors de l'arrêt du scanner avant le redémarrage", error);
				startScanner(); // Essaie de redémarrer le scanner même en cas d'erreur
			});
	}

	function startScanner() {
		Html5Qrcode.getCameras()
			.then((devices) => {
				if (devices && devices.length) {
					const backCamera = devices.find((device) => /back|rear/i.test(device.label));
					const cameraId = backCamera ? backCamera.id : devices[0].id;

					const config = {
						fps: 10,
						qrbox: { width: 250, height: 250 },
						cameraId: cameraId
					};

					return html5QrCode.start(cameraId, config, (decodedText: any) => {
						console.log('Scan started ------------------');
						let result = parseData(decodedText);
						console.log('Parsed data:', result);
						renderedData = buildData(result);
						console.log('Built data:', renderedData);
						stopScanner();
					});
				} else {
					throw new Error('Aucune caméra trouvée.');
				}
			})
			.then(() => {
				isScanning = true;
				console.log('Scanner started');
			})
			.catch((err) => {
				console.error('Unable to start/restart the QR scanner', err);
			});
	}

	export function handleDownloadVCard() {
		if (renderedData.type === 'vcard' && renderedData.content) {
			// Initialisation d'une chaîne vCard
			let vcfData = 'BEGIN:VCARD\nVERSION:3.0\n';

			// Ajout des champs vCard à partir de l'objet content
			if (renderedData.content.n) vcfData += `N:${renderedData.content.n}\n`;
			if (renderedData.content.email) vcfData += `EMAIL:${renderedData.content.email}\n`;
			if (renderedData.content.tel) vcfData += `TEL:${renderedData.content.tel}\n`;
			if (renderedData.content.org) vcfData += `ORG:${renderedData.content.org}\n`;
			if (renderedData.content.title) vcfData += `TITLE:${renderedData.content.title}\n`;
			if (renderedData.content.url) vcfData += `URL:${renderedData.content.url}\n`;

			// Finalisation de la chaîne vCard
			vcfData += 'END:VCARD';

			// Nom du fichier à télécharger
			const filename = 'contact.vcf';

			// Appel de la fonction de téléchargement avec la chaîne vCard générée
			downloadVcfFile(vcfData, filename);
		} else {
			console.error('Incomplete vCard data.');
		}
	}

	function copyTextToClipboard(text: string) {
		navigator.clipboard
			.writeText(text)
			.then(() => {
				console.log('Texte copié avec succès');
			})
			.catch((err) => {
				console.error('Erreur lors de la copie du texte: ', err);
			});
	}
</script>

{#if renderedData}
	<div class="flex flex-col p-6 w-full sm:px-16">
		<div
			class="w-full bg-white mb-4 rounded-md
		dark:bg-t-black dark:text-white"
		>
			<div class="flex flex-col justify-center items-center w-full p-4">
				<h1 class="mb- text-t-indigo font-semibold dark:text-white">Contenu du Qr Code</h1>
				<p class=" text-t-indigo dark:text-white">{renderedData.type}</p>
				<div
					class="border flex flex-col justify-center items-center border-t-indigo rounded-md p-4 w-full my-4 text-t-indigo dark:text-white
			dark:border-white"
				>
					{#if renderedData.type !== 'event' && renderedData.type !== 'vcard' && renderedData.type !== 'wifi'}
						<div class="flex flex-col items-center p-1">
							{#each Object.keys(renderedData.content) as key}
								<span class="text-sm">
									{$_(`scan.${renderedData.type}.${key}`)} :
									<span class="font-semibold">{renderedData.content[key]}&nbsp;</span>
								</span>
							{/each}
						</div>
					{:else if renderedData.type === 'event'}
						<div class="flex flex-col items-center p-1">
							{#each Object.keys(renderedData.content) as key}
								{#if key !== 'begin' && key !== 'end'}
									{#if key === 'dtstart' || key === 'dtend'}
										<span class="text-sm">
											{$_(`scan.event.${key}`)} :
											<span class="font-semibold"
												>{new Date(renderedData.content[key]).toLocaleString()}&nbsp;</span
											>
										</span>
									{:else}
										<span class="text-sm">
											{$_(`scan.event.${key}`)} :
											<span class="font-semibold">{renderedData.content[key]}&nbsp;</span>
										</span>
									{/if}
								{/if}
							{/each}
						</div>
					{:else if renderedData.type === 'vcard'}
						<div class="flex flex-col items-center p-1">
							{#if renderedData.type === 'vcard'}
								{#each Object.keys(renderedData.content) as key}
									{#if key !== 'begin' && key !== 'end' && key !== 'version'}
										<span class="text-sm">
											{$_(`scan.vcard.${key}`)} :
											<span class="font-semibold">{renderedData.content[key]}&nbsp;</span>
										</span>
									{/if}
								{/each}
							{:else}
								<p class="text-sm">Aucune information de contact trouvée.</p>
							{/if}
						</div>
					{:else if renderedData.type === 'wifi'}
						<div class="flex flex-col items-center p-1">
							{#each Object.entries(renderedData.content) as [key, value]}
								<div class="text-sm cursor-pointer">
									{key} : <span class="font-semibold">{value}&nbsp;</span>
									<button on:click={() => typeof value === 'string' && copyTextToClipboard(value)} class="text-t-indigo dark:text-white">
										<svelte:component this={IconCopy} size={16} />
									</button>									
								</div>
							{/each}
						</div>
					{/if}
				</div>
				{#if renderedData.type === 'event'}
					<button
						on:click={handleDownloadEvent}
						class="w-full flex justify-center items-center rounded-md border p-3 border-t-indigo text-white text-sm font-semibold bg-t-indigo
		dark:bg-t-ciel dark:border-t-ciel dark:text-black dark:font-normal"
						><svelte:component this={renderedData.action.icon} />Télécharger l'événement</button
					>
				{:else if renderedData.type === 'vcard'}
					<button
						on:click={handleDownloadVCard}
						class="w-full flex justify-center items-center rounded-md border p-3 border-t-indigo text-white text-sm font-semibold bg-t-indigo
		dark:bg-t-ciel dark:border-t-ciel dark:text-black dark:font-normal"
						><svelte:component this={renderedData.action.icon} />Télécharger le contact</button>
				{:else if renderedData.type !== 'wifi'}
					<a
						href={renderedData.action.href}
						class="w-full flex justify-center items-center rounded-md border p-3 border-t-indigo text-white text-sm font-semibold bg-t-indigo
  					dark:bg-t-ciel dark:border-t-ciel dark:text-black dark:font-normal"
					>
						<svelte:component this={renderedData.action.icon} />
						<span class="ml-2">{$_(renderedData.action.text[0])}</span>
						{#if renderedData.action.text.length > 1}
							<span>{$_(renderedData.action.text[1])}</span>
						{/if}
					</a>
				{/if}

				<button
					on:click={reset}
					class="w-full p-3 mt-4 bg-white border border-t-indigo rounded-md text-t-indigo text-sm font-semibold dark:bg-t-black dark:border-white dark:text-white"
					>{$_('scan.new')}</button
				>
			</div>
		</div>
	</div>
{:else}
	<div class="test relative w-full h-full mt-10">
		<div id="reader" class="-z-10"></div>
	</div>
{/if}

<style>
</style>
