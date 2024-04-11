import {
	IconCalendarCheck,
	IconContactBook,
	IconEmail,
	IconLocationMarker,
	IconMessage,
	// IconPhone,
	IconWifi,
	IconGlobe,
	IconCall
} from 'obra-icons-svelte';
import { _ } from 'svelte-i18n';
import { get } from 'svelte/store';

const tmp = get(_);
const tt = tmp('phone.name');
console.log('svelte --------- i18n', tt);

interface QRDataItem {
	key: string;
	value: string;
}

export function parseData(data: string): QRDataItem[] {
	console.log('parseData--- data --- vcard test', data);
	const lines = data.split('\n');
	const dataValue: Array<{ key: string; value: string }> = [];
	for (const line of lines) {
		const [k, ...rest] = line.split(':');
		const value = rest.join(':');
		if (k) {
			const key = k.trim().toLowerCase();
			if (key === 'wifi') {
				const wifiData = value.split(';').reduce((acc, curr) => {
					const [field, fieldValue] = curr.split(':');
					if (field && fieldValue) acc[field.trim()] = fieldValue.trim();
					return acc;
				}, {});
				const formattedValue: string = `S:${wifiData.S};T:${wifiData.T};P:${wifiData.P};H:false;`;
				dataValue.push({ key, value: formattedValue });
			} else if (key === 'smsto') {
				const parts = value.split(':');
				if (parts.length >= 2) {
					const number = parts[0].trim();
					const message = parts.slice(1).join(':').trim();
					dataValue.push({ key, value: `${number}?body=${message}` });
				} else {
					dataValue.push({ key, value: `${value.trim()}?body=` });
				}
			} else if (key.startsWith('begin') && value.trim().toLowerCase() === 'vcard') {
				const vCardData = lines.join('\n');
				dataValue.push({ key: 'vcard', value: vCardData });
				break;
			} else {
				dataValue.push({ key, value: value.trim() });
			}
		}
	}
	console.log('parseData--- data', dataValue);
	return dataValue;
}

interface QRDataItem {
	key: string;
	value: string;
}

interface FirstRow {
	key: string;
	value: string;
}
interface ResultData {
	type: string;
	content: { [key: string]: string };
	action: {
		text: string[];
		icon: unknown;
		href?: string;
	};
}
export function buildData(data: FirstRow[]): ResultData {
	console.log('buildData--- data', data);
	if (data.length === 0) {
		return { type: '', content: {}, action: { text: [], icon: null } };
	}

	const resultData = { type: '', content: {}, action: {} };
	const firstRow = data[0];

	switch (firstRow.key) {
		case 'wifi': {
			const wifiInfo = firstRow.value;
			const infoParts: { [key: string]: string } = wifiInfo.split(';').reduce((acc, curr) => {
				const [k, v] = curr.split(':');
				if (k && v) {
					acc[k] = v;
				}
				return acc;
			}, {} as { [key: string]: string });

			const ssid: string = infoParts['S'];
			const password: string = infoParts['P'];
			const typeWifi: string = infoParts['T'];
			const hidden: boolean = infoParts['H'] === 'true';

			const partsWifi = { ssid, password, typeWifi, hidden };
			resultData.type = 'wifi';
			resultData.content = partsWifi;
			console.log('buildData--- partsWifi', partsWifi);
			resultData.action = { text: [`scan.open.wifi`], icon: IconWifi };
			break;
		}
		case 'smsto':
			{
				const [number, message] = firstRow.value.split('?body=');
				resultData.type = 'sms';
				resultData.content = { number, message };
				resultData.action = {
					href: `sms:${number}?body=${message || ''}`,
					text: [`scan.open.sms`],
					icon: IconMessage
				};
			}
			break;
		case 'mailto':
			{
				const [email, subject] = firstRow.value.split('?subject=');
				resultData.type = 'email';
				resultData.content = { email, subject };
				resultData.action = {
					href: `mailto:${email}?subject=${subject || ''}`,
					text: [`scan.open.email`],
					icon: IconEmail
				};
			}
			break;
		case 'tel':
			resultData.type = 'phone';
			resultData.content = data.reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {});
			resultData.action = {
				href: `tel:${firstRow.value}`,
				text: [`scan.open.phone`],
				icon: IconCall
			};
			break;
		case 'http':
		case 'https':
			resultData.type = 'link';
			resultData.content = data.reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {});
			resultData.action = {
				href: firstRow.value,
				text: [`scan.open.url`, `https:${firstRow.value}`],
				icon: IconGlobe
			};
			break;
		case 'geo':
			{
				const [latitude, longitude] = firstRow.value.split(',');
				resultData.type = 'geo';
				resultData.content = { latitude, longitude };
				resultData.action = {
					href: `geo:${latitude},${longitude}`,
					text: [`scan.open.geo`],
					icon: IconLocationMarker
				};
			}
			break;
		case 'vcard':
			{
				const lines: string[] = firstRow.value.split('\n');
				const vCardObject: { [key: string]: string } = {};

				lines.forEach((line) => {
					let [key, value] = line.split(':');
					if (key && value) {
						key = key.toLowerCase().trim();
						value = value.trim();
						vCardObject[key] = value;
					}
				});
				resultData.type = 'vcard';
				resultData.content = vCardObject;
				resultData.action = { text: ['scan.open.vcard'], icon: IconContactBook };
			}
			break;
		case 'begin':
			{
				resultData.type = 'event';
				resultData.content = data.reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {});
				resultData.action = { text: ['scan.open.event'], icon: IconCalendarCheck };
			}
			break;
		default:
			console.log('Type de QR code non reconnu.');
	}

	return resultData;
}

export function formatEventToIcs({
	summary,
	dtstart,
	dtend
}: {
	summary: string;
	dtstart: string;
	dtend: string;
}) {
	const dtStartFormatted = dtstart.replace(/[-:]/g, '') + 'Z';
	const dtEndFormatted = dtend.replace(/[-:]/g, '') + 'Z';

	return [
		'BEGIN:VCALENDAR',
		'VERSION:2.0',
		'BEGIN:VEVENT',
		`SUMMARY:${summary}`,
		`DTSTART:${dtStartFormatted}`,
		`DTEND:${dtEndFormatted}`,
		'END:VEVENT',
		'END:VCALENDAR'
	].join('\r\n');
}

export function downloadVcfFile(vcfData: string, fileName: string) {
	const blob = new Blob([vcfData], { type: 'text/vcard' });
	const url = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = url;
	link.download = `${fileName}.vcf`;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
}

export function downloadIcsFile(icsData: string, fileName: string) {
	const blob = new Blob([icsData], { type: 'text/calendar' });
	const url = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = url;
	link.download = `${fileName}.ics`;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
}
