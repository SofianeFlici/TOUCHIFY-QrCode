<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import InputColor from '$lib/components/InputColor.svelte';
	import InputRadioButton from '$lib/components/InputRadioButton.svelte';
	import InputRadioButtons from '$lib/components/InputRadioButtons.svelte';
	import type { Options } from 'qr-code-styling';
	import { _ } from 'svelte-i18n';

	export let cornersDotOptions: Options['cornersDotOptions'];

	let types = [undefined, 'square', 'dot'] as const;
</script>

<Card>
	{#if cornersDotOptions}
		<div class="flex flex-col">
			<h2 class="font-semibold m-1 mb-2">{$_('corners.dot.title')}</h2>
			<p class="font-semibold m-1">{$_('corners.dot.type.label')}</p>
			<InputRadioButtons
				bind:value={cornersDotOptions.type}
				text={(types) => $_(`corners.square.type.${types}`)}
				options={types}
			></InputRadioButtons>
			<div>
				<p class="font-semibold m-1">{$_('corners.dot.color.label')}</p>
				<InputColor bind:value={cornersDotOptions.color} />
			</div>
		</div>
	{/if}
</Card>
