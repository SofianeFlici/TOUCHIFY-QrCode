<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import InputColor from '$lib/components/InputColor.svelte';
	import InputRadioButtons from '$lib/components/InputRadioButtons.svelte';
	import type { GradientType, Options } from 'qr-code-styling';
	import { _ } from 'svelte-i18n';
	import InputGradient from '$lib/components/InputGradient.svelte';
	import Accordion from '$lib/components/Accordion.svelte';
	import Select from '$lib/components/Select.svelte';

	export let cornersDotOptions: Options['cornersDotOptions'];

	let title: string = `corners.dot.title`;

	let types = [undefined, 'square', 'dot'] as const;

	let cornersDotGradient: boolean = false;
	let gradientType: GradientType = 'linear';
	let rotation: number = 0;
	let cornersDotColor: string = '#000000';
	let cornersDotColor2: string = '#ffffff';
	
	let cornersColor = '#000000';

	function toggleCornersDotGradient() {
		cornersDotGradient = !cornersDotGradient;
	}

	$: if (cornersDotGradient && gradientType && cornersDotOptions) {
		let type = gradientType;
		let rotate = rotation;
		cornersDotOptions.gradient = {
			type: type,
			rotation: rotate,
			colorStops: [
				{ offset: 0, color: cornersDotColor },
				{ offset: 1, color: cornersDotColor2 }
			]
		};
	} else {
		if (cornersDotOptions) {
			cornersDotOptions.color = cornersColor;
			cornersDotOptions.gradient = undefined;
		}
	}
</script>

<Card>
	<!-- <Accordion {title}> -->
		{#if cornersDotOptions}
			<div class="flex flex-col">
				<h3 class="font-semibold mb-3">{$_('corners.dot.type.label')}</h3>
				<Select bind:value={cornersDotOptions.type}>
					{#each types as type}
						<option value={type}>{$_(`corners.square.type.${type}`)}</option>
					{/each}
				</Select>
				<div>
					<h3 class="font-semibold mt-3">{$_('corners.dot.color.label')}</h3>
					<!------------------------------- Use gradient for corner dots color ------------------------------------>
					<input
						type="checkbox"
						value="gradient"
						on:click={() => toggleCornersDotGradient()}
						checked={cornersDotGradient}
						class="mt-3"
					/>
					{$_('ui.gradient.use')}
					{#if !cornersDotGradient}
						<div class="h-24 mt-3">
							<InputColor bind:value={cornersColor} />
						</div>
					{/if}
					{#if cornersDotGradient}
						<InputGradient
							bind:gradientType
							bind:rotation
							bind:color1={cornersDotColor}
							bind:color2={cornersDotColor2}
						/>
					{/if}
					<!-- ------------------------------------------------------------------------------------------ -->
				</div>
			</div>
		{/if}
	<!-- </Accordion> -->
</Card>
