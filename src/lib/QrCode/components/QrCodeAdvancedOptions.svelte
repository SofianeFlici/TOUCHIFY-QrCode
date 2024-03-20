<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import type { Options } from 'qr-code-styling';
	import { _ } from 'svelte-i18n';
	import InputRadioButtons from '$lib/components/InputRadioButtons.svelte';
	import Accordion from '$lib/components/Accordion.svelte';

	export let qrOptions: Options['qrOptions'];

	let title: string = `qr.title`;
	let styles = ['L', 'M', 'Q', 'H'] as const;
	let modes = ['Byte'] as const;

	// Mode enlevé pour l'instant 'Numeric', 'Alphanumeric', 'Kanji'
</script>

<Card>
	<Accordion {title}>
		{#if qrOptions}
			<div class="flex flex-col">
				<h3 class="font-semibold mb-2">{$_('qr.type.label')}</h3>
				<div>
					<input
						type="number"
						bind:value={qrOptions.typeNumber}
						min="0"
						max="40"
						class="text-black text-sm rounded-md mt-2 mb-2 border border-t-indigo p-2 placeholder-black w-full dark:bg-t-black dark:text-white dark:border-white"
					/>
				</div>
				<h3 class="font-semibold mb-2">Precision</h3>
				<InputRadioButtons
					bind:value={qrOptions.errorCorrectionLevel}
					text={(styles) => styles}
					options={styles}
				></InputRadioButtons>
				<!-- <InputRadioButtons bind:value={qrOptions.mode} text={(modes) => modes} options={modes}
				></InputRadioButtons> -->
			</div>
		{/if}
	</Accordion>
</Card>
