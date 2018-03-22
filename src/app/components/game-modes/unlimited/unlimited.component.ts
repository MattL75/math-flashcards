import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {SettingsService} from '../../../services/settings.service';
import {AppConfig} from '../../../models/app-config';
import {FlashcardComponent} from '../../flashcard/flashcard.component';

@Component({
    selector: 'app-unlimited',
    templateUrl: './unlimited.component.html',
    styleUrls: ['./unlimited.component.scss'],
    animations: []
})
export class UnlimitedComponent implements OnInit {
    @ViewChildren('flashcard') cards: QueryList<FlashcardComponent>;
    simulCards = 14;
    finished = 0;
    helperArray = new Array(this.simulCards);

    constructor(private settings: SettingsService) {
    }

    ngOnInit() {
        if (window.screen.width < 800) {
            this.simulCards = 4;
        } else if (window.screen.width < 1200) {
            this.simulCards = 8;
        } else if (window.screen.width < 1300) {
            this.simulCards = 10;
        }
        this.helperArray = new Array(this.simulCards);
    }

    getConfig(): AppConfig {
        return this.settings.getConfig();
    }

    checkState() {
        ++this.finished;
        if (this.finished === this.simulCards) {
            this.cards.forEach(card => {
                card.ngOnInit();
            });
            this.finished = 0;
        }
    }

}
