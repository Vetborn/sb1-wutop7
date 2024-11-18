import { EventData, Page, NavigatedData, Frame } from '@nativescript/core';
import { BookingViewModel } from '../view-models/booking-view-model';

export function navigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    const context = args.context;
    page.bindingContext = new BookingViewModel(context);
}

export function onBackTap() {
    Frame.topmost().goBack();
}