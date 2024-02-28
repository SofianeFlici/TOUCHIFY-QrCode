<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Select from './Select.svelte';
	export let gradientType: string;
	export let color1: string;
	export let color2: string;

	$: gradientStyle = `background: linear-gradient(to right, ${color1}, ${color2}); width: 80%; height: 34px; border-radius: 5px; margin-top: 2px;`;

	function changeToLinear() {
		gradientType = 'linear';
	}

	function changeToRadial() {
		gradientType = 'radial';
	}
</script>

<div class="flex flex-col h-20 items-center w-full justify-around align-middle px-3 mt-2">
	<div class="flex w-full justify-center items-center relative mb-1">
		<div class="border m-0 p-0 border-slate-200 h-full" style={gradientStyle}></div>
		<input type="color" bind:value={color1} class="input-color absolute left-0 rounded-full" />
		<input type="color" bind:value={color2} class="input-color absolute right-0 rounded-full" />
	</div>
	<Select bind:value={gradientType}>
		<option value="linear" on:change={changeToLinear}>{$_('ui.gradient.linear')}</option>
		<option value="radial" on:change={changeToRadial}>{$_('ui.gradient.radial')}</option>
	</Select>
</div>

<style lang="postcss">
	.input-color {
		@apply h-7 w-7 cursor-pointer appearance-none border-none bg-transparent p-0;
		box-shadow:
			0 0 0 1px #ccc,
			0 0 0 4px white;
	}

	.input-color::-webkit-color-swatch-wrapper {
		@apply p-0;
	}

	.input-color::-webkit-color-swatch {
		@apply relative rounded-full border-none;
	}
</style>
