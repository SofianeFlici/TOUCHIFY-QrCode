<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import jsQR from 'jsqr';
	import {
		parseData,
		getLinkData,
		formatEventToIcs,
		// downloadIcsFile,
		formatVcardToVcf,
		// downloadVcfFile,
		// handleDownloadEvent
	} from '$lib/utils/parseQrData';

	let isEventAvailable = false;

	let videoElement: HTMLVideoElement;
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null;
	let result: string = '';
	// let renderedData: any = [];

	let isVCardAvailable = false;

	let renderedData: any = [
		{ key: 'tel', value: '1234567890' },
		{ key: 'smsto', value: '1234567890?body=Hello World' },
		{ key: 'mailto', value: 'example@example.com' },
		{ key: 'https', value: 'www.example.com' },
		{ key: 'geo', value: '40.689247,-74.044502' },
		{ key: 'wifi', value: 'S:MySSID;T:WPA;P:MyPassword;;' },
		{
			key: 'vcard',
			value:
				'BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\nTEL;TYPE=WORK,VOICE:(111) 555-1212\nEMAIL:john.doe@example.com\nEND:VCARD'
		}
	];

	export function downloadIcsFile(icsData: string, fileName: string) {
	const blob = new Blob([icsData], { type: 'text/calendar' });
	const url = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = url;
	link.download = `${fileName}.ics`;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
}
// function downloadVcfFile(vcfData: string, fileName: string) {
// 	const blob = new Blob([vcfData], { type: 'text/vcard' });
// 	const url = URL.createObjectURL(blob);
// 	const link = document.createElement('a');
// 	link.href = url;
// 	link.download = `${fileName}.vcf`;
// 	document.body.appendChild(link);
// 	link.click();
// 	document.body.removeChild(link);
// 	URL.revokeObjectURL(url);
// }

export function handleDownloadEvent() {
	const summaryItem = renderedData.find((item) => item.key === 'summary');
	const dtstartItem = renderedData.find((item) => item.key === 'dtstart');
	const dtendItem = renderedData.find((item) => item.key === 'dtend');

	if (summaryItem && dtstartItem && dtendItem) {
		const eventData = {
			summary: summaryItem.value,
			dtstart: dtstartItem.value,
			dtend: dtendItem.value
		};

		const icsData = formatEventToIcs(eventData);
		const fileName = eventData.summary || 'Event';
		downloadIcsFile(icsData, fileName);
	} else {
		console.error('Incomplete event data.');
	}
}

// export function handleDownloadVCard() {
// 	const fnItem = renderedData.find((item) => item.key === 'fn');
// 	const orgItem = renderedData.find((item) => item.key === 'org');
// 	const telItem = renderedData.find((item) => item.key === 'tel');
// 	const emailItem = renderedData.find((item) => item.key === 'email');
// 	const adrItem = renderedData.find((item) => item.key === 'adr');
// 	const urlItem = renderedData.find((item) => item.key === 'url');

// 	if (fnItem) {
// 		const vCardData = {
// 			fn: fnItem.value,
// 			org: orgItem?.value,
// 			tel: telItem?.value,
// 			email: emailItem?.value,
// 			adr: adrItem?.value,
// 			url: urlItem?.value
// 		};

// 		const vcfData = formatVcardToVcf(vCardData);
// 		downloadVcfFile(vcfData);
// 	} else {
// 		console.error('Incomplete vCard data.');
// 	}
// }

	$: isEventAvailable = renderedData.some(
		(item: any) => item.key === 'summary' || item.key === 'dtstart' || item.key === 'dtend'
	);

	$: isVCardAvailable = renderedData.some(
		(item) =>
			item.key === 'fn' ||
			item.key === 'org' ||
			item.key === 'tel' ||
			item.key === 'email' ||
			item.key === 'adr' ||
			item.key === 'url'
	);

	function reset() {
		result = '';
		startVideo();
	}

	function startVideo() {
		navigator.mediaDevices
			.getUserMedia({ video: { facingMode: 'environment' } })
			.then((stream) => {
				videoElement.srcObject = stream;
				videoElement.play();
				scanQRCode();
			})
			.catch((error) => {
				console.error('Error accessing the camera', error);
			});
	}

	onMount(() => {
		ctx = canvas.getContext('2d');
		startVideo();
	});

	function scanQRCode() {
		const scan = () => {
			if (videoElement.readyState === videoElement.HAVE_ENOUGH_DATA) {
				canvas.height = videoElement.videoHeight;
				canvas.width = videoElement.videoWidth;
				ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
				const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
				const code = jsQR(imageData.data, imageData.width, imageData.height);
				// console.log('----- QR code test ------', code);
				if (code) {
					console.log('QR code test ', imageData.data);
					result = decodeURIComponent(code.data);
					// console.log('QR code detected', result);
					renderedData = parseData(result);
					console.log('QR code data', renderedData);
					videoElement.srcObject?.getTracks().forEach((track) => track.stop());
				}
			}
			if (!result) {
				requestAnimationFrame(scan);
			}
		};
		scan();
	}

	function stopVideo() {
		if (videoElement?.srcObject) {
			videoElement.srcObject.getTracks().forEach((track: any) => track.stop());
			videoElement.srcObject = null;
		}
	}

	onDestroy(() => {
		stopVideo();
	});

	
