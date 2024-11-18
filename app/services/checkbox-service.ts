import { ImageSource } from '@nativescript/core';

export class CheckboxService {
    private static checkedImage: ImageSource;
    private static uncheckedImage: ImageSource;

    static async initialize() {
        this.checkedImage = await ImageSource.fromResourceAsync('checkbox-checked');
        this.uncheckedImage = await ImageSource.fromResourceAsync('checkbox-unchecked');
    }

    static getCheckedImage(): ImageSource {
        return this.checkedImage;
    }

    static getUncheckedImage(): ImageSource {
        return this.uncheckedImage;
    }
}