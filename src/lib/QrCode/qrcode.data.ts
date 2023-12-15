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
    ];    
}