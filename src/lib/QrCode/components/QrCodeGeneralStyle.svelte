<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import InputColor from '$lib/components/InputColor.svelte';
	import type { Options } from 'qr-code-styling';
	import { _ } from 'svelte-i18n';
	import InputRadioButtons from '$lib/components/InputRadioButtons.svelte';
	import InputGradient from '$lib/components/InputGradient.svelte';
	export let dotsOptions: Options['dotsOptions'];
	export let backgroundOptions: Options['backgroundOptions'];

	let style = ['square', 'rounded', 'dots', 'classy', 'classy-rounded', 'extra-rounded'] as const;
	let transparent = true;
	let gradient = false;
</script>

<Card>
	{#if dotsOptions}
		<div class="flex flex-col ">
			<h2 class="font-semibold m-1 mb-2">{$_('options.title')}</h2>
			<p class="font-semibold m-1">{$_('dots.type.label')}</p>
			<InputRadioButtons
				bind:value={dotsOptions.type}
				text={(style) => $_(`dots.type.${style}`)}
				options={style}
			></InputRadioButtons>
			<div>
				<p class="font-semibold m-1">{$_('dots.color.label')}</p>
				<InputColor bind:value={dotsOptions.color} />
			</div>
			<div>
				<input
					type="checkbox"
					value="transparent"
					on:click={() => (transparent = !transparent)}
					checked={transparent}
					class="m-1"
				/>{$_('ui.color.transparent')}
			</div>
			{#if !transparent}
				<div>
					{#if backgroundOptions}
						<InputColor bind:value={backgroundOptions.color} />
					{/if}
				</div>
				<div>
					<input
						type="checkbox"
						value="degrade"
						on:click={() => (gradient = !gradient)}
						checked={gradient}
						class="m-1"
					/>{$_('ui.gradient.use')}
				</div>
			{/if}
			{#if gradient && !transparent && backgroundOptions}
			<div class='flex'>
				<InputGradient bind:color1={backgroundOptions.gradient} bind:color2={backgroundOptions.gradient} />
			</div>
			{/if}
		</div>
	{/if}
</Card>
