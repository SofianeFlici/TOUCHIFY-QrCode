import Dexie from 'dexie';
import type { Options } from 'qr-code-styling';
import type { QrCodeData } from './QrCode/qrcode.data';

export type QrCodeItem = {
	id?: number;
	type: string;
	date: Date;
	data: QrCodeData;
	image?: Blob | null;
	options: Options;
};

class MyListDatabase extends Dexie {
	[x: string]: unknown;

	options: Dexie.Table<QrCodeItem, number>;

	constructor() {
		super('MyList');

		this.version(4).stores({
			options: '++id'
		});

		this.options = this.table('options');
	}
}

const db = new MyListDatabase();
export default db;
