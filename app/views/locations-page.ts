import { EventData, Page, NavigatedData } from '@nativescript/core';
import { LocationsViewModel } from '../view-models/locations-view-model';

export function navigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new LocationsViewModel();
}