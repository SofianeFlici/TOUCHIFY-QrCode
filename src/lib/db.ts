import Dexie, { type Table } from 'dexie';

// Définissez une interface qui correspond à la structure de vos données
export interface QRCodeOptions {
    id: string; // Un identifiant unique pour chaque enregistrement
    width: number;
    height: number;
    color: string; // Exemple: color de dotsOptions
    background: string; // Exemple: background de dotsOptions
    dotsOptions: {
        color: string;
        background: string;
        type: 'rounded' | 'square';
    };
    cornersSquareOptions: {
        color: string;
        background: string;
    };
    cornersDotOptions: {
        color: string;
        background: string;
        type: 'dot' | 'square';
    };
    cornersType: 'dot' | 'square';
    cornersAlwaysSquare: boolean;
    image: string;
    imageOptions: {
        crossOrigin: string;
        margin: number;
        imageSize: number;
        hideBackgroundDots: boolean;
    };
    backgroundImage: string;
    backgroundImageOptions: {
        crossOrigin: string;
        ratio: number;
        url: string;
    };
    qrOptions: {
        errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
        maskPattern: number;
        scale: number;
        width: number;
        height: number;
        typeNumber: number;
        quality: number;
    };
}

// Extension de Dexie pour intégrer TypeScript
export class MyDatabase extends Dexie {
    qrcodeOptions!: Table<QRCodeOptions>;

    constructor() {
        super('myDatabase');
        this.version(1).stores({
            qrcodeOptions: 'id, width, height, color, background, dotsOptions, cornersSquareOptions, cornersDotOptions, cornersType, cornersAlwaysSquare, image, imageOptions, backgroundImage, backgroundImageOptions, qrOptions' 
        });
    }
}

export const db = new MyDatabase();
