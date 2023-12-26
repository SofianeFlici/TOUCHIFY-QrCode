import Dexie from 'dexie';
import type { Options } from "qr-code-styling"; // Assurez-vous que c'est le bon type pour vos données

class MyListDatabase extends Dexie {
	[x: string]: unknown;
    options: Dexie.Table<Options, number>; // Précisez ici le type de vos données et le type de la clé primaire

    constructor() {
        super("MyList");
        this.version(1).stores({
            options: '++id, data, width, height, backgroundOptions, cornersDotOptions, cornersSquareOptions, dotsOptions, imageOptions, qrOptions, backgroundOptions, cornersDotOptions, cornersSquareOptions, dotsOptions, imageOptions, qrOptions, backgroundOptions, cornersDotOptions, cornersSquareOptions, dotsOptions, imageOptions, qrOptions, backgroundOptions, cornersDotOptions, cornersSquareOptions, dotsOptions, imageOptions, qrOptions, backgroundOptions, cornersDotOptions, cornersSquareOptions, dotsOptions, imageOptions, qrOptions, backgroundOptions, cornersDotOptions, cornersSquareOptions, dotsOptions, imageOptions, qrOptions, backgroundOptions, cornersDotOptions, cornersSquareOptions, dotsOptions, imageOptions, qrOptions, backgroundOptions, cornersDotOptions, cornersSquareOptions, dotsOptions, imageOptions, qrOptions, backgroundOptions, cornersDotOptions, cornersSquareOptions, dotsOptions, imageOptions, qrOptions'
        });

        this.options = this.table("options");
    }
}

const db = new MyListDatabase();
export default db;
