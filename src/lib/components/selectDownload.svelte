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

<div class="bg-white w-28 h-24 flex flex-col justify-around p-2 rounded-md text-[10px] dark:bg-t-dark-gray dark:font-semibold 
sm:w-full">
    <select
        class="w-full rounded-md text-t-indigo p-1 border-2 border-t-indigo text-xs font-semibold hover:border-t-indigo mb-3 dark:bg-t-dark-gray dark:text-white dark:border-white sm:hidden"
        bind:value={defaultStyle}
    >
        {#each styles as style}
            <option value={style}>{style}</option>
        {/each}
    </select>
    <div class="hidden sm:flex">
        {#each styles as style}
            <button 
                class="flex-grow py-1 px-2 rounded-md m-1 text-xs sm:text-base 
                {defaultStyle === style ? 'bg-t-indigo text-white dark:bg-t-indigo dark:text-white' : 'bg-slate-100 hover:bg-slate-300 text-black border dark:border-slate-500 dark:bg-slate-600 dark:text-white'}"
                on:click={() => defaultStyle = style}
            >
                {style}
            </button>
        {/each}
    </div>

    <button
        class="border-2 border-t-indigo bg-white rounded-md p-[5px] font-semibold w-full flex justify-center items-center text-t-indigo 
                dark:bg-t-dark-gray dark:text-white dark:border-white"
        on:click={download}
    >
        <IconDownload size={16} />
        {$_('download.button')}
    </button>
</div>
