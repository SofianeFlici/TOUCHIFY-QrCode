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
		const file = input.files ? input.files[0] : null;

		if (file) {
			const validExtensions = ['png', 'jpg', 'jpeg', 'svg'];
			const extension = file.name.split('.').pop()?.toLowerCase();
			if (extension && validExtensions.includes(extension)) {
				const reader = new FileReader();
				reader.onload = (e: ProgressEvent<FileReader>) => {
					if (e.target && typeof e.target.result === 'string') {
						blobUrl = e.target.result;
					}
				};
				reader.readAsDataURL(file);
			} else {
				console.error('Type de fichier non supporté.');
				alert($_('error.image'));
			}
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
				class="border-t-indigo rounded-md text-t-indigo dark:bg-t-dark-gray border-2 h-20 flex flex-col justify-center items-center dark:text-white dark:border-t-ciel"
				on:click={triggerFileInput}
			>
				<IconArrowLeaveUp size={35} />
				<input
					type="file"
					accept=".png, .jpg, .jpeg, .svg"
					class="hidden"
					on:change={handleFileChange}
				/>
				<input type="hidden" name="blobUrl" bind:value={blobUrl} />
				<p class=" mt-2 text-xs">{$_('ui.file.load')}</p>
			</button>
		{/if}
		{#if blobUrl != '' && blobUrl != undefined}
		<div class="flex flex-col">
			<div class="flex rounded-md border border-t-indigo justify-center mb-4 dark:border-white dark:bg-t-dark-gray">
				<div class="m-4 h-16 w-16 shadow shadow-slate-300 rounded-md  dark:border-t-ciel dark:bg-slate-300">
					{#if blobUrl}
						<img src={blobUrl} alt="" class="w-full h-full" />
					{/if}
				</div>
				<button type="button" on:click={deleteBlobUrl}
					><IconDelete size={25} color={'#94A3B8'} /></button
				>
			</div>
			<div class="">
				<div class="items-center w-full bg-red-40 mt-4 mb-4">
					<h3 class="font-semibold mb-2">Options d'image</h3>
					<label class="inline-flex items-center cursor-pointer">
						<input
							type="checkbox"
							value=""
							class="sr-only peer"
							checked={hideBackgroundDots}
							on:change={toggleHideBackgroundDots}
						/>
						<div
							class="relative w-10 h-6 border-t-indigo peer-focus:outline-none rounded-full border peer dark:bg-t-black peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[0.175rem] after:start-[0.175rem] after:bg-t-indigo after:peer-checked:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-white peer-checked:bg-t-indigo dark:peer-checked:bg-t-ciel"
						></div>
						<span class="ms-3 text-sm dark:text-gray-300">{$_('image.hide.label')}</span>
					</label>
				</div>
				<div class="mb-4">
					<h3 class="mb-2 font-semibold">{$_('image.size.label')}</h3>
					<input
						type="number"
						min="0.1"
						max="1"
						step="0.1"
						bind:value={imageSize}
						class="w-16 bg-white border rounded-md p-2 text-sm
						border-t-indigo dark:text-white dark:bg-t-black dark:border-white"
					/>
				</div>
				<div class="mb-4">
					<h3 class="mt-2 font-semibold mb-2">{$_('image.margin.label')}</h3>
					<input
						type="number"
						min="0"
						max="60"
						bind:value={imageMargin}
						class="w-44 bg-white border rounded-md p-2 text-sm
					  border-t-indigo dark:text-white dark:bg-t-black dark:border-white"
					/>
				</div>
			</div>
		</div>
		{/if}
	</div>
	</Accordion>
</Card>
