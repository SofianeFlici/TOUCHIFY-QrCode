export function parseData(data: string) {
	const lines = data.split('\n');
	const dataValue: [{ key: string; value: string }?] = [];
	for (const line of lines) {
		const [k, v] = line.split(':');
		if (k && v) {
			const key = k.toLowerCase();
			let value = v;
			if (key === 'smsto') {
				const [number, message] = v.split(':');
				value = `${number}?body=${message}`;
			}
			dataValue.push({ key, value });
		}
	}
	console.log('parseData--- data', dataValue);
	return dataValue;
}

export function innerHtml(key: string, value: string) {
	switch (key) {
		case 'tel':
		case 'smsto':
			return (
				`<a href="tel:${value}" target="_blank">test ${value}</a>` +
				`<a href="sms:${value}" target="_blank">test ${value}</a>`
			);

		case 'mailto':
		case '':
		case 'geo':
			return `<a href="${key}:${value}" target="_blank">test ${value}</a>`;

		case 'wifi': {
			const wifiParts = value
				.split(';')
				.map((part) => part.split(':').pop())
				.join(', ');
			return `<a href="wifi:${wifiParts}">connect to WiFi</a>`;
		}

		case 'begin': {
            return `<a href="calendar:${value}">Ajouter à mon calendrier</a>`;
        }
        case 'vcard': {
            return `<a href="data:text/vcard;charset=utf-8,${encodeURIComponent(value)}" download="contact.vcf">Download vCard</a>`;
        }
		default:
			return `<span></span>`;
	}
}
