export interface Appointment {
    id: string;
    location: string;
    date: Date;
    petName: string;
    ownerName: string;
    phoneNumber: string;
}

export interface Location {
    id: string;
    name: string;
    address: string;
}