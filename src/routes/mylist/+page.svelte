<script lang="ts">
	import db, { type QrCodeItem } from '$lib/db.js';
	import { onMount } from 'svelte';
	import { ListQrCodeDataType } from '$lib/QrCode/qrcode.data';

	let qrCodeData: any[] = [];
	let qrCodeElements: HTMLElement[] = []; // This will store references to the DOM elements
	let types = ListQrCodeDataType();

	onMount(async () => {
		try {
			const qrCodeDataTemp = [];
			const items = await db.options.toArray();
			for (const item of items) {
				console.log(item);
				qrCodeDataTemp.push({
					type: item.type,
					id: item.id,
					options: item.options,
					date: item.date,
					icon: types.find((type) => type.type === item.type)?.icon || ''
				});
			}

			const { default: QRCodeStyling } = await import('qr-code-styling');

			qrCodeDataTemp.forEach(async (data, index) => {
				const { default: QRCodeStyling } = await import('qr-code-styling');
				const qrCode = new QRCodeStyling(data.options);
				qrCode.append(qrCodeElements[index]);
			});

			qrCodeData = qrCodeDataTemp;
			console.log(qrCodeData);
		} catch (error) {
			console.error('Failed to load options:', error);
		}
	});
</script>

<div
	class="w-full flex justify-center flex-col items-center p-4
			sm:px-20 sm:pb-20
			lg:pr-40 lg:pl-40 lg:pb-40"
>

	{#each qrCodeData as _, index}
		<a href={`/mylist/qr?id=${qrCodeData[index].id}`} class="w-full">
			<div class="flex w-full  rounded-md mb-4 bg-white">
				<div class="w-[100px] shrink-0
							sm:w-[120px]">
					<div
						class="qr-preview bg-white aspect-square p-4 rounded-md
								"
						bind:this={qrCodeElements[index]}
					></div>
				</div>
				<div class=" flex flex-col overflow-hidden flex-grow justify-center text-t-indigo ">
					<p class="font-bold text-sm truncate mb-2">
						{qrCodeData[index].options.data}
					</p>
					<p class="text-xs">
						&bull; {qrCodeData[index].type}
					</p>

					<p class="text-xs">
						&bull; {qrCodeData[index].date.toLocaleDateString()}
					</p>
				</div>
				<div class="">
					<span class="h-full flex items-center text-t-indigo p-2 shrink-0">
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
