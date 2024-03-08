<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import type { Options } from 'qr-code-styling';
	import { _ } from 'svelte-i18n';
	import InputGradient from '$lib/components/InputGradient.svelte';
	import Select from '$lib/components/Select.svelte';
	import Toggle from '$lib/components/Toggle.svelte';

	export let dotsOptions: Options['dotsOptions'];
	export let backgroundOptions: Options['backgroundOptions'];

	console.log("bg options", backgroundOptions);

	let backgroundGradient: boolean = false;
	let dotsColor: string = '#000000';
	let dotsColor2: string = '#ffffff';
	let backgroundColor: string = '#ffffff';

	let style = ['square', 'rounded', 'dots', 'classy', 'classy-rounded', 'extra-rounded'] as const;
	let transparent = !backgroundOptions?.color;

		$:if (transparent) backgroundOptions.color = null;
		else backgroundOptions.color = backgroundColor;

	function toggleBackgroundGradient() {
		backgroundGradient = !backgroundGradient;
		if (backgroundGradient) transparent = false;
	}
$:console.log("--------------------------------", transparent);
</script>

<Card>
	{#if dotsOptions}
		<div class="flex flex-col h-full">
			<h2 class="font-semibold mb-2">{$_('options.title')}</h2>
			<div class="mb-4">
				<h3 class="font-semibold mb-2">{$_('dots.type.label')}</h3>
				<Select bind:value={dotsOptions.type}>
					{#each style as style}
						<option value={style}>{$_(`dots.type.${style}`)}</option>
					{/each}
				</Select>
			</div>
			<InputGradient
					bind:options={dotsOptions}
					bind:transparent={transparent}
					{backgroundGradient}
					allowTransparent={false}
				/>

			<div class="mt-4">
				<h3 class="font-semibold mb-2">{$_('background.color.label')}</h3>
				<div class="flex items-center">
					<!-- <label class="inline-flex items-center cursor-pointer">
						<input
							type="checkbox"
							value=""
							class="sr-only peer"
							checked={!transparent}
							on:click={() => toggleTransparent()}
						/>
						<div
							class="relative w-10 h-6 border-t-indigo peer-focus:outline-none rounded-full border peer dark:bg-t-black peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[0.175rem] after:start-[0.175rem] after:bg-t-indigo after:peer-checked:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-white peer-checked:bg-t-indigo dark:peer-checked:bg-t-ciel"
						></div>
						<span class="ms-3 text-sm dark:text-gray-300">{$_('image.hide.label')}</span>
					</label> -->
				
					<Toggle bind:value={transparent} text={'ui.color.transparent'} />
				</div>
			</div>
			<!-- -------------------- Partie dégradé --------------------------------------- -->
			{#if !transparent && backgroundOptions}
				<div>
					{#if backgroundOptions && !backgroundGradient && !transparent}
					<InputGradient
					bind:color1={dotsColor}
					bind:color2={dotsColor2}
					bind:options={backgroundOptions}
					bind:transparent={transparent}
					{backgroundGradient}
					allowTransparent={true}
				/>
					{/if}
				</div>
			{/if}

		</div>
	{/if}
</Card>
