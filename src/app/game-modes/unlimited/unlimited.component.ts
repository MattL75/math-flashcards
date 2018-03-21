import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {FlashcardComponent} from '../../flashcard/flashcard.component';

@Component({
    selector: 'app-unlimited',
    templateUrl: './unlimited.component.html',
    styleUrls: ['./unlimited.component.scss'],
    animations: [
        trigger(
            'fadeBottomIf',
            [
                transition(
                    ':enter', [
                        style({opacity: 0, transform: 'translateY(100%)'}),
                        animate((400) + 'ms ' + ('ease-in'), style({
                            opacity: 1,
                            transform: 'translateY(0%)'
                        }))
                    ]
                ),
                transition(
                    ':leave', [
                        style({opacity: 1, transform: 'translateY(0%)'}),
                        animate((400) + 'ms ' + ('ease-in'), style({
                            opacity: 0,
                            transform: 'translateY(100%)'
                        }))
                    ]
                )
            ]
        )
    ]
})
export class UnlimitedComponent implements OnInit {
    constructor() {
    }

    ngOnInit() {
    }

}
