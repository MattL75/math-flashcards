import {Component, Input, OnInit} from '@angular/core';
import {Language} from 'angular-l10n';
import {animate, animateChild, group, keyframes, query, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-flashcard',
    templateUrl: './flashcard.component.html',
    styleUrls: ['./flashcard.component.scss'],
    animations: [
        trigger('heartbeat', [
            state('0', style({
                transform: 'scale3d(0, 0, 0)'
            })),
            state('1', style({
                transform: 'scale3d(1, 1, 1)'
            })),
            transition('0 => 1', [
                group([
                    query('@*', animateChild(), {optional: true}),
                    animate('600ms 0ms ease-in-out', keyframes([
                        style({ transform: 'scale3d(0, 0, 0)', offset: 0 }),
                        style({ transform: 'scale3d(1.05, 1.05, 1.05)', offset: 0.75 }),
                        style({ transform: 'scale3d(1, 1, 1)', offset: 1.0 }),
                    ])),
                ]),
            ]),
            transition('1 => 0', [
                group([
                    query('@*', animateChild(), {optional: true}),
                    animate('600ms 0ms ease-in-out', keyframes([
                        style({ transform: 'scale3d(1, 1, 1)', offset: 0 }),
                        style({ transform: 'scale3d(1.05, 1.05, 1.05)', offset: 0.25 }),
                        style({ transform: 'scale3d(0, 0, 0)', offset: 1.0 }),
                    ])),
                ]),
            ]),
        ]),
    ],
})
export class FlashcardComponent implements OnInit {
    @Language() lang: string;
    @Input() maxDigit = 13;
    @Input() minDigit = 0;
    @Input() mode = 0;          // 0 for regular, 1 for algebra
    @Input() operators = 2;     // + is 1, - is 2 etc.
    firstNum;
    secondNum;
    operator;
    input = '';

    constructor() {
    }

    ngOnInit() {
        this.firstNum = Math.floor(Math.random() * this.maxDigit) + this.minDigit;
        this.secondNum = Math.floor(Math.random() * this.maxDigit) + this.minDigit;
        this.operator = Math.floor(Math.random() * this.operators);
    }

    checkAnswer(): boolean {
        return Number(this.input) === this.getAnswer();
    }

    getAnswer(): number {
        if (this.mode === 0) {
            return this.doOperation(this.firstNum, this.secondNum, this.operator);
        } else if (this.mode === 1) {
            return this.secondNum;
        }
    }

    doOperation(firstNum: number, secondNum: number, operator: number): number {
        switch (operator) {
            case 0: return firstNum + secondNum;
            case 1: return firstNum - secondNum;
            case 2: return firstNum * secondNum;
            case 3: return firstNum / secondNum;
        }
    }

    getOperatorString(): string {
        switch (this.operator) {
            case 0: return '+';
            case 1: return '-';
            case 2: return 'x';
            case 3: return '÷';
        }
    }
}
