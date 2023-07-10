import Helper from '../src/components/helper';
import { fireEvent } from '@testing-library/dom';
import { autoTypingAnswerText, LevelIndex } from '../src/types';
import LEVELS_DATA from '../src/components/levelsData';

describe('Helper', () => {
    let helper: Helper;
    let element: HTMLElement;
    let resetButton: HTMLButtonElement;

    beforeAll(() => {
        localStorage.clear();
        element = document.createElement('div');
        element.classList.add('test-selector');
        document.body.appendChild(element);

        resetButton = document.createElement('button');
        resetButton.classList.add('game-level__reset');
        document.body.appendChild(resetButton);
    });

    afterAll(() => {
        document.body.removeChild(element);
        document.body.removeChild(resetButton);
    });

    beforeEach(() => {
        helper = new Helper();
    });

    afterEach(() => {
        helper.hideTooltip();
    });

    describe('showTooltip', () => {
        it('should show tooltip', () => {
            const targetElement = document.createElement('div');
            const text = 'Tooltip text';

            helper.showTooltip(targetElement, text);

            expect(helper.helperElement.textContent).toBe(text);
            expect(helper.helperElement.classList.contains('visible')).toBe(true);
        });
    });

    describe('hideTooltip', () => {
        it('should hide tooltip', () => {
            helper.helperElement.classList.add('visible');

            helper.hideTooltip();

            expect(helper.helperElement.classList.contains('visible')).toBe(false);
        });
    });

    describe('resetProgress', () => {
        it('should reset progress', () => {
            localStorage.setItem('wonLevels', JSON.stringify([1, 2]));
            localStorage.setItem('wonWithHelp', JSON.stringify([2, 5]));

            helper.resetProgress();

            fireEvent.click(resetButton);

            expect(localStorage.getItem('wonLevels')).toBe('');
            expect(localStorage.getItem('wonWithHelp')).toBe('');
        });
    });

    describe('clearInput', () => {
        it('should clear input value', () => {
            const input = document.createElement('input');
            input.classList.add('css-input');
            document.body.appendChild(input);
            input.value = 'initial value';

            helper.clearInput();

            expect(input.value).toBe('');
            document.body.removeChild(input);
        });
    });

    describe('autoTypingAnswerText', () => {
        it('should type answer text into input', () => {
            const input = document.createElement('input');
            input.classList.add('css-input');
            document.body.appendChild(input);

            const level = 1;
            localStorage.setItem('level', String(level));
            const selector = LEVELS_DATA[level - LevelIndex.INCREMENT].cssSelector[0];

            helper['autoTypingAnswerText']();

            setTimeout(() => {
                expect(input.value).toBe(selector);
            }, autoTypingAnswerText.TYPING_SPEED * selector.length);

            document.body.removeChild(input);
        });
    });
});
