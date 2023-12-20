import {
    IconCalendarCheck,
    IconContactBook,
    IconEmail,
    IconLinkAlt,
    IconLocationMarker,
    IconMessage,
    IconPhone,
    IconWifi,
} from "obra-icons-svelte";

export type QrCodeDataUrl = {
    type: 'URL';
    url: string;
    icon?: typeof IconLinkAlt;
};

export type QrCodeDataSms = {
    type: 'SMS';
    number: string;
    message: string;
    icon: typeof IconMessage;
};

export type QrCodeDataEmail = {
    type: 'Email';
    email: string;
    subject?: string;
    icon?: typeof IconEmail;
};

export type QrCodeDataPhone = {
    type: 'Phone';
    number: number;
    icon: typeof IconPhone;
};

export type QrCodeDataContact = {
    type: 'Contact';
    firstname?: string;
    lastname?: string;
    company?: string;
    phone?: number;
    email?: string;
    url?: string;
    jobTitle?: string;
    icon: typeof IconContactBook;
};

export type QrCodeDataWifi = {
    type: 'Wifi';
    ssid: string;
    password: string;
    typeWifi: string;
    icon: typeof IconWifi;
};

export type QrCodeDataEvent = {
    type: 'Event';
    title: string;
    dstart: string;
    dend: string;
    icon: typeof IconCalendarCheck;
};

export type QrCodeDataGeoloc = {
    type: 'Geo';
    latitude: number;
    longitude: number;
    icon?: typeof IconLocationMarker;
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

export function ListQrCodeDataType(): QrCodeData[]{
    return [
        {
            type: "URL",
            url: "https://touchify.io",
            icon: IconLinkAlt,
        },
        {
            type: "Email",
            email: "test@gmail.com",
            subject: "Test",
            icon: IconEmail,
        },

        {
            type: "Phone",
            number: 123456789,
            icon: IconPhone,
        },
        {
            type: "Contact",
            firstname: "John",
            lastname: "Doe",
            company: "Touchify",
            jobTitle: "Developer",
            phone: 123456789,
            email: "example@mail.com",
            url: "https://touchify.io",
            icon: IconContactBook,
        },
        {
            type: "Wifi",
            ssid: "Touchify",
            password: "123456789",
            typeWifi: "WPA",
            icon: IconWifi,
        },
        {
            type: "Event",
            title: "Touchify",
            dstart: "2021-05-20T10:00:00",
            dend: "2021-05-20T12:00:00",
            icon: IconCalendarCheck,
        },
        {
            type: "Geo",
            latitude: 48.8534,
            longitude: 2.3488,
            icon: IconLocationMarker,
        },

        {
            type: "SMS",
            number: "123456789",
            message: "Hello World",
            icon: IconMessage,
        }
    ];    
}



export function generateVCard(firstName: string, lastName: string, company: string, jobTitle: string, email: string, phone: string, website: string) {
    return `BEGIN:VCARD\nVERSION:3.0\nFN:${firstName} ${lastName}\nORG:${company}\nTITLE:${jobTitle}\nEMAIL:${email}\nTEL:${phone}\nURL:${website}\nEND:VCARD`;
}

export function generateWifi(ssid: string, password: string, typeWifi: string) {
    return `WIFI:S:${ssid};T:${typeWifi};P:${password};;`;
}

export function generateEvent(title: string, dstart: string, dend: string) {
    return `BEGIN:VEVENT\nSUMMARY:${title}\nDTSTART:${dstart}\nDTEND:${dend}\nEND:VEVENT`;
}

export function generateGeo(latitude: string, longitude: string) {
    return `geo:${latitude},${longitude}`;
}

export function generateSms(number: string, message: string) {
    return `SMSTO:${number}:${message}`;
}

export function generatePhone(number: string) {
    return `tel:${number}`;
}

export function generateEmail(email: string, subject: string) {
    return `mailto:${email}?subject=${subject}`;
}

export function generateUrl(url: string) {
    return  url;
}