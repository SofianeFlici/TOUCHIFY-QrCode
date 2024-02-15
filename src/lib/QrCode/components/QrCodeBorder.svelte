<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import InputColor from '$lib/components/InputColor.svelte';
	import type { Gradient, GradientType, Options } from 'qr-code-styling';
	import { _ } from 'svelte-i18n';
	import InputRadioButtons from '$lib/components/InputRadioButtons.svelte';
	import InputGradient from '$lib/components/InputGradient.svelte';
	import Accordion from '$lib/components/Accordion.svelte';
	import Select from '$lib/components/Select.svelte';

	export let cornersSquareOptions: Options['cornersSquareOptions'];

	let squareGradient: boolean = false;
	let gradientType: GradientType = 'linear';
	let rotation: number = 0;
	let squareColor: string = '#000000';
	let squareColor2: string = '#ffffff';

	let borderColor: string = '#000000';

	let title: string = `corners.square.title`;

	let types = [undefined, 'dot', 'square', 'extra-rounded'] as const;

	function toggleSquareGradient() {
		squareGradient = !squareGradient;
	}

	$: if (squareGradient && gradientType && cornersSquareOptions) {
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
				<p class="font-semibold m-1">{$_(`corners.square.type.label`)}</p>
				<Select bind:value={cornersSquareOptions.type}>
					<option value="dot">{$_(`corners.square.type.dot`)}</option>
					<option value="square">{$_(`corners.square.type.square`)}</option>
					<option value="extra-rounded">{$_(`corners.square.type.extra-rounded`)}</option>
				</Select>
				<div>
					<p class="font-semibold m-1">
						{$_(`corners.square.color.label`)}
					</p>
					<!------------------------------- Use gradient for border color ------------------------------------>
					<input
						type="checkbox"
						value="gradient"
						on:click={() => toggleSquareGradient()}
						checked={squareGradient}
						class="m-1"
					/>
					{$_('ui.gradient.use')}
					{#if !squareGradient}
						<div class="">
							<InputColor bind:value={borderColor} />
						</div>
					{/if}
					{#if squareGradient}
						<InputGradient
							bind:gradientType
							bind:rotation
							bind:color1={squareColor}
							bind:color2={squareColor2}
						/>
					{/if}
					<!-- ------------------------------------------------------------------------------------------ -->
				</div>
			</div>
		{/if}
	</Accordion>
</Card>
