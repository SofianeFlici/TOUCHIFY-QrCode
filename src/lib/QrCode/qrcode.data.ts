// 1- les imports
// import { Options } from 'qr-code-styling';
import {
    // IconCalendarCheck,
    // IconContactBook,
    IconEmail,
    IconLinkAlt,
    // IconLocationMarker,
    // IconMessage,
    // IconPhone,
    // IconWifi,
} from "obra-icons-svelte";

// 2- le typage de la data


// 3- une fonction qui je pense applique le typage à ma liste de data

// 4- une fonction avec la liste de tous les données dont on a besoins

export function ListQrCodeDataType(){
    return [
        {
            type: "URL",
            options: { qrOptions: { errorCorrectionLevel: "Q"} },
            default: "https://touchify.io",
            inputType: "text",
            placeHolder: "https://touchify.io",
            icon: IconLinkAlt,
        },
        {
            type: "Email",
            options: { qrOptions: { errorCorrectionLevel: "Q"} },
            default: { addtess: "" },
            inputType: "email",
            placeHolder: "enter your email",
            icon: IconEmail,
        },
    ];
    
}

// 5- une fonction qui indiqué le format de la data utilisé


// 6- typé le genre de qrCode utilisé

//