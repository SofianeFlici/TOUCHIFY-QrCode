<script lang="ts">
	import db, { type QrCodeItem } from '$lib/db.js';
	import { onMount } from 'svelte';
	import { ListQrCodeDataType } from '$lib/QrCode/qrcode.data';
	import { displayConfig } from '$lib/QrCode/qrcode.data';
	import { _ } from 'svelte-i18n';

	let qrCodeData: any[] = [];
	let qrCodeElements: HTMLElement[] = [];
	let types = ListQrCodeDataType();

	onMount(async () => {
		try {
			const items = await db.options.toArray();
			
			items.forEach(async (data, index) => {
				const { default: QRCodeStyling } = await import('qr-code-styling');
				const qrCode = new QRCodeStyling(data.options);
				qrCode.append(qrCodeElements[index]);
			});
			
			qrCodeData = items;
			console.log("test ---- QrCodeData ------------",qrCodeData);
			console.log("test ----------------",qrCodeData);
		} catch (error) {
			console.error('Failed to load options:', error);
		}
	});
	
</script>

<div
	class="w-full flex justify-center flex-col-reverse items-center p-4
			sm:px-20 sm:pb-20
			"
>
	{#if qrCodeData.length === 0}
		<p class="text-t-indigo text-center dark:text-white">
			No QR codes found
		</p>
	{/if}
	{#each qrCodeData as data , index}
		<a href={`/mylist/qr?id=${data.id}`} class="w-full">
			<div class="flex w-full  rounded-md mb-4 bg-white
						dark:bg-t-black p-4">
				<div class="w-[100px] shrink-0
							sm:w-[120px]">
					<div
						class="qr-preview bg-white aspect-square p-4 rounded-md
								"
						bind:this={qrCodeElements[index]}
					></div>
				</div>
				<div class="flex flex-col overflow-hidden flex-grow justify-center text-t-indigo ml-6
				dark:text-t-ciel">
				<div class="flex truncate">
					{#if data.type in displayConfig }
					{#each displayConfig[data.type] as {key, label}}
					<p class="font-bold text-sm mb-2">	
						{$_(`qrLabel.${label}`)} : {data.data[key]}&nbsp;
								</p>
							{/each}
						{/if}
					</div>
					<p class="text-xs">
						&bull; {data.type}
					</p>

					<p class="text-xs">
						&bull; {qrCodeData[index].date.toLocaleDateString()}
					</p>
				</div>
				<div class="">
					<span class="h-full flex items-center text-t-indigo p-2 shrink-0
								dark:text-t-ciel">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="32"
							height="32"
							fill="currentColor"
							viewBox="0 0 256 256"
							><path
								d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"
							></path></svg
						>
					</span>
				</div>
			</div>
		</a>
	{/each}
</div>

<style>
	.qr-preview > :global(canvas) {
		width: 100%;
		height: 100%;
	}
</style>
