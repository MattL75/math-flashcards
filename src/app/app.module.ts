import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {L10nConfig, L10nLoader, ProviderType, StorageStrategy, TranslationModule} from 'angular-l10n';
import {RouterModule, Routes} from '@angular/router';
import {HttpClient, HttpClientModule, HttpHandler} from '@angular/common/http';
import {HttpModule} from '@angular/http';

const l10nConfig: L10nConfig = {
    locale: {
        languages: [
            {code: 'en', dir: 'ltr'},
            {code: 'fr', dir: 'ltr'}
        ],
        language: 'en',
        storage: StorageStrategy.Cookie
    },
    translation: {
        providers: [
            {type: ProviderType.Static, prefix: './assets/locale-'}
        ],
        caching: true,
        missingValue: 'No key found'
    }
};

const appRoutes: Routes = [
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        TranslationModule.forRoot(l10nConfig),
        HttpClientModule,
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(public l10nLoader: L10nLoader) {
        this.l10nLoader.load();
    }
}
