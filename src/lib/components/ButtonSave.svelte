<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { Options } from 'qr-code-styling';
	import db from '$lib/db';
	import { IconBookmark, IconServer } from 'obra-icons-svelte';
	import { darkMode } from '$lib/utils/darkMode';

	export let data: Options;
	export let blob: Blob | null = null;
	export let id: string | null;
	export let defaultContent: string;

	$:console.log('buttonSave defaultContent', defaultContent);

	let object = {
	}

	let color = "blue";
	
	$: if (darkMode) {
		color = "white";
	}

	async function saveOptions() {

		const numericId = id !== '' ? parseInt(id) : null;

		object = {
			Type: defaultContent,
			date: new Date(),
			options: data,
			image: blob
		}

		try {
			if (numericId) {
				// Obtenir les options existantes.
				const opts = await db.options.get(numericId);
				if (!opts) {
					console.error(`No options found with id: ${numericId}`);
					return;
				}

				// Si un blob est fourni, mettez à jour l'image existante ou créez-en une nouvelle si nécessaire.
				if (blob) {
					let imageId = opts.image;
					if (typeof imageId === 'number') {
						// Mise à jour de l'image existante.
						await db.images.update(imageId, { blob });
					} else {
						imageId = await db.images.add({ blob });
						data.image = imageId;
					}
				}

				// Mettez à jour les options avec les nouvelles données.
				await db.options.update(numericId, data);
				console.log('Options updated successfully');
			} else {
				// Aucun ID n'est fourni, ajoutez une nouvelle image si un blob est fourni.
				if (blob) {
					const imageId = await db.images.add({ blob });
					data.image = imageId;
				}
				// Ajoutez de nouvelles options.
				await db.options.add(object);
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
		<IconBookmark size={16}  />
		<span class="ml-2 dark:text-slate-300">{$_('menu.save')}</span>
	</button>

	<a
		href="/mylist"
		class="flex justify-center items-center bg-transparent rounded border border-slate-500 hover:border-slate-700 text-slate-500 hover:text-slate-700 font-semibold py-2"
	>
		<IconServer size={16} />
		<span class="ml-2 dark:text-slate-300">{$_('menu.list')}</span>
	</a>
</div>

<style>
</style>
