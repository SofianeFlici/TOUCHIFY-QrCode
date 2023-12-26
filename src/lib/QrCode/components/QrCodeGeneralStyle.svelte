<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import InputColor from '$lib/components/InputColor.svelte';
	import type { Options } from 'qr-code-styling';
	import { _ } from 'svelte-i18n';
	import InputRadioButtons from '$lib/components/InputRadioButtons.svelte';
	export let dotsOptions: Options['dotsOptions'];
	export let backgroundOptions: Options['backgroundOptions'];

	let style = ['square', 'rounded', 'dots', 'classy', 'classy-rounded', 'extra-rounded'] as const;
	let transparent = true;
	let degrade = false;
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
				<input
					type="checkbox"
					value="degrade"
					on:click={() => (degrade = !degrade)}
					checked={degrade}
					class="m-1"
				/>{$_('ui.gradient.use')}
			{/if}
		</div>
	{/if}
</Card>
