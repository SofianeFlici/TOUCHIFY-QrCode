import {
	IconCalendarCheck,
	IconContactBook,
	IconEmail,
	IconLocationMarker,
	IconMessage,
	IconPhone,
	IconWifi,
	IconGlobe,
	IconCall
} from 'obra-icons-svelte';


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

export type QrCodeDataWhatsapp = {
	number: number;
	message?: string;
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
	type?: string;
	icon: unknown;
	data?: QrCodeData;
};

export type ColorOptions = {
	type?: string;
	color?: string;
	gradient?: GradientOptions;
} | undefined;


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
			type: 'Whatsapp',
			icon: IconCall,
			data: {
				number: 123456789,
				message: 'Hello World'
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
	console.log('gereation Vcard on QrCodeData.ts --- firstname', firstname);
	return `BEGIN:VCARD\nVERSION:3.0\nN:${(firstname || '')};${lastname}\nORG:${(company || '')}\nTITLE:${jobTitle}\nEMAIL:${email}\nTEL:${phone}\nURL:${url}\nEND:VCARD`;

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
	if(message != '') return `SMSTO:${number}:${message}`;
	else return `SMSTO:${number}`;
}

export function generatePhone({ number }: QrCodeDataPhone) {
	return `tel:${number}`;
}

export function generateWhatsapp({ number , message }: QrCodeDataWhatsapp) {
	if(message != '') return `WHATSAPP:${number}:${message}`;
	else return `WHATSAPP:${number}`;
}

export function generateEmail({ email, subject }: QrCodeDataEmail) {
	return `mailto:${email}?subject=${subject}`;
}

export const displayConfig: Record<string, { key: string; label: string }[]> = {
	URL:[
		{ key: 'url', label: 'URL' }
	],
	Contact: [
		{ key: 'firstname', label: 'firstname' },
		{ key: 'lastname', label: 'lastname' },
		{ key: 'company', label: 'company' },
		{ key: 'jobTitle', label: 'jobTitle' },
		{ key: 'phone', label: 'phone' },
		{ key: 'email', label: 'email' },
		{ key: 'url', label: 'website' }
	],
	Wifi: [
		{ key: 'ssid', label: 'ssid' },
		{ key: 'typeWifi', label: 'typeWifi' }
	],
	Event: [
		{ key: 'title', label: 'title' },
		{ key: 'dstart', label: 'Début' },
		{ key: 'dend', label: 'Fin' }
	],
	Geo: [
		{ key: 'latitude', label: 'Latitude' },
		{ key: 'longitude', label: 'Longitude' }
	],
	SMS: [
		{ key: 'number', label: 'number' },
		{ key: 'message', label: 'Message' }
	],
	Phone: [
		{ key: 'number', label: 'number' }
	],
	Whatsapp: [
		{ key: 'number', label: 'number' },
		{ key: 'message', label: 'Message' }
	],
	Email: [
		{ key: 'email', label: 'Email' },
		{ key: 'subject', label: 'Subjet' }
	],
};