<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import { _ } from 'svelte-i18n';
	import InputGradient from '$lib/components/InputGradient.svelte';
	import Accordion from '$lib/components/Accordion.svelte';
	import Select from '$lib/components/Select.svelte';
	import type { ColorOptions } from '../qrcode.data';
	import Toggle from '$lib/components/Toggle.svelte';

	export let generalOptions: ColorOptions;
	export let cornersSquareOptions: ColorOptions;

	let hasColor = cornersSquareOptions?.color || cornersSquareOptions?.gradient;
	let title: string = `corners.square.title`;

	$: if (!hasColor) {
		cornersSquareOptions.color = undefined;
		cornersSquareOptions.gradient = undefined;
	}

</script>

<Card>
	<Accordion {title} open={true}>
		{#if cornersSquareOptions}
			<div class="mb-4">
				<h3 class="font-semibold mb-2">{$_(`corners.square.type.label`)}</h3>
				<Select bind:value={cornersSquareOptions.type}>
					<option value="">Auto</option>
					<option value="dot">{$_(`corners.square.type.dot`)}</option>
					<option value="square">{$_(`corners.square.type.square`)}</option>
					<option value="extra-rounded">{$_(`corners.square.type.extra-rounded`)}</option>
				</Select>
			</div>
			<div>
				<div class="flex w-full h-full justify-between items-center">
					<h3 class="font-semibold">{$_(`corners.square.color.label`)}</h3>
					<Toggle bind:value={hasColor} />
				</div>
				{#if hasColor}
					<div class="mt-2">
						<InputGradient bind:options={cornersSquareOptions} placeholder={generalOptions?.color} defaultColor={'#000000'} />
					</div>
				{/if}
			</div>
		{/if}
	</Accordion>
</Card>
