<script lang="ts">
	import type { Options } from 'qr-code-styling';
	import Card from '$lib/components/Card.svelte';
	import facebook from '$assets/brands/facebook.svg';
	import instagram from '$assets/brands/instagram-icon.svg';
	import youtube from '$assets/brands/youtube-icon.svg';
	import db from '$lib/db';

	export let options: Options;

	$:console.log("definedChoice option data =", options.data);

	let style = ['none', 'facebook', 'instagram', 'youtube'];
	let styleSelected = 'none';

	$: if (styleSelected === 'none')
		options = {
			data: options.data,
			image: undefined,
			dotsOptions: {
				color: '#000000',
				type: 'square'
			},
			imageOptions: {
				crossOrigin: 'anonymous',
				margin: 20
			},
			cornersSquareOptions: {
				color: '#000000'
			},
			backgroundOptions: {
				color: '#ffffff'
			}
		};

	$: if (styleSelected === 'facebook')
		options = {
			data: options.data,
			image: facebook,
			dotsOptions: {
				color: '#4267b2',
				type: 'square'
			},
			imageOptions: {
				crossOrigin: 'anonymous',
				margin: 20
			},
			cornersSquareOptions: {
				color: '#4267b2'
			},
			backgroundOptions: {
				color: '#ffffff'
			}
		};
	
	$: if (styleSelected === 'instagram')
		options = {
			data: options.data,
			image: instagram,
			dotsOptions: {
				color: '#e1306c',
				type: 'square'
			},
			imageOptions: {
				crossOrigin: 'anonymous',
				margin: 20
			},
			cornersSquareOptions: {
				color: '#e1306c'
			},
			backgroundOptions: {
				color: '#ffffff'
			}
		};

	$: if (styleSelected === 'youtube')
		options = {
			data: 'https://www.youtube.com/',
			image: youtube,
			dotsOptions: {
				color: '#ff0000',
				type: 'square'
			},
			imageOptions: {
				crossOrigin: 'anonymous',
				margin: 20
			},
			cornersSquareOptions: {
				color: '#ff0000'
			},
			backgroundOptions: {
				color: '#ffffff'
			}
		};

	$: console.log('qrCodeDefinedChoice =', styleSelected);
	$: console.log('qrCodeDefinedChoice options =', options);
</script>

<Card>
	<div class="flex flex-col">
		<h2 class="font-semibold m-1 mb-2">Modèle de QrCode :</h2>
		<div>
			{#each style as item}
				<button
					class="m-1 px-2 py-1 rounded bg-slate-200 dark:bg-slate-800"
					on:click={() => (styleSelected = item)}
				>
					{item}
				</button>
			{/each}
		</div>
	</div>
</Card>
