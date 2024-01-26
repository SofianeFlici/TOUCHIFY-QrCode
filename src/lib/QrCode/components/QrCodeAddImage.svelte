<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import { IconArrowLeaveUp, IconDelete } from 'obra-icons-svelte';
	import { _ } from 'svelte-i18n';
	import type { Options } from 'qr-code-styling';
	import Accordion from '$lib/components/Accordion.svelte';

	export let imageOptions: Options['imageOptions'];

	export let blob: Blob | null = null;
	export let blobUrl: string = '';

	let title: string = `image.title`;
	let hideBackgroundDots: boolean = true;
	let imageSize: number = 0.5;
	let imageMargin: number = 10;

	function toggleHideBackgroundDots() {
		hideBackgroundDots = !hideBackgroundDots;
		if (imageOptions) {
			imageOptions.hideBackgroundDots = hideBackgroundDots;
		}
	}

	function handleFileChange(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files[0]) {
			const file = input.files[0];
			blob = new Blob([file], { type: file.type });

			const newBlobUrl = URL.createObjectURL(blob);
			blobUrl = newBlobUrl;
		}
	}

	function triggerFileInput() {
		const input = document.querySelector('input[type="file"]') as HTMLInputElement;
		if (input) {
			input.click();
		}
	}

	function deleteBlobUrl() {
		URL.revokeObjectURL(blobUrl);
		blobUrl = '';
		blob = null;
	}

	$: if (imageOptions && imageOptions.imageSize && imageOptions.margin) {
		imageOptions = {
			hideBackgroundDots: hideBackgroundDots,
			margin: imageMargin,
			imageSize: imageSize
		};
	} else {
		if (imageOptions) {
			imageOptions.hideBackgroundDots = hideBackgroundDots;
			imageOptions.margin = imageMargin;
			imageOptions.imageSize = imageSize;
		}
	}
</script>

<Card>
	<Accordion {title}>
		<div class="flex flex-col">
			{#if blobUrl == '' || blobUrl == undefined}
				<button
					type="button"
					class="bg-slate-100 rounded border dark:border-slate-500 h-32 flex flex-col justify-center items-center m-1 dark:bg-slate-600"
					on:click={triggerFileInput}
				>
					<IconArrowLeaveUp size={65} color={'#94A3B8'} />
					<input type="file" accept="image/*" class="hidden" on:change={handleFileChange} />
					<input type="hidden" name="blobUrl" bind:value={blobUrl} />
					<p class="text-slate-400 mt-2">{$_('ui.file.load')}</p>
				</button>
			{/if}
			{#if blobUrl != '' && blobUrl != undefined}
				<div class="flex flex-col">
					<div class="flex">
						<img src={blobUrl} alt="" class="m-4 h-16 w-16 shadow rounded dark:bg-slate-300 p-2" />
						<button type="button" on:click={deleteBlobUrl}
							><IconDelete size={25} color={'#94A3B8'} /></button
						>
					</div>
					<div class="ml-2">
						<input
							type="checkbox"
							name="hideBackgroundDots"
							checked={hideBackgroundDots}
							on:change={toggleHideBackgroundDots}
							class="m-1"
						/>
						{$_('image.hide.label')}

						<p class="mt-2 mb-2">{$_('image.size.label')}</p>
						<input
							type="number"
							min="0.1"
							max="1"
							step="0.1"
							bind:value={imageSize}
							class="w-16 bg-slate-100 border rounded p-2
				  border-slate-200 h-11 dark:text-slate-300 dark:bg-slate-600 dark:border-slate-500"
						/>

						<p class="mt-2 mb-2">{$_('image.margin.label')}</p>
						<input
							type="number"
							min="0"
							max="60"
							bind:value={imageMargin}
							class="w-44 bg-slate-100 border rounded p-2
				  border-slate-200 h-11 dark:text-slate-300 dark:bg-slate-600 dark:border-slate-500"
						/>
					</div>
				</div>
			{/if}
		</div>
	</Accordion>
</Card>
