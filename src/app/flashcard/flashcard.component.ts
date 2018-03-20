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
                transform: 'scale3d(0, 0, 0)', display: 'none',
            })),
            state('1', style({
                transform: 'scale3d(1, 1, 1)', display: 'flex'
            })),
            transition('0 => 1', [
                group([
                    query('@*', animateChild(), {optional: true}),
                    animate('500ms 0ms ease-in-out', keyframes([
                        style({ transform: 'scale3d(0, 0, 0)', offset: 0 }),
                        style({ transform: 'scale3d(1.05, 1.05, 1.05)', offset: 0.75 }),
                        style({ transform: 'scale3d(1, 1, 1)', offset: 1.0 }),
                    ])),
                ]),
            ]),
            transition('1 => 0', [
                group([
                    query('@*', animateChild(), {optional: true}),
                    animate('500ms 0ms ease-in-out', keyframes([
                        style({ transform: 'scale3d(1, 1, 1)', offset: 0 }),
                        style({ transform: 'scale3d(1.05, 1.05, 1.05)', offset: 0.25 }),
                        style({ transform: 'scale3d(0, 0, 0)', offset: 1.0 }),
                    ])),
                ]),
            ]),
        ])
    ],
})
export class FlashcardComponent implements OnInit {
    @Language() lang: string;
    @Input() maxDigit1 = 10;
    @Input() minDigit1 = 0;
    @Input() maxDigit2 = 10;
    @Input() minDigit2 = 0;
    @Input() mode = 0;                  // 0 for regular, 1 for algebra
    @Input() operators = [0, 1];        // + is 0, - is 1 etc.
    firstNum;
    secondNum;
    operator;
    input = '';
    done = false;

    constructor() {
    }

    ngOnInit() {
        this.firstNum = Math.floor(Math.random() * this.maxDigit1) + this.minDigit1;
        this.secondNum = Math.floor(Math.random() * this.maxDigit2) + this.minDigit2;
        this.operator = this.operators[Math.floor(Math.random() * this.operators.length)];
        if (this.operator === 4 && !Number.isInteger(this.firstNum / this.secondNum)) {
            this.ngOnInit();
        }

        // TEMPORARY TILL BUGFIX
        if (this.getAnswer() === 0) {
            this.ngOnInit();
        }
    }

    checkAnswer(): boolean {
        if (this.input && this.input !== '') {
            return Number(this.input) === this.getAnswer();
        }
        return false;
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

    setDone() {
        if (this.checkAnswer()) {
            this.done = true;
        }
    }
}
