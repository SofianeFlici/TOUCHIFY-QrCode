<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import db from '$lib/db';
	import { IconArrowLeaveUp, IconDelete } from 'obra-icons-svelte';
	import { _ } from 'svelte-i18n';

	export let blob: Blob | null = null;
	export let blobUrl: string = '';

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
</script>


<Card>
	<div class="flex flex-col">
		<h2 class="font-semibold m-2 mb-4">Ajouter une image</h2>
		{#if blobUrl == ''}
			<button type="button" class="bg-slate-100 rounded border dark:border-slate-500 h-32 flex flex-col justify-center items-center m-1 dark:bg-slate-600" on:click={triggerFileInput} >
				<IconArrowLeaveUp size={65} color={'#94A3B8'} />
				<input type="file" accept="image/*" class="hidden" on:change={handleFileChange} />
                <input type="hidden" name="blobUrl" bind:value={blobUrl} />
                <p class="text-slate-400 mt-2">{$_('ui.file.load')}</p>
            </button>
		{/if}
		{#if blobUrl != ''}
			<div class="flex">
				<img src={blobUrl} alt="" class="m-4 h-16 w-16 shadow rounded dark:bg-slate-300 p-2" />
				<button type="button" on:click={deleteBlobUrl}><IconDelete size={25} color={'#94A3B8'} /></button>
			</div>
		{/if}
	</div>
</Card>
