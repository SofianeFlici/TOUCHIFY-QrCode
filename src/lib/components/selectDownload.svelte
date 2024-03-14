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

<div class="sm:bg-white mb-2 flex rounded-md text-xs dark:bg-t-black {($page.url.pathname.startsWith('/mylist/qr') ? 'w-full h-full' : '')} sm:p-3 sm:w-full sm:flex-col">
	<select
		class="w-full p-1 rounded-md text-t-indigo sm:p-1 border border-t-indigo hover:border-t-indigo dark:bg-t-dark-gray dark:text-white dark:border-white sm:hidden"
		bind:value={defaultStyle}
	>
		{#each styles as style}
			<option value={style}>{style}</option>
		{/each}
	</select>
	<div class="hidden sm:flex h-full -mx-1">
			{#each styles as style}
				<button
					class="w-full flex-grow rounded-md mx-1 p-2 text-sm lg:text-md hover:bg-t-ciel hover:text-white
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
		class="p-1 ml-2 border bg-white sm:ml-0 border-t-indigo rounded-md sm:p-2 sm:mt-3 sm:w-full flex justify-center items-center text-t-indigo hover:bg-t-ciel hover:text-white {($page.url.pathname.startsWith('/mylist/qr') ? 'p-0 w-full h-full text-t-indigo dark:bg-t-black' : ' ')}		
				sm:text-base
            	dark:text-white dark:border-white"
		on:click={download}
	>
		<IconDownload size={16} />
		<span class="hidden ml-2 sm:block">{$_('download.button')}</span>
	</button>
	<!-- <button class="border-t-indigo border rounded-md text-black">
		<IconDownload size={16} />
		<span class="hidden ml-2 sm:block">{$_('download.button')}</span>
	</button> -->
</div>
