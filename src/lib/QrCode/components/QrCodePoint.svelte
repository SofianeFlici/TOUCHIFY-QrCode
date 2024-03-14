<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import { _ } from 'svelte-i18n';
	import InputGradient from '$lib/components/InputGradient.svelte';
	import Accordion from '$lib/components/Accordion.svelte';
	import Select from '$lib/components/Select.svelte';
	import type { ColorOptions } from '../qrcode.data';
	import Toggle from '$lib/components/Toggle.svelte';

	export let cornersDotOptions: ColorOptions;
	export let generalOptions: ColorOptions;

	let title: string = `corners.dot.title`;
	let types = [undefined, 'square', 'dot'] as const;
	let hasColor = cornersDotOptions?.color || cornersDotOptions?.gradient;

	$: if (!hasColor) {
		cornersDotOptions.color = undefined;
		cornersDotOptions.gradient = undefined;
	}
</script>

<Card>
	<Accordion {title} open={true}>
		{#if cornersDotOptions}
			<div class="flex flex-col mb-4">
				<h3 class="font-semibold mb-2">{$_('corners.dot.type.label')}</h3>
				<Select bind:value={cornersDotOptions.type}>
					{#each types as type}
						<option value={type}>{$_(`corners.square.type.${type}`)}</option>
					{/each}
				</Select>
			</div>
			<div>
				<div class="flex w-full h-full justify-between items-center">
					<h3 class="font-semibold">{$_('corners.dot.color.label')}</h3>
					<Toggle bind:value={hasColor} />
				</div>
				{#if hasColor}
					<div class="mt-2">
						<InputGradient bind:options={cornersDotOptions} placeholder={generalOptions?.color} defaultColor={'#000000'}/>
					</div>
				{/if}
			</div>
		{/if}
	</Accordion>
</Card>
