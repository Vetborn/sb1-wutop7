import { Observable, Frame } from '@nativescript/core';
import { PetSizes } from '../models/pet';
import { ServiceCode } from '../services/service-code';
import { Location } from '../models/appointment';

export class ServicesViewModel extends Observable {
    private _selectedSizeIndex: number = -1;
    private _selectedSizeLabel: string = '';
    private _isSizeDropdownVisible: boolean = false;
    private _showXSmallServices: boolean = false;
    private _starterSelected: boolean = false;
    private _starterDisabled: boolean = false;
    private _hygieneSelected: boolean = false;
    private _fullGroomSelected: boolean = false;
    private _showServiceCode: boolean = false;
    private _serviceCode: string = '';
    private _location: Location;
    private _customerInfo: any;
    private _petInfo: any;
    
    private _sizes = PetSizes.map(size => ({
        ...size,
        selected: false
    }));
    
    private _addons = [
        { id: 'anal', name: 'Anal Gland Cleaning', price: 15, selected: false },
        { id: 'teeth', name: 'Teeth Brushing', price: 10, selected: false },
        { id: 'scaling', name: 'Teeth Scaling', price: 25, selected: false },
        { id: 'nail', name: 'Nail Trim', price: 10, selected: false },
        { id: 'ear', name: 'Ear Cleaning', price: 10, selected: false },
        { id: 'deshed', name: 'De-Shedding Treatment', price: 15, selected: false }
    ];

    private _treats = [
        { id: 'perfume', name: 'Pet Perfume', price: 5, selected: false },
        { id: 'pawbalm', name: 'Paw Balm Treatment', price: 10, selected: false },
        { id: 'conditioner', name: 'Luxury Coat Conditioner', price: 10, selected: false },
        { id: 'polish', name: 'Pet Nail Polish', price: 10, selected: false },
        { id: 'dyeing', name: 'Partial Dyeing', price: 40, selected: false }
    ];

    constructor(context: { location: Location; customerInfo: any; petInfo: any }) {
        super();
        this._serviceCode = ServiceCode.generate();
        this._location = context.location;
        this._customerInfo = context.customerInfo;
        this._petInfo = context.petInfo;
    }

    get serviceCode(): string {
        return this._serviceCode;
    }

    get showServiceCode(): boolean {
        return this._showServiceCode;
    }

    get selectedSizeLabel(): string {
        return this._selectedSizeLabel;
    }

    get isSizeDropdownVisible(): boolean {
        return this._isSizeDropdownVisible;
    }

    get sizes() {
        return this._sizes;
    }

    get showXSmallServices(): boolean {
        return this._showXSmallServices;
    }

    get starterSelected(): boolean {
        return this._starterSelected;
    }

    get starterDisabled(): boolean {
        return this._starterDisabled;
    }

    get hygieneSelected(): boolean {
        return this._hygieneSelected;
    }

    get fullGroomSelected(): boolean {
        return this._fullGroomSelected;
    }

    get addons() {
        return this._addons;
    }

    get treats() {
        return this._treats;
    }

    onSizeTap() {
        this._isSizeDropdownVisible = !this._isSizeDropdownVisible;
        this.notifyPropertyChange('isSizeDropdownVisible', this._isSizeDropdownVisible);
    }

    onSizeSelect(args) {
        const index = args.index;
        this._selectedSizeIndex = index;
        this._selectedSizeLabel = this._sizes[index].label;
        this._isSizeDropdownVisible = false;
        this._showXSmallServices = this._sizes[index].id === 'xsmall';
        
        this._sizes = this._sizes.map((size, i) => ({
            ...size,
            selected: i === index
        }));
        
        this.notifyPropertyChange('sizes', this._sizes);
        this.notifyPropertyChange('selectedSizeLabel', this._selectedSizeLabel);
        this.notifyPropertyChange('isSizeDropdownVisible', this._isSizeDropdownVisible);
        this.notifyPropertyChange('showXSmallServices', this._showXSmallServices);
    }

    onStarterSelect() {
        if (!this._starterDisabled) {
            this._starterSelected = !this._starterSelected;
            this._showServiceCode = this._starterSelected || this._hygieneSelected || this._fullGroomSelected;
            this.notifyPropertyChange('starterSelected', this._starterSelected);
            this.notifyPropertyChange('showServiceCode', this._showServiceCode);
        }
    }

    onHygieneSelect() {
        this._hygieneSelected = !this._hygieneSelected;
        if (this._hygieneSelected) {
            this._fullGroomSelected = false;
            this._starterSelected = false;
            this._starterDisabled = true;
        } else {
            this._starterDisabled = false;
        }
        this._showServiceCode = this._starterSelected || this._hygieneSelected || this._fullGroomSelected;
        this.notifyPropertyChange('hygieneSelected', this._hygieneSelected);
        this.notifyPropertyChange('fullGroomSelected', this._fullGroomSelected);
        this.notifyPropertyChange('starterSelected', this._starterSelected);
        this.notifyPropertyChange('starterDisabled', this._starterDisabled);
        this.notifyPropertyChange('showServiceCode', this._showServiceCode);
    }

    onFullGroomSelect() {
        this._fullGroomSelected = !this._fullGroomSelected;
        if (this._fullGroomSelected) {
            this._hygieneSelected = false;
            this._starterSelected = false;
            this._starterDisabled = true;
        } else {
            this._starterDisabled = false;
        }
        this._showServiceCode = this._starterSelected || this._hygieneSelected || this._fullGroomSelected;
        this.notifyPropertyChange('fullGroomSelected', this._fullGroomSelected);
        this.notifyPropertyChange('hygieneSelected', this._hygieneSelected);
        this.notifyPropertyChange('starterSelected', this._starterSelected);
        this.notifyPropertyChange('starterDisabled', this._starterDisabled);
        this.notifyPropertyChange('showServiceCode', this._showServiceCode);
    }

    onAddonSelect(args) {
        const gridLayout = args.object;
        const addonId = gridLayout.get('data-addon-id');
        
        const addonIndex = this._addons.findIndex(addon => addon.id === addonId);
        if (addonIndex !== -1) {
            this._addons[addonIndex].selected = !this._addons[addonIndex].selected;
            this.notifyPropertyChange('addons', this._addons);
        }
    }

    onTreatSelect(args) {
        const gridLayout = args.object;
        const treatId = gridLayout.get('data-treat-id');
        
        const treatIndex = this._treats.findIndex(treat => treat.id === treatId);
        if (treatIndex !== -1) {
            this._treats[treatIndex].selected = !this._treats[treatIndex].selected;
            this.notifyPropertyChange('treats', this._treats);
        }
    }

    onContinue() {
        const selectedServices = {
            starter: this._starterSelected,
            mainService: this._hygieneSelected ? 'hygiene' : this._fullGroomSelected ? 'fullGroom' : null,
            addons: this._addons.filter(addon => addon.selected).map(addon => addon.id),
            treats: this._treats.filter(treat => treat.selected).map(treat => treat.id),
            serviceCode: this._serviceCode
        };

        Frame.topmost().navigate({
            moduleName: 'views/booking-page',
            context: {
                location: this._location,
                customerInfo: this._customerInfo,
                petInfo: this._petInfo,
                services: selectedServices
            },
            animated: true
        });
    }
}