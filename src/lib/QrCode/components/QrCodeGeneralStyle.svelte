<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import { _ } from 'svelte-i18n';
	import InputGradient from '$lib/components/InputGradient.svelte';
	import Select from '$lib/components/Select.svelte';
	import Toggle from '$lib/components/Toggle.svelte';
	import type { ColorOptions } from '../qrcode.data';
	import Accordion from '$lib/components/Accordion.svelte';

	export let dotsOptions: ColorOptions;
	export let backgroundOptions: ColorOptions;


	let style = ['square', 'rounded', 'dots', 'classy', 'classy-rounded', 'extra-rounded'] as const;
	let transparent = backgroundOptions?.color;
	$: if(!transparent){
		backgroundOptions.color = undefined;
		backgroundOptions.gradient = undefined;
	}
</script>

<Card>
	<Accordion title={$_('options.title')} open={true}>
		{#if dotsOptions}
			<div class="flex flex-col h-full">
				<div class="mb-4">
					<h3 class="font-semibold mb-2">{$_('dots.type.label')}</h3>
					<Select bind:value={dotsOptions.type}>
						{#each style as style}
							<option value={style}>{$_(`dots.type.${style}`)}</option>
						{/each}
					</Select>
				</div>
				<h3 class="font-semibold mb-2">{$_('dots.color.label')}</h3>
				<InputGradient bind:options={dotsOptions} 
				defaultColor='#000000' />
				<div class="mt-4">
					<div class="flex w-full h-full justify-between items-center">
					<h3 class="font-semibold">{$_('background.color.label')}</h3>
						<Toggle bind:value={transparent} />
					</div>
				</div>
				{#if transparent && backgroundOptions}
				<h3 class="font-semibold mb-2 mt-2">{$_('dots.color.label')}</h3>
					<div>
						<InputGradient
						bind:options={backgroundOptions}
						defaultColor='#ffffff'
					/>
					</div>
				{/if}

			</div>
		{/if}
	</Accordion>
</Card>
