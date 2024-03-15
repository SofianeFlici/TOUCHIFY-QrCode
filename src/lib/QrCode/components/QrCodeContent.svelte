<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import { ListQrCodeDataType, type QrCodeDataType } from '../qrcode.data';

	import {
		generateVCard,
		generateEmail,
		generatePhone,
		generateSms,
		generateWifi,
		generateUrl,
		generateGeo,
		generateEvent
	} from '../qrcode.data';
	import InputContent from '$lib/components/inputContent.svelte';

	import { _ } from 'svelte-i18n';
	import type { Options } from 'qr-code-styling';
	import { onMount } from 'svelte';

	export let defaultContent: string;
	export let data: any = {};
	export let options: Options;
	export let optionsType: string;

	let visible: boolean = false;

	const data_types = ListQrCodeDataType();

	let currentIcon: any = null;

	$:if ( optionsType !== '' ){
		defaultContent = optionsType;
		visible = true;
	} else {
		defaultContent = 'URL';
	}

	$: {
		const selectedType = data_types.find((dt) => dt.type === defaultContent);
		currentIcon = selectedType ? selectedType.icon : null;
	}

	onMount(() => {
		const selected_type =
			data_types.find((dataType) => dataType.type === defaultContent) ?? data_types[0];
		selectType(selected_type);
	});

	$: switch (defaultContent) {
		case 'URL':
			options.data = generateUrl(data);

			break;
		case 'Email':
			options.data = generateEmail(data);
			break;
		case 'SMS':
			options.data = generateSms(data);
			break;
		case 'Phone':
			options.data = generatePhone(data);
			break;
		case 'Wifi':
			options.data = generateWifi(data);
			break;
		case 'Contact':
			options.data = generateVCard(data);
			break;
		case 'Geo':
			options.data = generateGeo(data);
			break;
		case 'Event':
			options.data = generateEvent(data);
			break;
	}

	function selectType(data_type: QrCodeDataType) {
		defaultContent = data_type.type;
		data = { ...data_type.data };
		visible = false;
	}

</script>

<Card>
	<h2 class="font-semibold mb-2">{$_('data.title')}</h2>
	<div class="flex flex-col ">
		{#if data_types}
			<div class="flex-wrap justify-between">
				{#each data_types as data_type}
					<button
						type="button"
						class="mr-2 mb-2 border-t-indigo border rounded-md text-[10px] p-1 hover:bg-t-ciel hover:border-t-ciel hover:text-white dark:border-white
						{defaultContent === data_type.type && visible
							? 'bg-t-indigo text-white dark:bg-t-ciel dark:text-black'
							: 'bg-white text-t-indigo dark:bg-t-black dark:text-white'}"
						value={data_type.type}
						on:click={() => selectType(data_type)}
						on:click={() => (visible = !visible)}
					>
						<div class="flex items-center">
							<svelte:component this={data_type.icon} size={16} />
							<p class="text-sm mr-1 ml-2">{data_type.type}</p>
						</div>
					</button>
				{/each}
			</div>
		{/if}
		<div>
			{#if visible == true}
				{#if defaultContent == 'URL'}
					<InputContent bind:value={data.url} />
				{/if}
				{#if defaultContent == 'Email'}
					<InputContent bind:value={data.email}  />
					<InputContent bind:value={data.subject} />
				{/if}
				{#if defaultContent == 'SMS'}
					<InputContent bind:value={data.number}  />
					<InputContent bind:value={data.message}  />
				{/if}
				{#if defaultContent == 'Phone'}
					<InputContent bind:value={data.number} />
				{/if}
				{#if defaultContent == 'Wifi'}
					<InputContent bind:value={data.ssid} />
					<InputContent bind:value={data.typeWifi}  />
					<InputContent bind:value={data.password}  />
					<div class="flex mt-3 mb-3 w-full text-t-indigo">
						<input
							type="checkbox"
							class="accent-current text-t-indigo text-sm  border border-t-indigo rounded-md"
							bind:checked={data.hidden}
							
						/>
						<span class="ml-2 text-t-indigo">reseau masqué</span>	
					</div>
					
				{/if}
				{#if defaultContent == 'Contact'}
					<div class="flex w-full justify-between">
						<div class="flex flex-col flex-grow mr-2">
							<InputContent bind:value={data.firstname}  />
							<InputContent bind:value={data.company}  />
							<InputContent bind:value={data.email} />
						</div>
						<div class="flex flex-col flex-grow">
							<InputContent bind:value={data.lastname}  />
							<InputContent bind:value={data.jobTitle}  />
							<InputContent bind:value={data.phone}  />
						</div>
					</div>
					<InputContent bind:value={data.url}  />
				{/if}
				{#if defaultContent == 'Geo'}
					<InputContent bind:value={data.latitude}  />
					<InputContent bind:value={data.longitude}  />
				{/if}
				{#if defaultContent == 'Event'}
					<InputContent bind:value={data.title} />
					<InputContent nameType="date" bind:value={data.dstart}  />
					<InputContent nameType="date" bind:value={data.dend} />
				{/if}
			{/if}
		</div>
	</div>
</Card>