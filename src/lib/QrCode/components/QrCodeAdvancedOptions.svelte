<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import InputRadioButton from '$lib/components/InputRadioButton.svelte';
	import type { Options } from 'qr-code-styling';
	import { _ } from 'svelte-i18n';
	import InputRadioButtons from '$lib/components/InputRadioButtons.svelte';

	export let qrOptions: Options['qrOptions'];

	let styles = ['L', 'M', 'Q', 'H'] as const;
	let modes = ['Numeric', 'Alphanumeric', 'Byte', 'Kanji'] as const;
</script>

<Card>
	{#if qrOptions}
		<div class="flex flex-col">
			<h2 class="font-semibold m-1 mb-2">{$_('qr.title')}</h2>
			<p class="font-semibold text-sm m-1">{$_('qr.type.label')}</p>
			<div>
				<input
					type="number"
					bind:value={qrOptions.typeNumber}
					min="0"
					max="40"
					class="text-black text-sm rounded mt-3 mb-3 border bg-slate-100 p-2 placeholder-black w-44 dark:bg-slate-600 dark:text-white dark:border-slate-500"
				/>
			</div>
			<InputRadioButtons
				bind:value={qrOptions.errorCorrectionLevel}
				text={(styles) => styles}
				options={styles}
			></InputRadioButtons>
                <InputRadioButtons
				bind:value={qrOptions.mode}
				text={(modes) => modes}
				options={modes}
			></InputRadioButtons>
		</div>
	{/if}
</Card>
