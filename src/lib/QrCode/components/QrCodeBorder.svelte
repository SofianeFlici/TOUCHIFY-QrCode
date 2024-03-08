<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import InputColor from '$lib/components/InputColor.svelte';
	import type { Gradient, GradientType, Options } from 'qr-code-styling';
	import { _ } from 'svelte-i18n';
	import InputGradient from '$lib/components/InputGradient.svelte';
	import Accordion from '$lib/components/Accordion.svelte';
	import Select from '$lib/components/Select.svelte';

	export let cornersSquareOptions: Options['cornersSquareOptions'];

	let gradient: boolean = false;
	let gradientType: GradientType = 'linear';
	let rotation: number = 0;
	let squareColor: string = '#000000';
	let squareColor2: string = '#ffffff';

	let borderColor: string = '#000000';

	let title: string = `corners.square.title`;

	let types = [undefined, 'dot', 'square', 'extra-rounded'] as const;

	function toggleSquareGradient() {
		gradient = !gradient;
	}

	$: if (gradient && gradientType && cornersSquareOptions) {
		let type = gradientType;
		let rotate = rotation;
		cornersSquareOptions.gradient = {
			type: type,
			rotation: rotate,
			colorStops: [
				{ offset: 0, color: squareColor },
				{ offset: 1, color: squareColor2 }
			]
		};
	} else {
		if (cornersSquareOptions) {
			cornersSquareOptions.color = borderColor;
			cornersSquareOptions.gradient = undefined;
		}
	}
</script>

<Card>
	<Accordion {title}>
		{#if cornersSquareOptions}
			<div class="flex flex-col">
				<div>
					<h3 class="font-semibold mb-3">{$_(`corners.square.type.label`)}</h3>
					<Select bind:value={cornersSquareOptions.type}>
						<option value="dot">{$_(`corners.square.type.dot`)}</option>
						<option value="square">{$_(`corners.square.type.square`)}</option>
						<option value="extra-rounded">{$_(`corners.square.type.extra-rounded`)}</option>
					</Select>
				</div>
				<div class="mt-3">
					<h3 class="mb-3">
						{$_(`corners.square.color.label`)}
					</h3>
					<!------------------------------- Use gradient for border color ------------------------------------>
					<InputGradient
						bind:options={cornersSquareOptions}
						bind:gradientType
						{gradient}
					/>
					<!-- <input
						type="checkbox"
						value="gradient"
						on:click={() => toggleSquareGradient()}
						checked={gradient}
						class="mr-2"
					/>
					{$_('ui.gradient.use')}
					{#if !gradient}
						<div class="h-24 mt-3">
							<InputColor bind:value={borderColor} />
						</div>
					{/if}
					{#if gradient}
						<InputGradient
							bind:gradientType
							bind:color1={squareColor}
							bind:color2={squareColor2}
						/>
					{/if} -->
					<!-- ------------------------------------------------------------------------------------------ -->
				</div>
			</div>
		{/if}
	</Accordion>
</Card>
