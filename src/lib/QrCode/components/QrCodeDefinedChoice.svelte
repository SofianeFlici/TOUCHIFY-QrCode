<script lang="ts">
	import type { Options } from 'qr-code-styling';
	import Card from '$lib/components/Card.svelte';
	import facebook from '$assets/brands/facebook.svg';
	import instagram from '$assets/brands/instagram-icon.svg';
	import youtube from '$assets/brands/youtube-icon.svg';
	import linkedin from '$assets/brands/linkedin-icon.svg';
	import twitter from '$assets/brands/twitter-icon.svg';
	import github from '$assets/brands/github-icon.svg';
	import { _ } from 'svelte-i18n';

	export let options: Options;


	let style = ['None', 'Facebook', 'Instagram', 'Youtube', 'Linkedin', 'Twitter', 'Github'];
	let styleSelected = 'none';
	
	$: {
		options = {
			data: options.data,
			dotsOptions: {
				color: options.dotsOptions.color,
				type: options.dotsOptions.type
			},
			imageOptions: {
				crossOrigin: 'anonymous',
				margin: 20
			},
			cornersSquareOptions: {
				color: options.cornersSquareOptions.color,
			},
			cornersDotOptions: {},
			backgroundOptions: {
				color: options.backgroundOptions.color,
			},
			qrOptions: {
				typeNumber: 0,
				errorCorrectionLevel: 'Q',
				mode: 'Byte'
			}
		};

		if (styleSelected === 'Facebook') {
			options.data = 'https://www.facebook.com/';
			options.image = facebook;
			options.dotsOptions.color = '#4267b2';
			options.cornersSquareOptions.color = '#4267b2';
			options.backgroundOptions.color = '#ffffff';
		} else if (styleSelected === 'Instagram') {
			options.image = instagram;
			options.dotsOptions.color = '#e1306c';
			options.cornersSquareOptions.color = '#e1306c';
			options.backgroundOptions.color = '#ffffff';
		} else if (styleSelected === 'Youtube') {
			options.data = 'https://www.youtube.com/';
			options.image = youtube;
			options.dotsOptions.color = '#ff0000';
			options.cornersSquareOptions.color = '#ff0000';
			options.backgroundOptions.color = '#ffffff';
		} else if (styleSelected === 'Linkedin') {
			options.data = 'https://www.linkedin.com/';
			options.image = linkedin;
			options.dotsOptions.color = '#0077b5';
			options.cornersSquareOptions.color = '#0077b5';
			options.backgroundOptions.color = '#ffffff';
		} else if (styleSelected === 'Twitter') {
			options.data = 'https://twitter.com/';
			options.image = twitter;
			options.dotsOptions.color = '#1da1f2';
			options.cornersSquareOptions.color = '#1da1f2';
			options.backgroundOptions.color = '#ffffff';
		} else if (styleSelected === 'Github') {
			options.data = 'https://github.com/';
			options.image = github;
			options.dotsOptions.color = '#000000';
			options.cornersSquareOptions.color = '#000000';
			options.backgroundOptions.color = '#ffffff';
		} else {
			options.image = undefined;
			options.dotsOptions.color = '#000000';
			options.cornersSquareOptions.color = '#000000';
			options.backgroundOptions.color = '#ffffff';
		}
	}

</script>

<Card>
	<div class="flex flex-col">
		<h2 class="font-semibold m-1 mb-2">{$_('model.title')}</h2>
		<div>
			{#each style as item}
			<button
			class="m-1 px-2 py-1 rounded bg-slate-200 dark:bg-slate-800"
			on:click={() => (styleSelected = item)}
			>
			{item === 'None' ? $_('model.undefined') : item}
				</button>
			{/each}
		</div>
	</div>
</Card>
