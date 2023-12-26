<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import InputColor from '$lib/components/InputColor.svelte';
	import InputRadioButton from '$lib/components/InputRadioButton.svelte';
	import type { Options } from 'qr-code-styling';
	import { _ } from 'svelte-i18n';
	import InputRadioButtons from '$lib/components/InputRadioButtons.svelte';
	export let cornersSquareOptions: Options['cornersSquareOptions'];

	let types = [undefined,'dot', 'square', 'extra-rounded'] as const;
</script>

<Card>
	{#if cornersSquareOptions}
		<div class="flex flex-col">
			<h2 class="font-semibold m-1 mb-2">{$_(`corners.square.title`)}</h2>
			<p class="font-semibold m-1">{$_(`corners.square.type.label`)}</p>
			<InputRadioButtons
				bind:value={cornersSquareOptions.type}
				text={(types) => $_(`corners.square.type.${types}`)}
				options={types}
			></InputRadioButtons>
			<div>
				<p class="font-semibold m-1">
					{$_(`corners.square.color.label`)}
					<InputColor bind:value={cornersSquareOptions.color} />
				</p>
			</div>
		</div>
	{/if}
</Card>