</script>

<div
	class="w-full justify-center flex flex-col items-center text-t-indigo absolute top-0 right-0 left-0 bottom-0
			dark:text-t-ciel"
>
	{#if result == ''}
		<!-- svelte-ignore a11y-media-has-caption -->
		<video
			bind:this={videoElement}
			width="700"
			height="700"
			aria-label="Flux vidéo pour la lecture de codes QR"
			class="-z-1 absolute"
		></video>
		<canvas bind:this={canvas} width="400" height="400" style="display: none;"></canvas>
		<div
			class="relative w-32 h-32 flex justify-center items-center
		sm:w-52 sm:h-52"
		>
			<div
				class="absolute top-0 left-0 w-[32%] h-[32%] border-t-4 border-l-4 border-current rounded-tl-xl"
			></div>
			<div
				class="absolute top-0 right-0 w-[32%] h-[32%] border-t-4 border-r-4 border-current rounded-tr-xl"
			></div>
			<div
				class="absolute bottom-0 left-0 w-[32%] h-[32%] border-b-4 border-l-4 border-current rounded-bl-xl"
			></div>
			<div
				class="absolute bottom-0 right-0 w-[32%] h-[32%] border-b-4 border-r-4 border-current rounded-br-xl"
			></div>
		</div>
		<p class="tetx-xs font-semibold mt-4 z-10 sm:text-md">Scannez le QR code</p>
	{:else}
		<div
			class="rounded-md max-w-[80vw] mb-4 flex flex-col justify-center items-center bg-white border border-t-indigo
					dark:bg-t-black dark:text-white dark:border-white"
		>
			<div class="flex flex-col justify-center items-center w-full p-4">
				{#each renderedData as { key, value }}
					{#if  getLinkData(key, value).type === 'event'}
						<button on:click={handleDownloadEvent}
							><svelte:component this={getLinkData(key, value).icon} />Télécharger l'événement</button
						>
					{:else if getLinkData(key, value).type === 'vcard'}
						<button on:click={handleDownloadVCard}
							><svelte:component this={getLinkData(key, value).icon} />Télécharger le contact</button>
					{:else if getLinkData(key, value).type === 'link' && isEventAvailable === false}
						<a
							href={getLinkData(key, value).href}
							class="p-1 text-sm border rounded-md border-t-indigo flex self-center"
							download={getLinkData(key, value).download
								? getLinkData(key, value).download
								: undefined}
						>
							<span><svelte:component this={getLinkData(key, value).icon} /></span>
							<span class="ml-2">{getLinkData(key, value).text}</span>
						</a>
					{:else if getLinkData(key, value).type === 'link' && isEventAvailable === false}
						<a
							href={getLinkData(key, value).href}
							class="p-1 text-sm border rounded-md border-t-indigo flex self-center"
						>
							<span><svelte:component this={getLinkData(key, value).icon} /></span>
							<span class="ml-2">{getLinkData(key, value).text}</span>
						</a>
					{:else if getLinkData(key, value).type === 'sms'}
						<span>destinataire : {getLinkData(key, value).number}</span>
						<span>message : {getLinkData(key, value).message}</span>
						<a
							href={getLinkData(key, value).href}
							class="p-1 text-sm border rounded-md border-t-indigo flex self-center"
						>
							<span><svelte:component this={getLinkData(key, value).icon} /></span>
							<span class="ml-2">{getLinkData(key, value).text}</span>
						</a>
					{:else if getLinkData(key, value).type === 'email'}
						<span>destinataire : {getLinkData(key, value).email}</span>
						<span>sujet : {getLinkData(key, value).subject}</span>
						<a
							href={getLinkData(key, value).href}
							class="p-1 text-sm border rounded-md border-t-indigo flex self-center"
						>
							<span><svelte:component this={getLinkData(key, value).icon} /></span>
							<span class="ml-2">{getLinkData(key, value).text}</span>
						</a>
					{:else if getLinkData(key, value).type === 'phone'}
						<a href={getLinkData(key, value).href} class="p-1 text-sm border rounded-md border-t-indigo flex self-center">
							<span><svelte:component this={getLinkData(key, value).icon} /></span>
							<span class="ml-2">{getLinkData(key, value).text}</span>
						</a>
					{/if}
				{/each}
			</div>
		</div>

		<div class="w-full flex flex-col justify-center items-center">
			<button
				class="text-xs border border-t-indigo bg-white rounded-md p-2 dark:bg-t-black dark:text-white dark:border-white
			sm:text-sm"
				on:click={reset}
			>
				Scanner un autre QrCode
			</button>
		</div>
	{/if}
</div>

<style>
</style>
