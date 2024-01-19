<script lang="ts">
	// j'import ma db
	import db, { type QrCodeItem } from '$lib/db.js';
	// j'import le onMount : qui est un hook qui permet d'executer une fonction au chargement de la page
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';

	let items: QrCodeItem[] = [];

	onMount(async () => {
		try {
			items = await db.options.toArray();
		} catch (error) {
			console.error('Failed to load options:', error);
		}
	});

</script>

<div class="bg-red-400 h-52 w-full mt-4">
	<a href="/" class="border-slate-800 border-2 rounded-md text-slate-800 text-sm font-semibold p-2">
		{$_('back')}
	</a>
	<div class="bg-yellow-400 mt-4">
		{#each items as item, i}
			<div class="mt-2 bg-blue-400">
				<div class="w-full bg-white rounded flex">
					<div class="flex-col px-4 py-1">
						<a class="text-sm font-semibold" href={`/qr?id=${item.id}`}>
							{item.options.data}
						</a>
						<p class="text-xs mt-2 mb-2">
							{item.type} · {item.date.toLocaleDateString()}
						</p>
					</div>

					<div class="flex justify-end content-end">
						<p>Edit</p>
						<p>Delete</p>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
