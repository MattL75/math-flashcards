import {Component, OnInit} from '@angular/core';
import {Language, LocaleService} from 'angular-l10n';
import {SettingsService} from './services/settings.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [SettingsService]
})
export class AppComponent implements OnInit {
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

    ngOnInit() {
        if (window.screen.width < 800) {
            this.menuOpen = false;
        }
    }
}
