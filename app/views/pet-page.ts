import { EventData, Page, NavigatedData, Frame } from '@nativescript/core';
import { PetViewModel } from '../view-models/pet-view-model';

export function navigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    const context = args.context;
    page.bindingContext = new PetViewModel(context);
}

export function onBackTap() {
    Frame.topmost().goBack();
}