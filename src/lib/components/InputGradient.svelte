<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Select from './Select.svelte';
	import InputColor from './InputColor.svelte';

	// -------------------------------------

	// export let transparent;
	export let options;
	export let transparent;
	export let backgroundGradient;
	export let allowTransparent;

	let gradient: boolean = !!options.gradient;

	let color1: string = options.gradient?.colorStops[0].color || '#000000';
	let color2: string = options.gradient?.colorStops[1].color || '#ffffff';

	let gradientType: string = 'linear';

	$: console.log('gradient Transparent', transparent);
	$: console.log('gradient options', options);

	function toggleGradient(value) {
		gradient = value;
	}

	$: if (gradientType && options && gradient === true) {
		options.gradient = {
			type: gradientType,
			colorStops: [
				{ offset: 0, color: color1 },
				{ offset: 1, color: color2 }
			]
		};
	} else {
		if (options) {
			options.color = allowTransparent && transparent ? 'transparent' : options.color;
		}
	}

	$: gradientStyle = `background: linear-gradient(to right, ${color1}, ${color2});`;

	function changeToLinear() {
		gradientType = 'linear';
	}

	function changeToRadial() {
		gradientType = 'radial';
	}
</script>

<div>
	<h3 class="font-semibold mb-2">{$_('dots.color.label')}</h3>
	<div class="grid grid-cols-[max-content_auto] gap-2">
		<div class="flex flex-col">
			<button
				type="button"
				class="border rounded-md p-2 text-sm
						{gradient === false
					? 'bg-t-indigo border-t-indigo text-white dark:bg-t-ciel dark:border-t-ciel dark:text-black'
					: 'bg-white border-t-indigo  text-t-indigo dark:bg-t-black dark:border-white dark:text-white '}"
				on:click={() => toggleGradient(false)}
			>
				Uni
			</button>
			<button
				type="button"
				class="border rounded-md p-2 mt-2 text-sm
						{gradient === true
					? 'bg-t-indigo border-t-indigo text-white dark:bg-t-ciel dark:border-t-ciel dark:text-black'
					: 'border-t-indigo bg-white text-t-indigo dark:bg-t-black dark:border-white dark:text-white'}"
				on:click={() => toggleGradient(true)}
			>
				Gradient
			</button>
		</div>
		<div>
			{#if !gradient}
				<InputColor bind:value={options.color} />
			{/if}
			{#if gradient}
				<div class="flex flex-col h-full items-center w-full justify-around">
					<div class="flex w-full justify-center items-center relative mb-2">
						<div class=" w-full border border-transparent mx-4 text-sm p-2" style={gradientStyle}>
							&nbsp;
						</div>
						<div class="input-color absolute left-0" style="background-color: {color1}">
							<input type="color" bind:value={color1} />
						</div>
						<div class="input-color absolute right-0" style="background-color: {color2}">
							<input type="color" bind:value={color2} />
						</div>
					</div>
					<Select bind:value={gradientType}>
						<option value="linear" on:change={changeToLinear}>{$_('ui.gradient.linear')}</option>
						<option value="radial" on:change={changeToRadial}>{$_('ui.gradient.radial')}</option>
					</Select>
				</div>
			{/if}
		</div>
	</div>
</div>

<style lang="postcss">
	.input-color {
		@apply h-8 w-8 cursor-pointer overflow-hidden rounded-full shadow-[0_0_0_1px_#eee,0_0_0_5px_#fff] dark:shadow-[0_0_0_1px_#333,0_0_0_5px_#1f1f23];
	}

	.input-color input {
		@apply h-full w-full opacity-0;
	}
</style>
