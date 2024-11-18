import { ZXing } from '@nativescript/zxing';

export class BarcodeService {
    private static zxing: ZXing;

    static initialize() {
        this.zxing = new ZXing();
    }

    static generateBarcode(text: string, width: number, height: number): string {
        if (!this.zxing) {
            this.initialize();
        }
        
        return this.zxing.createBarCode({
            text: text,
            width: width,
            height: height,
            format: 'QR_CODE'
        });
    }
}