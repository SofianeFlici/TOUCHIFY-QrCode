<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import InputColor from '$lib/components/InputColor.svelte';
	import type { Options } from 'qr-code-styling';
	import { _ } from 'svelte-i18n';
	import InputRadioButtons from '$lib/components/InputRadioButtons.svelte';
	import InputGradient from '$lib/components/InputGradient.svelte';
	import Select from '$lib/components/Select.svelte';

	export let dotsOptions: Options['dotsOptions'];
	export let backgroundOptions: Options['backgroundOptions'];

	let backgroundGradient: boolean = false;
	let dotsGradient: boolean = false;

	let bgColor: string = '#000000';
	let bgColor2: string = '#ffffff';

	let dotsColor: string = '#000000';
	let dotsColor2: string = '#ffffff';

	let rotation: number = 0;
	let gradientType: string = 'linear';

	let backgroundColors: string = '#ffffff';

	let style = ['square', 'rounded', 'dots', 'classy', 'classy-rounded', 'extra-rounded'] as const;
	let transparent = true;

	function toggleDotsGradient() {
		dotsGradient = !dotsGradient;
	}

	function toggleTransparent() {
		transparent = !transparent;
		if (transparent) backgroundGradient = false;
	}

	function toggleBackgroundGradient() {
		backgroundGradient = !backgroundGradient;
		if (backgroundGradient) transparent = false;
	}

	$: if (backgroundGradient && gradientType && backgroundOptions) {
		let type = gradientType;
		let rotate = rotation;
		backgroundOptions.gradient = {
			type: type,
			rotation: rotate,
			colorStops: [
				{ offset: 0, color: bgColor },
				{ offset: 1, color: bgColor2 }
			]
		};
	} else {
		if (backgroundOptions) {
			backgroundOptions.color = backgroundColors;
			backgroundOptions.color = transparent ? 'transparent' : backgroundOptions.color;
			backgroundOptions.gradient = undefined;
		}
	}

	$: if (dotsGradient && gradientType && dotsOptions) {
		let type = gradientType;
		let rotate = rotation;
		dotsOptions.gradient = {
			type: type,
			rotation: rotate,
			colorStops: [
				{ offset: 0, color: dotsColor },
				{ offset: 1, color: dotsColor2 }
			]
		};
	} else {
		if (dotsOptions) {
			dotsOptions.color = dotsOptions.color;
			dotsOptions.gradient = undefined;
		}
	}
</script>

<Card>
	{#if dotsOptions}
		<div class="flex flex-col">
			<h2 data-type="form-label" class="font-semibold mb-2">{$_('options.title')}</h2>
			<div data-type="form-group" class="mb-4">
				<h3 data-type="form-label" class="font-semibold mb-2">{$_('dots.type.label')}</h3>
				<Select bind:value={dotsOptions.type}>
					{#each style as style}
						<option value={style}>{$_(`dots.type.${style}`)}</option>
					{/each}
				</Select>
			</div>
			<div>
				<h2 class="font-semibold mb-2">{$_('dots.color.label')}</h2>
				<div class="grid grid-cols-[max-content_auto] gap-2 p-2 bg-yellow-400">
					<div class="flex flex-col bg-red-400">
						<button
							type="button"
							class="border rounded-md p-1
						{dotsGradient === false
								? 'bg-t-indigo text-white dark:text-black dark:bg-t-ciel border-t-ciel'
								: 'bg-white text-t-indigo dark:bg-t-black dark:text-white dark:border-white'}"
							on:click={() => toggleDotsGradient()}
						>
							Uni
						</button>
						<button
							type="button"
							class="border rounded-md p-1 mt-2
						{dotsGradient === true
								? 'bg-t-indigo text-white dark:text-black dark:bg-t-ciel border-t-ciel'
								: 'bg-white text-t-indigo dark:bg-t-black dark:text-white dark:border-white'}"
							on:click={() => toggleDotsGradient()}
						>
							Gradient
						</button>
					</div>
					<div>
						{#if !dotsGradient}
							<InputColor bind:value={dotsOptions.color} />
						{/if}
						{#if dotsGradient}
							<InputGradient bind:gradientType bind:color1={dotsColor} bind:color2={dotsColor2} />
						{/if}
					</div>
				</div>
			</div>
			<div class="mt-4">
				<p class="font-semibold m-1">{$_('background.color.label')}</p>
				<input
					type="checkbox"
					value="transparent"
					on:click={() => toggleTransparent()}
					checked={transparent}
					class="m-1"
				/>{$_('ui.color.transparent')}
			</div>
			<!-- -------------------- Partie dégradé --------------------------------------- -->
			{#if !transparent && backgroundOptions}
				<div>
					<input
						type="checkbox"
						value="degrade"
						on:click={() => toggleBackgroundGradient()}
						checked={backgroundGradient}
						class="m-1"
					/>{$_('ui.gradient.use')}
				</div>

				<div>
					{#if backgroundOptions && !backgroundGradient && !transparent}
						<InputColor bind:value={backgroundColors} />
					{/if}
				</div>
			{/if}
			<!-- ------------------------------------------------------------------------------- -->
			{#if backgroundGradient && !transparent}
				<div class="flex justify-center items-center">
					<InputGradient
						bind:gradientType
						bind:rotation
						bind:color1={bgColor}
						bind:color2={bgColor2}
					/>
				</div>
			{/if}
		</div>
	{/if}
</Card>
