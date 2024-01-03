<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import { _ } from 'svelte-i18n';
	import type { Options } from 'qr-code-styling';
	import db from '$lib/db';
	import { IconBookmark, IconServer } from 'obra-icons-svelte';

	export let data: Options;
	export let blob: Blob | null = null;
	export let id: string | null;
	console.log('buttonSave = ', id);

	async function saveOptions() {
		console.log('Button Save saveOption(id) = ', id);

		const numericId = id !== '' ? parseInt(id) : null;

		try {
			if (numericId) {
				// Obtenir les options existantes.
				const opts = await db.options.get(numericId);
				if (!opts) {
					console.error(`No options found with id: ${numericId}`);
					return;
				}

				console.log('opts.image = ', opts.image);

				// Si un blob est fourni, mettez à jour l'image existante ou créez-en une nouvelle si nécessaire.
				if (blob) {
					console.log('saveOptions blob = ', blob);
					let imageId = opts.image;
					console.log('saveOptions imageId = ', imageId);
					if (imageId) {
						// Mise à jour de l'image existante.
						await db.images.update(imageId, {blob});
					} else {
						imageId = await db.images.add({blob});
						data.image = imageId;
					}
				}

				// Mettez à jour les options avec les nouvelles données.
				await db.options.update(numericId, data);
				console.log('Options updated successfully');
			} else {
				// Aucun ID n'est fourni, ajoutez une nouvelle image si un blob est fourni.
				if (blob) {
					const imageId = await db.images.add({blob});
					data.image = imageId;
				}
				// Ajoutez de nouvelles options.
				await db.options.add(data);
				console.log('Options saved successfully');
			}
		} catch (error) {
			console.error('Failed to save options:', error);
		}
	}
</script>

<div class="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 pl-4 pr-4">
	<button
		class="bg-transparent border flex justify-center items-center border-slate-500 hover:border-slate-700 rounded text-slate-500 hover:text-slate-700 font-semibold py-2"
		on:click={saveOptions}
	>
		<IconBookmark size={17} color={'black'} />
		<span class="ml-2 dark:text-slate-300">{$_('menu.save')}</span>
	</button>

	<a
		href="/mylist"
		class="flex justify-center items-center bg-transparent rounded border border-slate-500 hover:border-slate-700 text-slate-500 hover:text-slate-700 font-semibold py-2"
	>
		<IconServer size={17} color={'black'} />
		<span class="ml-2 dark:text-slate-300">{$_('menu.list')}</span>
	</a>
</div>

<style>
</style>
