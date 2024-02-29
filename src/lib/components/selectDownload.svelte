<script lang="ts">
	import { IconDownload } from 'obra-icons-svelte';
	import { _ } from 'svelte-i18n';

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

<div
	class="bg-white flex flex-col rounded-md text-[10px] p-2 dark:bg-t-dark-gray
sm:w-full sm:mt-3"
>
	<select
		class="w-full rounded-md text-t-indigo p-1 border-2 border-t-indigo text-xs hover:border-t-indigo dark:bg-t-dark-gray dark:text-white dark:border-white sm:hidden"
		bind:value={defaultStyle}
	>
		{#each styles as style}
			<option value={style}>{style}</option>
		{/each}
	</select>
	<div class="hidden sm:flex">
		{#each styles as style}
			<button
				class="py-1 px-2 w-full flex-grow flex rounded-md m-1 sm:text-[10px] md:text-sm lg:text-md
                {defaultStyle === style
					? 'bg-t-indigo text-white dark:bg-t-ciel dark:text-t-black'
					: 'bg-slate-100 hover:bg-slate-300 text-black border dark:border-slate-500 dark:bg-slate-600 dark:text-white'}"
				on:click={() => (defaultStyle = style)}
			>
				{style}
			</button>
		{/each}
	</div>

	<button
		class="border-2 border-t-indigo bg-white rounded-md p-1 mt-2 w-full flex px-5 items-center text-t-indigo
				md:text-sm lg:text-md lg:mt-2
                dark:bg-t-dark-gray dark:text-white dark:border-white"
		on:click={download}
	>
		<IconDownload size={16} />
		<span class="ml-3">{$_('download.button')}</span>
	</button>
</div>
