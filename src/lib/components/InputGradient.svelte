<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Select from './Select.svelte';
	export let gradientType: string;
	export let color1: string;
	export let color2: string;

	$: gradientStyle = `background: linear-gradient(to right, ${color1}, ${color2}); width: 80%; height: 40px; border-radius: 5px;`;

	function handleGradientTypeChange(event:any) {
		gradientType = event.target.value;
	}
</script>

<div class="flex flex-col">
	<div class="flex flex-col w-48 p-2 bg-red-400 h-full">
		<div class="flex mt-4 w-48 justify-center items-center">
			<input
				type="color"
				bind:value={color1}
				class="input-color absolute left-20 bg-gray-500 rounded-full border-4 border-slate-200"
			/>
			<div class="border relative m-0 p-0 border-slate-200" style={gradientStyle}></div>
			<input
				type="color"
				bind:value={color2}
				class="input-color absolute right-3 bg-gray-500 rounded-full border-4 border-slate-200"
			/>
		</div>
		<Select value={gradientType} on:change={handleGradientTypeChange}>
            <option value="linear">{$_('ui.gradient.linear')}</option>
            <option value="radial">{$_('ui.gradient.radial')}</option>
        </Select>
          
	</div>
</div>

<style lang="postcss">
	.input-color {
		@apply h-10 w-10 cursor-pointer appearance-none border-none bg-transparent p-0;
	}

	.input-color::-webkit-color-swatch-wrapper {
		@apply p-0;
	}

	.input-color::-webkit-color-swatch {
		@apply relative rounded-full border-2 border-slate-200;
	}
</style>
