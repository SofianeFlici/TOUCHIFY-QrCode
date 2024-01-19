<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import InputRadioButton from '$lib/components/InputRadioButton.svelte';
	import { ListQrCodeDataType } from '../qrcode.data';

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

	export let defaultContent = 'URL';

	let visible = false;

	const data_types = ListQrCodeDataType();

	let inputUrlContent = 'https://touchify.io';
	let inputEmailContent = '';
	let inputEmailSubject = '';
	let inputSmsNumber = '';
	let inputSmsMessage = '';
	let inputPhone = '';
	let inputWifiName = '';
	let inputWifiAuth = '';
	let inputWifiPassword = '';
	let inputVCardLastName = '';
	let inputVCardFirstName = '';
	let inputVCardCompany = '';
	let inputVCardJob = '';
	let inputVCardPhone = '';
	let inputVCardEmail = '';
	let inputVCardWebsite = '';
	let inputGeoLatitude = '';
	let inputGeoLongitude = '';
	let inputEventTitle = '';
	let inputEventStartDate = '';
	let inputEventEndDate = '';

	export let data: string;

	$: switch (defaultContent) {
		case 'URL':
			data = generateUrl(inputUrlContent);
			break;
		case 'Email':
			data = generateEmail(inputEmailContent, inputEmailSubject);
			break;
		case 'SMS':
			data = generateSms(inputSmsNumber, inputSmsMessage);
			break;
		case 'Phone':
			data = generatePhone(inputPhone);
			break;
		case 'Wifi':
			data = generateWifi(inputWifiName, inputWifiPassword, inputWifiAuth);
			break;
		case 'Contact':
			data = generateVCard(
				inputVCardFirstName,
				inputVCardLastName,
				inputVCardCompany,
				inputVCardJob,
				inputVCardEmail,
				inputVCardPhone,
				inputVCardWebsite
			);
			break;
		case 'Geo':
			data = generateGeo(inputGeoLatitude, inputGeoLongitude);
			break;
		case 'Event':
			data = generateEvent(inputEventTitle, inputEventStartDate, inputEventEndDate);
			break;
	}

	function selectedType(data_type: any) {
		defaultContent = data_type.type;
		visible = false;
	}
</script>

<Card>
	<h1 class="font-semibold mb-2">{$_('data.title')}</h1>
	<input
		type="button"
		value={defaultContent}
		class="mb-2 self-start justify-start text-sm"
		on:click={() => (visible = !visible)}
	/>
	<div class="grid grid-cols-4 gap-2">
		{#if visible == true}
			{#each data_types as data_type}
				<InputRadioButton on:click={() => selectedType(data_type)}>
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
			<InputContent bind:value={inputUrlContent} />
		{/if}
		{#if defaultContent == 'Email'}
			<label for="email" class="font-semibold">{$_('data.email.address')}</label>
			<InputContent bind:value={inputEmailContent} />
			<label for="email" class="font-semibold">{$_('data.email.subject')}</label>
			<InputContent bind:value={inputEmailSubject} />
		{/if}
		{#if defaultContent == 'SMS'}
			<label for="sms" class="font-semibold">{$_('data.sms.number')}</label>
			<InputContent bind:value={inputSmsNumber} />
			<label for="sms" class="font-semibold">{$_('data.sms.message')}</label>
			<InputContent bind:value={inputSmsMessage} />
		{/if}
		{#if defaultContent == 'Phone'}
			<InputContent bind:value={inputPhone} />
		{/if}
		{#if defaultContent == 'Wifi'}
			<label for="wifi" class="font-semibold">{$_('data.wifi.ssid')}</label>
			<InputContent bind:value={inputWifiName} />
			<label for="wifi" class="font-semibold">{$_('data.wifi.auth')}</label>
			<InputContent bind:value={inputWifiAuth} />
			<label for="wifi" class="font-semibold">{$_('data.wifi.password')}</label>
			<InputContent bind:value={inputWifiPassword} />
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
					<label for="firstname" class="block font-semibold">{$_('data.contact.firstname')}</label>
					<input type="text" bind:value={inputVCardFirstName} id="firstname" class="form-input mt-1 block w-full" />
				</div>
				<!-- Nom -->
				<div class="w-full md:w-1/2 px-2 mb-4">
					<label for="lastname" class="block font-semibold">{$_('data.contact.lastname')}</label>
					<input type="text" bind:value={inputVCardLastName} id="lastname" class="form-input mt-1 block w-full"/>
				</div>
			</div>
			<div class="flex flex-wrap -mx-2">
				<!-- Société -->
				<div class="w-full md:w-1/2 px-2 mb-4">
					<label for="company" class="block font-semibold">{$_('data.contact.company')}</label>
					<input type="text" bind:value={inputVCardCompany} id="company" class="form-input mt-1 block w-full" />
				</div>
				<!-- Fonction -->
				<div class="w-full md:w-1/2 px-2 mb-4">
					<label for="job" class="block font-semibold">{$_('data.contact.job')}</label>
					<input type="text" bind:value={inputVCardJob} id="job" class="form-input mt-1 block w-full"/>
				</div>
			</div>
			<div class="flex flex-wrap -mx-2">
				<!-- Email -->
				<div class="w-full px-2 mb-4">
					<label for="email" class="block font-semibold">{$_('data.contact.email')}</label>
					<input type="email" bind:value={inputVCardEmail} id="email" class="form-input mt-1 block w-full" />
				</div>
			</div>
			<div class="flex flex-wrap -mx-2">
				<!-- Téléphone -->
				<div class="w-full px-2 mb-4">
					<label for="phone" class="block font-semibold">{$_('data.contact.phone')}</label>
					<input type="tel" bind:value={inputVCardPhone} id="phone" class="form-input mt-1 block w-full" />
				</div>
			</div>
			<div class="flex flex-wrap -mx-2">
				<!-- Site internet -->
				<div class="w-full px-2 mb-4">
					<label for="website" class="block font-semibold">{$_('data.contact.url')}</label>
					<input type="url" bind:value={inputVCardWebsite} id="website" class="form-input mt-1 block w-full" />
				</div>
			</div>
		</div>
		
		{/if}
		{#if defaultContent == 'Geo'}
			<label for="geo" class="font-semibold">{$_('data.geo.latitude')}</label>
			<InputContent bind:value={inputGeoLatitude} />
			<label for="geo" class="font-semibold">{$_('data.geo.longitude')}</label>
			<InputContent bind:value={inputGeoLongitude} />
		{/if}
		{#if defaultContent == 'Event'}
			<label for="event" class="font-semibold">{$_('data.event.summary')}</label>
			<InputContent bind:value={inputEventTitle} />
			<label for="event" class="font-semibold">{$_('data.event.start')}</label>
			<InputContent nameType="date" bind:value={inputEventStartDate} />
			<label for="event" class="font-semibold">{$_('data.event.end')}</label>
			<InputContent nameType="date" bind:value={inputEventEndDate} />
		{/if}
	{/if}
</Card>
