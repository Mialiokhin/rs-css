import Helper from './helper';
import EventEmitter from 'eventemitter3';
import { LevelIndex, OnLevelChangedCallback } from '../types';

class ChooseLevel {
    private helper;
    public emitter: EventEmitter;
    private onLevelChangedCallback: OnLevelChangedCallback;

    constructor() {
        this.helper = new Helper();
        this.emitter = new EventEmitter();
        this.onLevelChangedCallback = null;
    }

    public setOnLevelChangedCallback(callback: OnLevelChangedCallback): void {
        this.onLevelChangedCallback = callback;
    }

    public ifLevelChanged() {
        const codeInput = document.querySelector('.css-input') as HTMLInputElement;
        const inputBtn = document.getElementById('input-btn') as HTMLButtonElement;
        const levelChooseManual: NodeListOf<HTMLDivElement> = document.querySelectorAll('.game-level__item');
        const resetProgressBtn = document.querySelector('.game-level__reset') as HTMLButtonElement;

        const changeLevel = (levelValue: number) => {
            if (!isNaN(levelValue) && levelValue >= LevelIndex.FIRST && levelValue <= LevelIndex.LAST) {
                if (this.onLevelChangedCallback) {
                    this.onLevelChangedCallback(levelValue);
                    this.emitter.emit('levelChanged');
                    this.helper.clearInput();
                }
            } else if (!isNaN(levelValue)) {
                this.helper.anamationLost();
            }
        };

        const handleCodeInput = () => {
            const levelValue = Number(codeInput.value);
            changeLevel(levelValue);
        };

        codeInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                handleCodeInput();
            }
        });

        inputBtn.addEventListener('click', handleCodeInput);

        levelChooseManual.forEach((el) => {
            const levelValue = Number(el.dataset.level);
            el.addEventListener('click', () => {
                changeLevel(levelValue);
            });
        });

        resetProgressBtn.addEventListener('click', () => {
            changeLevel(LevelIndex.FIRST);
        });
    }

    public getNextLevel(): number {
        const currentLevel = Number(localStorage.getItem('level'));
        if (!isNaN(currentLevel) && currentLevel >= LevelIndex.FIRST && currentLevel < LevelIndex.LAST) {
            const nextLevel = currentLevel + LevelIndex.INCREMENT;
            return nextLevel;
        }
        return LevelIndex.FIRST;
    }
}

export default ChooseLevel;
