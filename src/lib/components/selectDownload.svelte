<script lang="ts">
	import { IconDownload } from 'obra-icons-svelte';
	import { _ } from 'svelte-i18n';
	import { page } from '$app/stores';

	export let defaultStyle: string;
	export let qrCode: any;

	let styles = ['JPEG', 'PNG', 'SVG', 'WEBP'];

	function download() {
		qrCode.download({
			name: 'qrcode',
			extension: defaultStyle
		});
	}
</script>

<div class="bg-white flex flex-col rounded-md text-sm p-3 dark:bg-t-black {($page.url.pathname.startsWith('/mylist/qr') ? 'w-full h-full' : '')} sm:w-full">
	<select
		class="w-full rounded-md text-t-indigo p-1 border border-t-indigo hover:border-t-indigo dark:bg-t-dark-gray dark:text-white dark:border-white sm:hidden"
		bind:value={defaultStyle}
	>
		{#each styles as style}
			<option value={style}>{style}</option>
		{/each}
	</select>
	<div class="hidden sm:flex h-full -mx-1">
			{#each styles as style}
				<button
					class="w-full flex-grow rounded-md mx-1 p-2 text-sm lg:text-md
					{defaultStyle === style
						? 'bg-t-indigo text-white dark:bg-t-ciel dark:text-t-black'
						: ' text-t-indigo border border-t-indigo dark:border-white dark:text-white'}"
					on:click={() => (defaultStyle = style)}
				>
					{style}
				</button>
			{/each}
	</div>

	<button
		class="border border-t-indigo rounded-md p-2 mt-3 w-full flex justify-center items-center text-t-indigo {($page.url.pathname.startsWith('/mylist/qr') ? 'p-0 w-full h-full bg-t-indigo text-white dark:bg-t-black' : ' ')}		
				text-sm sm:text-base
            	dark:text-white dark:border-white"
		on:click={download}
	>
		<IconDownload size={16} />
		<span class="ml-2">{$_('download.button')}</span>
	</button>
</div>
