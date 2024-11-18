import { EventData, Page, NavigatedData, Frame } from '@nativescript/core';
import { CustomerInfoViewModel } from '../view-models/customer-info-view-model';

export function navigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    const context = args.context;
    page.bindingContext = new CustomerInfoViewModel(context);
}

export function onBackTap() {
    Frame.topmost().goBack();
}