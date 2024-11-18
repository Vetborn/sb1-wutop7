import { Observable, Frame } from '@nativescript/core';
import { Location } from '../models/appointment';
import { locations } from '../data/locations';

export class BookingViewModel extends Observable {
    private _location: Location;
    private _assignedDay: number;
    private _selectedTime: string | null = null;
    private _availableTimeSlots: Array<{ time: string; selected: boolean }> = [];
    private _services: any;

    constructor(context: { location: Location; services: any }) {
        super();
        this._location = context.location;
        this._services = context.services;
        this._assignedDay = this.calculateAssignedDay();
        this.generateTimeSlots();
    }

    private calculateAssignedDay(): number {
        const locationIndex = locations.findIndex(loc => loc.id === this._location.id);
        return locationIndex + 1;
    }

    private generateTimeSlots() {
        const timeSlots = [
            '9:00 AM',
            '10:00 AM',
            '11:00 AM',
            '12:00 PM',
            '1:00 PM',
            '2:00 PM',
            '3:00 PM',
            '4:00 PM',
            '5:00 PM',
            '6:00 PM'
        ];
        
        this._availableTimeSlots = timeSlots.map(time => ({
            time,
            selected: false
        }));
        
        this.notifyPropertyChange('availableTimeSlots', this._availableTimeSlots);
    }

    get location(): Location {
        return this._location;
    }

    get assignedDay(): string {
        const suffixes = ['th', 'st', 'nd', 'rd'];
        const suffix = this._assignedDay % 10 <= 3 && (this._assignedDay % 100 < 10 || this._assignedDay % 100 > 20)
            ? suffixes[this._assignedDay % 10]
            : suffixes[0];
        return `${this._assignedDay}${suffix}`;
    }

    get availableTimeSlots(): Array<{ time: string; selected: boolean }> {
        return this._availableTimeSlots;
    }

    get selectedTime(): string | null {
        return this._selectedTime;
    }

    onTimeSelect(args) {
        const button = args.object;
        const selectedTime = button.get('data-time');

        this._availableTimeSlots = this._availableTimeSlots.map(slot => ({
            ...slot,
            selected: slot.time === selectedTime
        }));
        
        this._selectedTime = selectedTime;
        
        this.notifyPropertyChange('availableTimeSlots', this._availableTimeSlots);
        this.notifyPropertyChange('selectedTime', this._selectedTime);
    }

    onConfirmBooking() {
        if (this._selectedTime) {
            const bookingDetails = {
                location: this._location,
                services: this._services,
                appointmentDay: this._assignedDay,
                appointmentTime: this._selectedTime
            };

            Frame.topmost().navigate({
                moduleName: 'views/confirmation-page',
                context: bookingDetails,
                animated: true
            });
        }
    }
}