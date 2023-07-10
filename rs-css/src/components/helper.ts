import { OnLevelWonWithHelpCallback } from '../types';
import LEVELS_DATA from './levelsData';
import EventEmitter from 'eventemitter3';
import { LEVEL_INDEX, AUTO_TYPING_ANSWER_TEXT } from '../const';
import localStorageManager from './LocalStorageManager';

class Helper {
    readonly helperElement: HTMLElement;
    private onLevelWonWithHelpCallback: OnLevelWonWithHelpCallback;
    private emitter: EventEmitter;

    constructor() {
        this.emitter = new EventEmitter();
        this.helperElement = document.createElement('div');
        this.helperElement.classList.add('helper');
        document.body.appendChild(this.helperElement);
        this.onLevelWonWithHelpCallback = null;
    }

    public attachToElements(selector: string) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
            element.addEventListener('mouseover', (event) => {
                const targetElement = event.target as HTMLElement;
                const text = targetElement.getAttribute('data-helper');
                if (text) {
                    this.showTooltip(targetElement, text);
                }
            });

            element.addEventListener('mouseout', () => {
                this.hideTooltip();
            });
        });
    }

    public showTooltip(targetElement: HTMLElement, text: string) {
        const targetRect = targetElement.getBoundingClientRect();

        this.helperElement.textContent = text;
        this.helperElement.style.top = `${targetRect.top - 10}px`;
        this.helperElement.style.left = `${targetRect.left}px`;
        this.helperElement.classList.add('visible');
    }

    public hideTooltip() {
        this.helperElement.classList.remove('visible');
    }

    public resetProgress(): void {
        const btnResetProgress = document.querySelector('.game-level__reset') as HTMLButtonElement | null;
        if (btnResetProgress !== null) {
            const wonLevels: number[] = [];
            const wonWithHelp: number[] = [];
            btnResetProgress.addEventListener('click', () => {
                localStorageManager.resetProgress(wonLevels, wonWithHelp);
                this.updateWonStyle();
            });
        }
    }

    public updateWonStyle() {
        const levelNumbers = document.querySelectorAll('.game-level__item') as NodeListOf<HTMLElement>;
        const wonLevels: number[] = localStorageManager.getWonLevels();
        const wonWithHelp: number[] = localStorageManager.getWonWithHelp();
        if (levelNumbers !== null) {
            levelNumbers.forEach((el: HTMLElement) => {
                if (wonLevels.indexOf(Number(el.dataset.level)) !== -1) {
                    if (wonWithHelp.indexOf(Number(el.dataset.level)) !== -1) {
                        el.classList.add('_won-with-help');
                    } else el.classList.add('_won');
                } else {
                    el.classList.remove('_won');
                    el.classList.remove('_won-with-help');
                }
            });
        }
    }

    public clearInput(): void {
        const codeInput = document.querySelector('.css-input') as HTMLInputElement;
        codeInput.value = '';
    }

    public anamationLost(): void {
        const cssEditor = document.querySelector('.css-editor');
        const htmlViewer = document.querySelector('.html-viewer');
        if (cssEditor !== null && htmlViewer !== null) {
            cssEditor.classList.add('_shake');
            htmlViewer.classList.add('_shake');
            cssEditor.addEventListener(
                'animationiteration',
                () => {
                    cssEditor.classList.remove('_shake');
                },
                { once: true }
            );
            htmlViewer.addEventListener(
                'animationiteration',
                () => {
                    htmlViewer.classList.remove('_shake');
                },
                { once: true }
            );
        }
    }

    public animateElementsOffScreen(): void {
        const elements = document.querySelectorAll('.up-down');
        elements.forEach((element) => {
            element.classList.remove('up-down');
            element.classList.add('fly-off-screen');
            element.addEventListener(
                'animationend',
                () => {
                    element.remove();
                },
                { once: true }
            );
        });
    }

    public ifAllLevelsPassed(): void {
        const wonLevels: number[] = localStorageManager.getWonLevels();
        if (wonLevels.length === LEVEL_INDEX.NUMBER_OF_LEVELS) {
            alert('Сongratulations!!! You passed all levels!');
        }
    }

    public onLevelWonWithHelpCallbackSet(callback: OnLevelWonWithHelpCallback): void {
        if (callback !== null) {
            this.emitter.on('levelWonWithHelpCallbackSet', callback);
        } else {
            this.emitter.off('levelWonWithHelpCallbackSet');
        }
    }

    public addListenerToHelpButton(): void {
        const helpButton = document.querySelector('.game-board__help') as HTMLButtonElement;
        const codeInput = document.querySelector('.css-input') as HTMLInputElement;
        helpButton.addEventListener('click', () => {
            this.clearInput();
            this.AUTO_TYPING_ANSWER_TEXT();
            this.emitter.emit('levelWonWithHelpCallbackSet');
            codeInput.focus();
        });
    }

    private AUTO_TYPING_ANSWER_TEXT(): void {
        const level = localStorageManager.getLevel();
        const codeInput = document.querySelector('.css-input') as HTMLInputElement;
        const selector = LEVELS_DATA[level - LEVEL_INDEX.INCREMENT].cssSelector[0];
        let index = AUTO_TYPING_ANSWER_TEXT.START_INDEX;

        const typingInterval = setInterval(() => {
            codeInput.value += selector[index];
            index += AUTO_TYPING_ANSWER_TEXT.INCREMENT;

            if (index === selector.length) {
                clearInterval(typingInterval);
            }
        }, AUTO_TYPING_ANSWER_TEXT.TYPING_SPEED);
    }
}

export default Helper;
