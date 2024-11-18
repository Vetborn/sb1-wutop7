import { Observable } from '@nativescript/core';
import { Frame } from '@nativescript/core';
import { PetTemperaments } from '../models/pet';
import { Location } from '../models/appointment';

export class PetViewModel extends Observable {
    private _petName: string = '';
    private _breed: string = '';
    private _age: string = '';
    private _selectedSex: string = '';
    private _petType: string = '';
    private _location: Location;
    private _customerInfo: any;
    private _temperaments = PetTemperaments.map(temp => ({
        ...temp,
        selected: false
    }));

    constructor(context: { location: Location; customerInfo: any }) {
        super();
        this._location = context.location;
        this._customerInfo = context.customerInfo;
    }

    get petType(): string {
        return this._petType;
    }

    onPetTypeSelect(args) {
        const button = args.object;
        this._petType = button.get('data-type');
        this.notifyPropertyChange('petType', this._petType);
    }

    get petName(): string {
        return this._petName;
    }

    set petName(value: string) {
        if (this._petName !== value) {
            this._petName = value;
            this.notifyPropertyChange('petName', value);
        }
    }

    get breed(): string {
        return this._breed;
    }

    set breed(value: string) {
        if (this._breed !== value) {
            this._breed = value;
            this.notifyPropertyChange('breed', value);
        }
    }

    get age(): string {
        return this._age;
    }

    set age(value: string) {
        if (this._age !== value) {
            this._age = value;
            this.notifyPropertyChange('age', value);
        }
    }

    get selectedSex(): string {
        return this._selectedSex;
    }

    get temperaments() {
        return this._temperaments;
    }

    onSexSelect(args) {
        const button = args.object;
        this._selectedSex = button.get('data-sex');
        this.notifyPropertyChange('selectedSex', this._selectedSex);
    }

    onTemperamentSelect(args) {
        const button = args.object;
        const temperamentId = button.get('data-temperament');
        
        const index = this._temperaments.findIndex(t => t.id === temperamentId);
        if (index !== -1) {
            this._temperaments = [...this._temperaments];
            this._temperaments[index] = {
                ...this._temperaments[index],
                selected: !this._temperaments[index].selected
            };
            this.notifyPropertyChange('temperaments', this._temperaments);
        }
    }

    onContinue() {
        const petInfo = {
            petType: this._petType,
            petName: this._petName,
            breed: this._breed,
            age: this._age,
            sex: this._selectedSex,
            temperaments: this._temperaments.filter(t => t.selected).map(t => t.id)
        };

        Frame.topmost().navigate({
            moduleName: "views/services-page",
            context: {
                location: this._location,
                customerInfo: this._customerInfo,
                petInfo: petInfo
            },
            animated: true
        });
    }
}