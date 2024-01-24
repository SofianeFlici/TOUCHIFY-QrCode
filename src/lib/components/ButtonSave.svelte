<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { Options } from 'qr-code-styling';
	import db from '$lib/db';
	import { IconBookmark, IconServer } from 'obra-icons-svelte';
	import type { QrCodeData } from '$lib/QrCode/qrcode.data';

	export let data: QrCodeData;
	export let options: Options;
	export let blob: Blob | null = null;
	export let id: string | null;
	export let defaultContent: string;

	$: console.log('buttonSave defaultContent', defaultContent);

	async function saveOptions() {
		const numericId = id ? parseInt(id) : null;

		const item = {
			type: defaultContent,
			date: new Date(),
			data: data,
			options: options,
			image: blob
		};

		try {
			if (numericId) {
				// Obtenir les options existantes.
				const dbItem = await db.options.get(numericId);
				if (!dbItem) {
					console.error(`No options found with id: ${numericId}`);
					return;
				}

				// Mettez à jour les options avec les nouvelles données.
				await db.options.update(numericId, item);
				console.log('Options updated successfully');
			} else {
				// Ajoutez de nouvelles options.
				await db.options.add(item);
				console.log('Options saved successfully');
			}
		} catch (error) {
			console.error('Failed to save options:', error);
		}
	}
</script>

<div class="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 pl-4 pr-4 text-slate-500 dark:text-slate-300">
	<button
		type="button"
		class="bg-transparent border flex justify-center items-center border-slate-500 hover:border-slate-700 rounded  hover:text-slate-700 font-semibold py-2"
		on:click={saveOptions}
	>
		<IconBookmark size={16}  />
		<span class="ml-2">{$_('menu.save')}</span>
	</button>

	<a
		href="/mylist"
		class="flex justify-center items-center bg-transparent rounded border border-slate-500 hover:border-slate-700  hover:text-slate-700 font-semibold py-2"
	>
		<IconServer size={16} />
		<span class="ml-2">{$_('menu.list')}</span>
	</a>
</div>

<style>
</style>
