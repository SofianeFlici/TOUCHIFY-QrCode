<script lang="ts">
	import type { Options } from 'qr-code-styling';
	import Card from '$lib/components/Card.svelte';
	import facebook from '$assets/brands/facebook.svg';
	import instagram from '$assets/brands/instagram-icon.svg';
	import youtube from '$assets/brands/youtube-icon.svg';
	import linkedin from '$assets/brands/linkedin-icon.svg';
	import twitter from '$assets/brands/twitter-icon.svg';
	import github from '$assets/brands/github-icon.svg';
	import db from '$lib/db';

	export let options: Options;

	$: console.log('definedChoice option data =', options.data);

	let style = ['none', 'facebook', 'instagram', 'youtube', 'linkedin', 'twitter', 'github'];
	let styleSelected = 'none';

	$: {
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
        cornersDotOptions: {},
        backgroundOptions: {
            color: '#ffffff'
        },
        qrOptions: {
            typeNumber: 0,
            errorCorrectionLevel: 'Q',
            mode: 'Byte'
        }
    };

    if (styleSelected === 'facebook') {
        options.image = facebook;
        options.dotsOptions.color = '#4267b2';
        options.cornersSquareOptions.color = '#4267b2';
    } else if (styleSelected === 'instagram') {
        options.image = instagram;
        options.dotsOptions.color = '#e1306c';
        options.cornersSquareOptions.color = '#e1306c';
    } else if (styleSelected === 'youtube') {
        options.data = 'https://www.youtube.com/';
        options.image = youtube;
        options.dotsOptions.color = '#ff0000';
        options.cornersSquareOptions.color = '#ff0000';
    } else if (styleSelected === 'linkedin') {
		options.image = linkedin;
		options.dotsOptions.color = '#0077b5';
		options.cornersSquareOptions.color = '#0077b5';
	} else if (styleSelected === 'twitter') {
		options.image = twitter;
		options.dotsOptions.color = '#1da1f2';
		options.cornersSquareOptions.color = '#1da1f2';
	} else if (styleSelected === 'github') {
		options.image = github;
		options.dotsOptions.color = '#000000';
		options.cornersSquareOptions.color = '#000000';
	} else {
		options.image = undefined;
		options.dotsOptions.color = '#000000';
		options.cornersSquareOptions.color = '#000000';
	}
}

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
