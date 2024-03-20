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

<div class="mb-2 flex rounded-md text-xs dark:bg-t-black {($page.url.pathname.startsWith('/mylist/qr') ? 'w-full h-full flex-col ' : 'max-w-36')}sm:bg-white sm:max-w-full sm:p-3 sm:w-full sm:flex-col">
	<select
		class="flex-grow p-2 rounded-md text-t-indigo sm:p-1 border  {($page.url.pathname.startsWith('/mylist/qr') ? 'hidden' : '')} border-t-indigo hover:border-t-indigo dark:bg-t-dark-gray dark:text-white dark:border-white sm:hidden"
		bind:value={defaultStyle}
	>
		{#each styles as style}
			<option value={style}>{style}</option>
		{/each}
	</select>
	<div class="{($page.url.pathname.startsWith('/mylist/qr') ? 'flex' : 'hidden')} sm:flex h-full -mx-1">
			{#each styles as style}
				<button
					class="w-full flex-grow rounded-md mx-1 p-1 text-sm lg:text-md hover:bg-t-ciel hover:text-white
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
		class="p-2 border {($page.url.pathname.startsWith('/mylist/qr') ? '' : 'ml-2')} bg-white sm:ml-0 border-t-indigo rounded-md sm:p-2 sm:mt-3 sm:w-full dark:bg-t-black flex justify-center items-center text-t-indigo hover:bg-t-ciel hover:text-white {($page.url.pathname.startsWith('/mylist/qr') ? ' w-full mt-3 text-t-indigo dark:bg-t-black' : ' ')}		
				sm:text-base
            	dark:text-white dark:border-white"
		on:click={download}
	>
		<IconDownload size={16} />
		<span class=" {($page.url.pathname.startsWith('/mylist/qr') ? 'flex' : 'hidden')} ml-2 sm:block">{$_('download.button')}</span>
	</button>
</div>
