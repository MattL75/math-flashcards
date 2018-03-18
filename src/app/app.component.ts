import {Component} from '@angular/core';
import {Language, LocaleService} from 'angular-l10n';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    @Language() lang: string;
    private menuOpen = true;
    constructor(public locale: LocaleService) {}

    selectLanguage(language: string): void {
        this.locale.setCurrentLanguage(language);
    }

    getOpen(): boolean {
        return this.menuOpen;
    }

    switchOpen(): void {
        this.menuOpen = !this.menuOpen;
    }
}
