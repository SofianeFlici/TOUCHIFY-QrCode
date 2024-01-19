<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import InputColor from '$lib/components/InputColor.svelte';
	import type { Options } from 'qr-code-styling';
	import { _ } from 'svelte-i18n';
	import InputRadioButtons from '$lib/components/InputRadioButtons.svelte';
	import InputGradient from '$lib/components/InputGradient.svelte';
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
			<h2 class="font-semibold m-1 mb-2">{$_('options.title')}</h2>
			<p class="font-semibold m-1">{$_('dots.type.label')}</p>
			<InputRadioButtons
				bind:value={dotsOptions.type}
				text={(style) => $_(`dots.type.${style}`)}
				options={style}
			></InputRadioButtons>
			<div>
				<p class="font-semibold m-1">{$_('dots.color.label')}</p>

				<!------------------------------- Use gradient for dots color ------------------------------------>
				<input
					type="checkbox"
					value="gradient"
					on:click={() => toggleDotsGradient()}
					checked={dotsGradient}
					class="m-1"
				/>
				{$_('ui.gradient.use')}
				<InputColor bind:value={dotsOptions.color} />

				{#if dotsGradient}
					<InputGradient
						bind:gradientType
						bind:rotation
						bind:color1={dotsColor}
						bind:color2={dotsColor2}
					/>
				{/if}
				<!-- ------------------------------------------------------------------------------------------ -->
			</div>
			<div>
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
						<InputColor bind:value={backgroundOptions.color} />
					{/if}
				</div>
			{/if}
			<!-- ------------------------------------------------------------------------------- -->
			{#if backgroundGradient && !transparent}
				<InputGradient
					bind:gradientType
					bind:rotation
					bind:color1={bgColor}
					bind:color2={bgColor2}
				/>
			{/if}
		</div>
	{/if}
</Card>
