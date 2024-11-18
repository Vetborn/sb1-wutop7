import { Observable } from '@nativescript/core';
import { locations } from '../data/locations';
import { Frame } from '@nativescript/core';

export class LocationsViewModel extends Observable {
    private _locations: Array<any>;
    private _filteredLocations: Array<any>;
    private _selectedLocation: any = null;
    private _searchText: string = '';
    private _isDropdownVisible: boolean = false;

    constructor() {
        super();
        this._locations = locations;
        this._filteredLocations = locations;
        this.notifyPropertyChange('filteredLocations', this._filteredLocations);
    }

    get filteredLocations(): Array<any> {
        return this._filteredLocations;
    }

    get selectedLocation(): any {
        return this._selectedLocation;
    }

    get searchText(): string {
        return this._searchText;
    }

    set searchText(value: string) {
        if (this._searchText !== value) {
            this._searchText = value;
            this.notifyPropertyChange('searchText', value);
        }
    }

    get isDropdownVisible(): boolean {
        return this._isDropdownVisible;
    }

    onSearchTap() {
        this._isDropdownVisible = true;
        this.notifyPropertyChange('isDropdownVisible', this._isDropdownVisible);
    }

    onSearchTextChanged(args) {
        const searchBar = args.object;
        const searchValue = searchBar.text.toLowerCase();
        
        this._isDropdownVisible = true;
        this._filteredLocations = this._locations.filter(location => 
            location.name.toLowerCase().includes(searchValue) ||
            location.address.toLowerCase().includes(searchValue)
        );
        
        this.notifyPropertyChange('isDropdownVisible', this._isDropdownVisible);
        this.notifyPropertyChange('filteredLocations', this._filteredLocations);
    }

    onLocationSelect(args) {
        const index = args.index;
        this._selectedLocation = this._filteredLocations[index];
        this._searchText = this._selectedLocation.name;
        this._isDropdownVisible = false;
        
        this.notifyPropertyChange('selectedLocation', this._selectedLocation);
        this.notifyPropertyChange('searchText', this._searchText);
        this.notifyPropertyChange('isDropdownVisible', this._isDropdownVisible);

        // Navigate directly to customer info page when location is selected
        Frame.topmost().navigate({
            moduleName: 'views/customer-info-page',
            context: this._selectedLocation,
            animated: true
        });
    }
}