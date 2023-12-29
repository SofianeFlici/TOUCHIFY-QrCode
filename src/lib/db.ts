import Dexie from 'dexie';
import type { Options } from "qr-code-styling";

class MyListDatabase extends Dexie {
	[x: string]: unknown;
    options: Dexie.Table<Options, number>;

    constructor() {
        super("MyList");
        this.version(3).stores({
            options: '++id, data, width, height, backgroundOptions, cornersDotOptions, cornersSquareOptions, dotsOptions, imageOptions, qrOptions, backgroundOptions, cornersDotOptions, cornersSquareOptions, dotsOptions, imageOptions, qrOptions, backgroundOptions, cornersDotOptions, cornersSquareOptions, dotsOptions, imageOptions, qrOptions, backgroundOptions, cornersDotOptions, cornersSquareOptions, dotsOptions, imageOptions, qrOptions, backgroundOptions, cornersDotOptions, cornersSquareOptions, dotsOptions, imageOptions, qrOptions, backgroundOptions, cornersDotOptions, cornersSquareOptions, dotsOptions, imageOptions, qrOptions, backgroundOptions, cornersDotOptions, cornersSquareOptions, dotsOptions, imageOptions, qrOptions, backgroundOptions, cornersDotOptions, cornersSquareOptions, dotsOptions, imageOptions, qrOptions, backgroundOptions, cornersDotOptions, cornersSquareOptions, dotsOptions, imageOptions, qrOptions',
            images:'++id,image',
            types:'++id,type'
        });
        this.options = this.table("options");
        this.images = this.table("images");
        this.types = this.table("types");
    }
}

const db = new MyListDatabase();
export default db;
