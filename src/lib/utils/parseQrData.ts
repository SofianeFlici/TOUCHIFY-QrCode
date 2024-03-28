import { number } from 'svelte-i18n';
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

interface QRDataItem {
	key: string;
	value: string;
}

const renderedData: QRDataItem[] = [];

export function parseData(data: string): QRDataItem[] {
	const lines = data.split('\n');
	const dataValue: Array<{ key: string; value: string }> = [];
	for (const line of lines) {
		let [k, ...rest] = line.split(':');
		const value = rest.join(':'); // Réassemblez le reste au cas où il y a des ':' dans la valeur
		if (k) {
			const key = k.trim().toLowerCase();
			if (key === 'wifi') {
				// Traiter les données WiFi
				const wifiData = value.split(';').reduce((acc, curr) => {
					const [field, fieldValue] = curr.split(':');
					if (field && fieldValue) acc[field.trim()] = fieldValue.trim();
					return acc;
				}, {});
				const formattedValue: string = `S:${wifiData.S};T:${wifiData.T};P:${wifiData.P};H:false;`;
				dataValue.push({ key, value: formattedValue });
			} else if (key === 'smsto') {
				// Traiter les données SMSTO
				const parts = value.split(':');
				if (parts.length >= 2) {
					const number = parts[0].trim();
					const message = parts.slice(1).join(':').trim(); // Rejoignez le reste au cas où il y a des ':' dans le message
					dataValue.push({ key, value: `${number}?body=${message}` });
				} else {
					dataValue.push({ key, value: `${value.trim()}?body=` });
				}
			} else if (key.startsWith('begin') && value.trim().toLowerCase() === 'vcard') {
				// Début du traitement de vCard
				const vCardData = lines.join('\n'); // Rejoindre toutes les lignes pour obtenir les données complètes de vCard
				// Ici, vous pouvez soit retourner les données vCard brutes, soit les parser davantage pour extraire des champs spécifiques
				dataValue.push({ key: 'vcard', value: vCardData });
				break; // Supposer que toute la vCard est contenue dans le QR code et qu'après son traitement, on peut sortir de la boucle
			} else {
				// Traitement standard pour toutes les autres clés
				dataValue.push({ key, value: value.trim() });
			}
		}
	}
	console.log('parseData--- data', dataValue);
	return dataValue;
}

export function formatVcardToVcf({
	firstname,
	lastname,
	company,
	jobTitle,
	email,
	phone,
	url
}: {
	firstname: string;
	lastname: string;
	company: string;
	jobTitle: string;
	email: string;
	phone: string;
	url: string;
}) {
	return `BEGIN:VCARD\nVERSION:3.0\nFN:${firstname} ${lastname}\nORG:${company}\nTITLE:${jobTitle}\nEMAIL:${email}\nTEL:${phone}\nURL:${url}\nEND:VCARD`;
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

// export function downloadVcfFile(vcfData: string, fileName: string) {
// 	const blob = new Blob([vcfData], { type: 'text/vcard' });
// 	const url = URL.createObjectURL(blob);
// 	const link = document.createElement('a');
// 	link.href = url;
// 	link.download = `${fileName}.vcf`;
// 	document.body.appendChild(link);
// 	link.click();
// 	document.body.removeChild(link);
// 	URL.revokeObjectURL(url);
// }

// export function downloadIcsFile(icsData: string, fileName: string) {
// 	const blob = new Blob([icsData], { type: 'text/calendar' });
// 	const url = URL.createObjectURL(blob);
// 	const link = document.createElement('a');
// 	link.href = url;
// 	link.download = `${fileName}.ics`;
// 	document.body.appendChild(link);
// 	link.click();
// 	document.body.removeChild(link);
// 	URL.revokeObjectURL(url);
// }

// export function handleDownloadEvent() {
// 	const summaryItem = renderedData.find((item) => item.key === 'summary');
// 	const dtstartItem = renderedData.find((item) => item.key === 'dtstart');
// 	const dtendItem = renderedData.find((item) => item.key === 'dtend');

// 	if (summaryItem && dtstartItem && dtendItem) {
// 		const eventData = {
// 			summary: summaryItem.value,
// 			dtstart: dtstartItem.value,
// 			dtend: dtendItem.value
// 		};

// 		const icsData = formatEventToIcs(eventData);
// 		const fileName = eventData.summary || 'Event';
// 		downloadIcsFile(icsData, fileName);
// 	} else {
// 		console.error('Incomplete event data.');
// 	}
// }

export function getLinkData(key: string, value: string) {
	let parts, number, message, email, subject;

	console.log('getLinkData--- key', key);
	switch (key) {
		case 'tel':
			return { type: 'phone', href: `tel:${value}`, text: `Appeler le ${value}`, icon: IconCall };
		case 'smsto':
			console.log('getLinkData--- smsto', value);
			parts = value.split('?body=');
			number = parts[0];
			message = parts[1];
			console.log('getLinkData--- number', number);
			console.log('getLinkData--- message', message);
			return {
				type: 'sms',
				action: () => {},
				text: `Envoyer SMS`,
				href: `sms:${number}?body=${message}`,
				number: `${number}`,
				message: ` ${message}`,
				icon: IconMessage
			};
		case 'mailto':
			parts = value.split('?subject=');
			email = parts[0];
			subject = parts[1];
			return {
				type: 'email',
				href: `mailto:${value}`,
				email: `Envoyer un email à ${email}`,
				subject: `${subject}`,
				text: `Envoyer un email`,
				icon: IconEmail
			};
		case 'https':
			return { type: 'link', href: `https://${value}`, text: `Visiter ${value}`, icon: IconGlobe };
		case 'geo':
			return {
				type: 'link',
				href: `geo:${value}`,
				text: `Ouvrir la carte`,
				icon: IconLocationMarker
			};
		case 'wifi':
			return { type: 'wifi', href: `wifi:${value}`, text: `Connecter au WiFi`, icon: IconWifi };
		case 'begin':
			if (key === 'begin' || key === 'summary') {
				return {
					type: 'event',
					Text: "Ajouter à l'agenda",
					icon: IconCalendarCheck
				};
			} else if (key === 'vcard') {
				return {
					type: 'action',
					action: () => downloadVcfFile(value, 'contact'),
					text: `Télécharger vCard`,
					icon: IconContactBook
				};
			}

			break;
		default:
			return { type: 'text', text: value };
	}
}
