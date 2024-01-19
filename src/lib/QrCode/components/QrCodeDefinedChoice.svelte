<script lang="ts">
	import type { Options } from 'qr-code-styling';
	import Card from '$lib/components/Card.svelte';
	import facebook from '$assets/brands/facebook.svg';
	import instagram from '$assets/brands/instagram-icon.svg';
	import youtube from '$assets/brands/youtube-icon.svg';
	import db from '$lib/db';

	export let options: Options;

	let blob: Blob | null = null;
	let blobUrl: string = '';

	let style = ['none', 'facebook', 'instagram', 'youtube'];
	let styleSelected = 'none';

	async function loadSvg(svgPath: string) {
    try {
        const response = await fetch(svgPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const svgText = await response.text();
        const blob = new Blob([svgText], { type: 'image/svg+xml' });

        await db.images.add({ blob }); // Assurez-vous que cette opération est valide
        return URL.createObjectURL(blob);
    } catch (error) {
        console.error("Erreur lors du chargement du SVG :", error);
        // Gérer l'erreur ou la renvoyer
        throw error;
    }
}


	$: {
		if (styleSelected === 'facebook')
			loadSvg(facebook).then((url) => {
				blobUrl = url;
			});
		options.data = 'https://www.facebook.com/';
		options.image = blobUrl;
		options.dotsOptions.color = '#4267b2';
		options.dotsOptions.type = 'square';
		options.imageOptions.crossOrigin = 'anonymous';
		options.imageOptions.margin = 20;
		options.cornersSquareOptions.color = '#4267b2';
		options.backgroundOptions.color = '#ffffff';
	}

	$: if (styleSelected === 'instagram')
		options = {
			data: 'https://www.instagram.com/',
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
		<h2 class="font-semibold m-1 mb-2">Vous avez un style ?</h2>
		<p class="font-semibold m-1">...</p>
		<div>
			{#each style as item}
				<button class="m-1 border bg-slate-200" on:click={() => (styleSelected = item)}
					>{item}</button
				>
			{/each}
		</div>
	</div>
</Card>
