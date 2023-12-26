<script lang="ts">
	import { onMount } from 'svelte';
	import type { Options } from 'qr-code-styling';
	import Card from '$lib/components/Card.svelte';
	import InputRadioButtons from '$lib/components/InputRadioButtons.svelte';
	import { _ } from 'svelte-i18n';

	export let options: Options;

	let qrCode: any;
	let qrCodeElement: HTMLElement; // HTMLElement | null = null;

	onMount(async () => {
		const { default: QRCodeStyling } = await import('qr-code-styling');
		qrCode = new QRCodeStyling(options); // QRCodeStyling(options);
		if (qrCodeElement) {
			// qrCodeElement = document.querySelector(".qr-preview");
			qrCode.append(qrCodeElement); // qrCodeElement && qrCode.append(qrCodeElement);
		}
	});

	$: if (qrCode) {
		qrCode.update(options);
	}
	function download() {
		qrCode.download({
			name: 'qrcode',
			extension: defaultStyle
		});
	}
	$: console.log('QrCodeDownload.svelte options = ', options.data);

	let styles = ['JPEG', 'PNG', 'SVG', 'WEBP'];
	let defaultStyle = 'SVG';
</script>

<div
	class="flex border-y-2 border-gray-400 bg-slate-300 shadow sm:flex-col sm:bg-transparent sm:border-hidden"
>
	<div class="mr-0 w-2/6 shrink-0 sm:w-full sm:p-2">
		<div
			class="qr-preview m-4 bg-white aspect-square p-2 rounded sm:m-2"
			bind:this={qrCodeElement}
		></div>
	</div>

	<Card>
		<div class="col-auto rounded">
			<InputRadioButtons
				bind:value={defaultStyle}
				text={(styles) => styles}
				options={styles}
			></InputRadioButtons>
		</div>

		<button class="bg-slate-800 text-white text-sm py-2 rounded w-full mt-2" on:click={download}>
			{$_('download.button')}
		</button>
	</Card>
</div>

<style>
	.qr-preview > :global(canvas) {
		width: 100%;
		height: 100%;
	}
</style>
