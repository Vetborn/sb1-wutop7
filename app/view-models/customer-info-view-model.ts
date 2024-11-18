import { Observable } from '@nativescript/core';
import { Frame } from '@nativescript/core';
import { Location } from '../models/appointment';

export class CustomerInfoViewModel extends Observable {
    private _firstName: string = '';
    private _lastName: string = '';
    private _email: string = '';
    private _phoneNumber: string = '';
    private _buildingNumber: string = '';
    private _location: Location;

    constructor(location: Location) {
        super();
        this._location = location;
        // Notify the view about the location property
        this.notifyPropertyChange('location', this._location);
    }

    get location(): Location {
        return this._location;
    }

    get firstName(): string {
        return this._firstName;
    }

    set firstName(value: string) {
        if (this._firstName !== value) {
            this._firstName = value;
            this.notifyPropertyChange('firstName', value);
        }
    }

    get lastName(): string {
        return this._lastName;
    }

    set lastName(value: string) {
        if (this._lastName !== value) {
            this._lastName = value;
            this.notifyPropertyChange('lastName', value);
        }
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        if (this._email !== value) {
            this._email = value;
            this.notifyPropertyChange('email', value);
        }
    }

    get phoneNumber(): string {
        return this._phoneNumber;
    }

    set phoneNumber(value: string) {
        if (this._phoneNumber !== value) {
            this._phoneNumber = value;
            this.notifyPropertyChange('phoneNumber', value);
        }
    }

    get buildingNumber(): string {
        return this._buildingNumber;
    }

    set buildingNumber(value: string) {
        if (this._buildingNumber !== value) {
            this._buildingNumber = value;
            this.notifyPropertyChange('buildingNumber', value);
        }
    }

    onContinue() {
        const customerInfo = {
            firstName: this._firstName,
            lastName: this._lastName,
            email: this._email,
            phoneNumber: this._phoneNumber,
            buildingNumber: this._buildingNumber
        };

        Frame.topmost().navigate({
            moduleName: 'views/pet-page',
            context: {
                location: this._location,
                customerInfo: customerInfo
            },
            animated: true
        });
    }
}