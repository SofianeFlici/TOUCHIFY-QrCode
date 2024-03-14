import {
	IconCalendarCheck,
	IconContactBook,
	IconEmail,
	IconLocationMarker,
	IconMessage,
	IconPhone,
	IconWifi,
	IconGlobe
} from 'obra-icons-svelte';
import type { SvelteComponentTyped } from 'svelte';

export type QrCodeDataUrl = {
	url: string;
};

export type QrCodeDataSms = {
	number: string;
	message: string;
};

export type QrCodeDataEmail = {
	email: string;
	subject?: string;
};

export type QrCodeDataPhone = {
	number: number;
};

export type QrCodeDataContact = {
	firstname?: string;
	lastname?: string;
	company?: string;
	phone?: number | string;
	email?: string;
	url?: string;
	jobTitle?: string;
	website?: string;
};

export type QrCodeDataWifi = {
	ssid: string;
	password: string;
	typeWifi: string;
};

export type QrCodeDataEvent = {
	title: string;
	dstart: string;
	dend: string;
};

export type QrCodeDataGeoloc = {
	latitude: number;
	longitude: number;
};

export type QrCodeData =
	| QrCodeDataUrl
	| QrCodeDataSms
	| QrCodeDataEmail
	| QrCodeDataPhone
	| QrCodeDataContact
	| QrCodeDataWifi
	| QrCodeDataEvent
	| QrCodeDataGeoloc;

export type QrCodeDataType = {
	type: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	icon: typeof SvelteComponentTyped<any>;
	data?: QrCodeData;
	// options: Partial<Options>;
};

export type ColorOptions = {
	type: string
	color?: string;
	gradient?: GradientOptions;
};

export type GradientOptions = {
	type: string;
	colorStops: { offset: number; color: string }[];
};

export function ListQrCodeDataType(): QrCodeDataType[] {
	return [
		{
			type: 'URL',
			icon: IconGlobe,
			data: {
				url: 'https://touchify.io'
			}
		},
		{
			type: 'Email',
			icon: IconEmail,
			data: {
				email: 'test@gmail.com',
				subject: 'Test'
			}
		},
		{
			type: 'Phone',
			icon: IconPhone,
			data: {
				number: 123456789
			}
		},
		{
			type: 'Contact',
			icon: IconContactBook,
			data: {
				firstname: 'Prénom',
				lastname: 'Nom',
				company: 'Société',
				jobTitle: 'Fonction',
				phone: 'téléphone',
				email: 'Email',
				url: 'Site Internet'
			}
		},
		{
			type: 'Wifi',
			icon: IconWifi,
			data: {
				ssid: 'Touchify',
				password: '123456789',
				typeWifi: 'WPA'
			}
		},
		{
			type: 'Event',
			icon: IconCalendarCheck,
			data: {
				title: 'Touchify',
				dstart: '2021-05-20T10:00:00',
				dend: '2021-05-20T12:00:00'
			}
		},
		{
			type: 'Geo',
			icon: IconLocationMarker,
			data: {
				latitude: 48.8534,
				longitude: 2.3488
			}
		},
		{
			type: 'SMS',
			icon: IconMessage,
			data: {
				number: '123456789',
				message: 'Hello World'
			}
		}
	];
}

export function generateUrl({ url }: QrCodeDataUrl) {
	return url;
}

export function generateVCard({
	firstname,
	lastname,
	company,
	jobTitle,
	email,
	phone,
	url
}: QrCodeDataContact) {
	return `BEGIN:VCARD\nVERSION:3.0\nFN:${firstname} ${lastname}\nORG:${company}\nTITLE:${jobTitle}\nEMAIL:${email}\nTEL:${phone}\nURL:${url}\nEND:VCARD`;
}

export function generateWifi({ ssid, password, typeWifi }: QrCodeDataWifi) {
	return `WIFI:S:${ssid};T:${typeWifi};P:${password};;`;
}

export function generateEvent({ title, dstart, dend }: QrCodeDataEvent) {
	return `BEGIN:VEVENT\nSUMMARY:${title}\nDTSTART:${dstart}\nDTEND:${dend}\nEND:VEVENT`;
}

export function generateGeo({ latitude, longitude }: QrCodeDataGeoloc) {
	return `geo:${latitude},${longitude}`;
}

export function generateSms({ number, message }: QrCodeDataSms) {
	return `SMSTO:${number}:${message}`;
}

export function generatePhone({ number }: QrCodeDataPhone) {
	return `tel:${number}`;
}

export function generateEmail({ email, subject }: QrCodeDataEmail) {
	return `mailto:${email}?subject=${subject}`;
}

export const displayConfig: Record<string, { key: string; label: string }[]> = {
	URL:[
		{ key: 'url', label: 'URL' }
	],
	Contact: [
		{ key: 'firstname', label: 'Prénom' },
		{ key: 'lastname', label: 'Nom' },
		{ key: 'company', label: 'Société' },
		{ key: 'jobTitle', label: 'Fonction' },
		{ key: 'phone', label: 'Téléphone' },
		{ key: 'email', label: 'Email' },
		{ key: 'url', label: 'Site Internet' }
	],
	Wifi: [
		{ key: 'ssid', label: 'SSID' },
		{ key: 'password', label: 'Mot de passe' },
		{ key: 'typeWifi', label: 'Type' }
	],
	Event: [
		{ key: 'title', label: 'Titre' },
		{ key: 'dstart', label: 'Début' },
		{ key: 'dend', label: 'Fin' }
	],
	Geo: [
		{ key: 'latitude', label: 'Latitude' },
		{ key: 'longitude', label: 'Longitude' }
	],
	SMS: [
		{ key: 'number', label: 'Numéro' },
		{ key: 'message', label: 'Message' }
	],
	Phone: [
		{ key: 'number', label: 'Numéro' }
	],
	Email: [
		{ key: 'email', label: 'Email' },
		{ key: 'subject', label: 'Sujet' }
	]
};