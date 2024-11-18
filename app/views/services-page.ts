import { EventData, Page, NavigatedData, Frame } from '@nativescript/core';
import { ServicesViewModel } from '../view-models/services-view-model';

export function navigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    const context = args.context;
    page.bindingContext = new ServicesViewModel(context);
}

export function onBackTap() {
    Frame.topmost().goBack();
}