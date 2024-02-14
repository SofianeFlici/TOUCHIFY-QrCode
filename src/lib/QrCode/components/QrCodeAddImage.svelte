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
		<div class="flex flex-col ">
			{#if blobUrl == '' || blobUrl == undefined}
				<button
					type="button"
					class="border-t-indigo rounded-md text-t-indigo dark:bg-t-dark-gray border-2  h-20 flex flex-col justify-center items-center m-1 dark:text-white dark:border-t-ciel"
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
					<div class="flex">
						<img src={blobUrl} alt="" class="m-4 h-16 w-16 shadow rounded dark:bg-slate-300 p-2" />
						<button type="button" on:click={deleteBlobUrl}
							><IconDelete size={25} color={'#94A3B8'} /></button
						>
					</div>
					<div class="ml-2">
						<div class="flex items-center">
							<input id="checkboxID" type="checkbox" class="hidden" name="hideBackgroundDots" checked={hideBackgroundDots} on:change={toggleHideBackgroundDots} />
							<label for="checkboxID" class="block w-6 h-6  bg-gray-300 rounded-full cursor-pointer border-2 border-gray-400 p-4"></label>
						</div>
						{$_('image.hide.label')}

						<p class="mt-2 mb-2">{$_('image.size.label')}</p>
						<input
							type="number"
							min="0.1"
							max="1"
							step="0.1"
							bind:value={imageSize}
							class="w-16 bg-slate-100 border-2 rounded p-2
				    border-t-indigo h-11 dark:text-slate-300 dark:bg-slate-600 dark:border-slate-500"
						/>

						<p class="mt-2 mb-2">{$_('image.margin.label')}</p>
						<input
							type="number"
							min="0"
							max="60"
							bind:value={imageMargin}
							class="w-44 bg-slate-100 border-2 rounded p-2
				  border-t-indigo h-11 dark:text-slate-300 dark:bg-slate-600 dark:border-slate-500"
						/>
					</div>
				</div>
			{/if}
		</div>
	</Accordion>
</Card>

<style lang="postcss">
    input[type="checkbox"]:checked + label {
        @apply bg-t-indigo border-4 ;
        /* Ajoutez ici l'espace souhaité entre la couleur de fond et la bordure */
        padding: 10px;
    }
</style>