<script lang='ts'>
    import { _ } from 'svelte-i18n';
    export let gradientType: string;
    export let rotation: number;
    export let color1: string;
    export let color2: string;

    $: gradientStyle = `background: linear-gradient(to right, ${color1}, ${color2}); width: 100%; height: 40px; border-radius: 05px;`;
    
	function setGradientType(type: string) {
		gradientType = type;
	}

</script>
<div class="flex">
    <button
        class="{gradientType === 'linear'
            ? 'bg-slate-500 text-white dark:bg-slate-900 dark:text-slate-300'
            : 'bg-slate-600 text-black dark:text-slate-300'} rounded-l w-16 h-11 p-2"
        on:click={() => setGradientType('linear')}>{$_('ui.gradient.linear')}</button
    >
    <button
        class="{gradientType === 'radial'
            ? 'bg-slate-500 text-white dark:bg-slate-900 dark:text-slate-300'
            : 'bg-slate-600 text-black dark:text-slate-300'} rounded-r w-16 h-11 p-2"
        on:click={() => setGradientType('radial')}>{$_('ui.gradient.radial')}</button
    >
    {#if gradientType == 'linear'}
        <input
            type="number"
            min="0"
            max="360"
            bind:value={rotation}
            class="w-14 bg-slate-100 border rounded p-2
    border-slate-200 h-11 ml-4 dark:text-slate-300 dark:bg-slate-600 dark:border-slate-500"
        />
    {/if}
    <div class="flex flex-col w-full mr-4 ml-4">
        <div class="w-full border border-slate-200" style={gradientStyle}></div>
        <div class="flex justify-between mt-4">
            <input
                type="color"
                bind:value={color1}
                class="input-color bg-gray-500 rounded-full border-4 border-slate-200"
            />
            <input
                type="color"
                bind:value={color2}
                class="input-color bg-gray-500 rounded-full border-4 border-slate-200"
            />
        </div>
    </div>
</div>

<style lang="postcss">
	.input-color {
		@apply h-10
            w-10
            cursor-pointer
            appearance-none
            border-none
            bg-transparent
            p-0;
		position: relative; /* Positioned relative to allow absolute positioning of pseudo-elements */
	}

	.input-color::after {
		content: '';
		position: absolute; /* Absolute positioning relative to the input-color */
		top: -5px; /* Adjust this value to move the triangle above the input */
		left: 50%;
		transform: translateX(-50%); /* Center the triangle horizontally */
		width: 0;
		height: 0;
		border-left: 5px solid transparent; /* Adjust size of the triangle */
		border-right: 5px solid transparent; /* Adjust size of the triangle */
		border-bottom: 5px solid #e2e8f0; /* Color of the triangle, can match the border color */
		z-index: 1;
	}

	.input-color::-webkit-color-swatch-wrapper {
		padding: 0;
	}

	.input-color::-webkit-color-swatch {
		border: solid 4px #e2e8f0; /* This is the border-slate-200 equivalent */
		border-radius: 50%;
	}

	.input-color::-moz-color-swatch {
		border: solid 4px #e2e8f0; /* This is the border-slate-200 equivalent */
		border-radius: 50%;
	}
</style>
