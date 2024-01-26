<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import InputRadioButton from '$lib/components/InputRadioButton.svelte';
	import { ListQrCodeDataType, type QrCodeData, type QrCodeDataType } from '../qrcode.data';
	import { IconChevronUp, IconChevronDown } from 'obra-icons-svelte';

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

	export let defaultContent = 'URL';
	export let data: any = {};
	export let options: Options;

	let visible = false;

	const data_types = ListQrCodeDataType();

	let currentIcon: any = null;

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
	<h1 class="font-semibold mb-2">{$_('data.title')}</h1>
	<button type="button" value={defaultContent} class="mb-2" on:click={() => (visible = !visible)}>
		<div class="flex  items-center">
			{#if currentIcon}
			<svelte:component this={currentIcon} size={16} />
			{/if}
			<p class="text-sm mr-1 ml-2">{defaultContent}</p>
			{#if visible}
				<IconChevronUp size={16} />
			{:else}
				<IconChevronDown size={16} />
			{/if}
		</div>
	</button>
	<div class="grid grid-cols-4 gap-2">
		{#if visible == true}
			{#each data_types as data_type}
				<InputRadioButton on:click={() => selectType(data_type)}>
					<div class="flex flex-col justify-center items-center">
						<p
							class="mb-2 mt-2 h-14 justify-around flex flex-col align-middle items-center text-center text-black dark:text-slate-300 dark:hover:dark:text-slate-300"
						>
							<svelte:component this={data_type.icon} size={16} />
							{data_type.type}
						</p>
					</div>
				</InputRadioButton>
			{/each}
		{/if}
	</div>
	{#if visible == false}
		{#if defaultContent == 'URL'}
			<InputContent bind:value={data.url} />
		{/if}
		{#if defaultContent == 'Email'}
			<label for="email" class="font-semibold">{$_('data.email.address')}</label>
			<InputContent bind:value={data.email} />
			<label for="email" class="font-semibold">{$_('data.email.subject')}</label>
			<InputContent bind:value={data.subject} />
		{/if}
		{#if defaultContent == 'SMS'}
			<label for="sms" class="font-semibold">{$_('data.sms.number')}</label>
			<InputContent bind:value={data.number} />
			<label for="sms" class="font-semibold">{$_('data.sms.message')}</label>
			<InputContent bind:value={data.message} />
		{/if}
		{#if defaultContent == 'Phone'}
			<InputContent bind:value={data.number} />
		{/if}
		{#if defaultContent == 'Wifi'}
			<label for="wifi" class="font-semibold">{$_('data.wifi.ssid')}</label>
			<InputContent bind:value={data.ssid} />
			<label for="wifi" class="font-semibold">{$_('data.wifi.auth')}</label>
			<InputContent bind:value={data.typeWifi} />
			<label for="wifi" class="font-semibold">{$_('data.wifi.password')}</label>
			<InputContent bind:value={data.password} />
			<input
				type="checkbox"
				class="text-black text-sm rounded mt-3 mb-3 border bg-slate-100 w-full p-2 placeholder-black"
			/>
		{/if}
		{#if defaultContent == 'Contact'}
			<div class="max-w-md mx-auto">
				<div class="flex flex-wrap -mx-2">
					<!-- Prénom -->
					<div class="w-full md:w-1/2 px-2 mb-4">
						<label for="firstname" class="block font-semibold">{$_('data.contact.firstname')}</label
						>
						<input
							type="text"
							bind:value={data.firstname}
							id="firstname"
							class="form-input mt-1 block w-full"
						/>
					</div>
					<!-- Nom -->
					<div class="w-full md:w-1/2 px-2 mb-4">
						<label for="lastname" class="block font-semibold">{$_('data.contact.lastname')}</label>
						<input
							type="text"
							bind:value={data.lastname}
							id="lastname"
							class="form-input mt-1 block w-full"
						/>
					</div>
				</div>
				<div class="flex flex-wrap -mx-2">
					<!-- Société -->
					<div class="w-full md:w-1/2 px-2 mb-4">
						<label for="company" class="block font-semibold">{$_('data.contact.company')}</label>
						<input
							type="text"
							bind:value={data.company}
							id="company"
							class="form-input mt-1 block w-full"
						/>
					</div>
					<!-- Fonction -->
					<div class="w-full md:w-1/2 px-2 mb-4">
						<label for="job" class="block font-semibold">{$_('data.contact.job')}</label>
						<input
							type="text"
							bind:value={data.jobTitle}
							id="job"
							class="form-input mt-1 block w-full"
						/>
					</div>
				</div>
				<div class="flex flex-wrap -mx-2">
					<!-- Email -->
					<div class="w-full px-2 mb-4">
						<label for="email" class="block font-semibold">{$_('data.contact.email')}</label>
						<input
							type="email"
							bind:value={data.email}
							id="email"
							class="form-input mt-1 block w-full"
						/>
					</div>
				</div>
				<div class="flex flex-wrap -mx-2">
					<!-- Téléphone -->
					<div class="w-full px-2 mb-4">
						<label for="phone" class="block font-semibold">{$_('data.contact.phone')}</label>
						<input
							type="tel"
							bind:value={data.phone}
							id="phone"
							class="form-input mt-1 block w-full"
						/>
					</div>
				</div>
				<div class="flex flex-wrap -mx-2">
					<!-- Site internet -->
					<div class="w-full px-2 mb-4">
						<label for="website" class="block font-semibold">{$_('data.contact.url')}</label>
						<input
							type="url"
							bind:value={data.url}
							id="website"
							class="form-input mt-1 block w-full"
						/>
					</div>
				</div>
			</div>
		{/if}
		{#if defaultContent == 'Geo'}
			<label for="geo" class="font-semibold">{$_('data.geo.latitude')}</label>
			<InputContent bind:value={data.latitude} />
			<label for="geo" class="font-semibold">{$_('data.geo.longitude')}</label>
			<InputContent bind:value={data.longitude} />
		{/if}
		{#if defaultContent == 'Event'}
			<label for="event" class="font-semibold">{$_('data.event.summary')}</label>
			<InputContent bind:value={data.title} />
			<label for="event" class="font-semibold">{$_('data.event.start')}</label>
			<InputContent nameType="date" bind:value={data.dstart} />
			<label for="event" class="font-semibold">{$_('data.event.end')}</label>
			<InputContent nameType="date" bind:value={data.dend} />
		{/if}
	{/if}
</Card>
