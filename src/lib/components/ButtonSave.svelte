<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import { _ } from 'svelte-i18n';
	import type { Options } from 'qr-code-styling';
	import db from '$lib/db';
	import { IconBookmark, IconServer } from 'obra-icons-svelte';

	export let data: Options;
	export let blob: Blob | null = null;

	async function saveOptions() {
		try {
			if (blob){
				const imageId = await db.images.add(blob);
				data.image = imageId;
			}
			await db.options.add(data);
			console.log('Options saved successfully');
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
