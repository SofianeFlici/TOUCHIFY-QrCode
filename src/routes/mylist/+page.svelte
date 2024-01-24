<script lang="ts">
	// j'import ma db
	import db, { type QrCodeItem } from '$lib/db.js';
	// j'import le onMount : qui est un hook qui permet d'executer une fonction au chargement de la page
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	import { ListQrCodeDataType } from '$lib/QrCode/qrcode.data';

	let items: QrCodeItem[] = [];
	let options:any = [];
	let types = ListQrCodeDataType();

	onMount(async () => {
		try {
			items = await db.options.toArray();
			options = items.map((item) => {
				return {
					item: item,
					icon: types.find((type) => type.type === item.type)?.icon
				};
			});
		} catch (error) {
			console.error('Failed to load options:', error);
		}
	});


</script>

<div class="h-52 w-full mt-4">
	<a
		href="/"
		class="border-slate-800 rounded-md  text-xs font-semibold p-2 m-2  dark:border-slate-200 dark:hover:text-slate-500"
	>
		{$_('back')}
	</a>
	<h1 class=" font-semibold m-4 mb-8 ">{$_('saved.title')}</h1>
	<div class=" mt-4">
		{#each options as option, i}
			<div class="mt-2 m-4 ">
				<a  href={`/qr?id=${option.item.id}`} class="">
					<div class="w-full bg-white rounded flex dark:bg-slate-800 ">
						<p class="p-4"><svelte:component this={option.icon} size={30} /></p>
						<div class="flex-col px-4 py-2">
							<p class="text-sm font-semibold ">
								{option.item.options.data}
							</p>

							<p class="text-xs mt-2 mb-2 ">
								{option.item.type} · {option.item.date.toLocaleDateString()}
							</p>
						</div>

						<div class="flex justify-end items-center w-full mr-4">
							<p class="font-bold ">></p>
						</div>
					</div>
				</a>
			</div>
		{/each}
	</div>
</div>
