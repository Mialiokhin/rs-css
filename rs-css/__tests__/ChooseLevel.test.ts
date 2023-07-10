import ChooseLevel from '../src/components/chooseLevel';
import { OnLevelChangedCallback, LevelIndex } from '../src/types';

describe('ChooseLevel', () => {
    let chooseLevel: ChooseLevel;
    beforeEach(() => {
        chooseLevel = new ChooseLevel();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getNextLevel', () => {
        it('should return the next level when the current level is valid', () => {
            localStorage.setItem('level', '1');
            const nextLevel = chooseLevel.getNextLevel();
            expect(nextLevel).toBe(2);
        });

        it('should return the first level when the current level is the last level', () => {
            localStorage.setItem('level', `${LevelIndex.LAST}`);
            const nextLevel = chooseLevel.getNextLevel();
            expect(nextLevel).toBe(1);
        });
    });

    describe('ifLevelChanged', () => {
        let codeInput: HTMLInputElement;
        let inputBtn: HTMLButtonElement;
        let levelItem1: HTMLDivElement;
        let resetProgressBtn: HTMLButtonElement;
        let callback: OnLevelChangedCallback;
        let emitMock: jest.SpyInstance;
        let clearInputSpy: jest.SpyInstance;

        beforeEach(() => {
            codeInput = document.createElement('input');
            codeInput.classList.add('css-input');
            document.body.appendChild(codeInput);

            inputBtn = document.createElement('button');
            inputBtn.id = 'input-btn';
            document.body.appendChild(inputBtn);

            levelItem1 = document.createElement('div');
            levelItem1.classList.add('game-level__item');
            levelItem1.dataset.level = '2';
            document.body.appendChild(levelItem1);

            resetProgressBtn = document.createElement('button');
            resetProgressBtn.classList.add('game-level__reset');
            document.body.appendChild(resetProgressBtn);

            callback = jest.fn();
            chooseLevel.setOnLevelChangedCallback(callback);

            emitMock = jest.spyOn(chooseLevel.emitter, 'emit');
            clearInputSpy = jest.spyOn(chooseLevel['helper'], 'clearInput');

            chooseLevel.ifLevelChanged();
        });

        afterEach(() => {
            document.body.removeChild(codeInput);
            document.body.removeChild(inputBtn);
            document.body.removeChild(levelItem1);
            document.body.removeChild(resetProgressBtn);
        });

        it('should change the level and emit the "levelChanged" event when a valid level value is entered', () => {
            const levelValue = 2;

            codeInput.value = String(levelValue);
            inputBtn.dispatchEvent(new Event('click'));

            expect(clearInputSpy).toHaveBeenCalled();
            expect(callback).toHaveBeenCalledWith(levelValue);
            expect(emitMock).toHaveBeenCalledWith('levelChanged');
            expect(chooseLevel['helper'].clearInput).toHaveBeenCalled();
        });

        it('should change the level to the first level and emit the "levelChanged" event when the reset progress button is clicked', () => {
            resetProgressBtn.dispatchEvent(new Event('click'));

            expect(callback).toHaveBeenCalledWith(1);
            expect(emitMock).toHaveBeenCalledWith('levelChanged');
        });

        it('should change the level and emit the "levelChanged" event when the Enter key is pressed on the code input', () => {
            const levelValue = 3;
            const enterKeyEvent = new KeyboardEvent('keydown', { key: 'Enter' });

            codeInput.value = String(levelValue);
            codeInput.dispatchEvent(enterKeyEvent);

            expect(callback).toHaveBeenCalledWith(levelValue);
            expect(emitMock).toHaveBeenCalledWith('levelChanged');
        });
    });
});
