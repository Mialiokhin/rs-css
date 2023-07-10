import LEVELS_DATA from './levelsData';
import EventEmitter from 'eventemitter3';

class CheckerAnswers {
    private answer: string;
    private emitter: EventEmitter;

    constructor() {
        this.answer = '';
        this.emitter = new EventEmitter();
    }

    public checkAnswer(level: number): void {
        if (LEVELS_DATA[level - 1].cssSelector.indexOf(this.answer) !== -1) {
            this.emitter.emit('levelWon');
        } else {
            this.emitter.emit('levelLost');
        }
    }

    private codeInputEvent = (event: KeyboardEvent): void => {
        const level = Number(localStorage.getItem('level'));
        const codeInput = document.querySelector('.css-input') as HTMLInputElement;
        if (event.key === 'Enter' && this.answer !== null && isNaN(Number(codeInput.value))) {
            this.answer = codeInput.value;
            this.checkAnswer(level);
        }
    };

    private codeBtnEvent = (): void => {
        const codeInput = document.querySelector('.css-input') as HTMLInputElement;
        const level = Number(localStorage.getItem('level'));
        if (this.answer !== null && isNaN(Number(codeInput.value))) {
            this.answer = codeInput.value;
            this.checkAnswer(level);
        }
    };

    public startCheckerAnswers(): void {
        const codeInput = document.querySelector('.css-input') as HTMLInputElement;
        const inputBtn = document.getElementById('input-btn') as HTMLButtonElement;
        codeInput.addEventListener('keydown', this.codeInputEvent);
        inputBtn.addEventListener('click', this.codeBtnEvent);
    }

    public delEventsCheckAnswer(): void {
        const codeInput = document.querySelector('.css-input') as HTMLInputElement;
        const inputBtn = document.getElementById('input-btn') as HTMLButtonElement;
        codeInput.removeEventListener('keydown', this.codeInputEvent);
        inputBtn.removeEventListener('click', this.codeBtnEvent);
    }

    public onLevelWon(callback: (level: number) => void): void {
        this.emitter.on('levelWon', callback);
    }

    public onLevelLost(callback: () => void): void {
        this.emitter.on('levelLost', callback);
    }
}

export default CheckerAnswers;
