import hljs from 'highlight.js';
import 'highlight.js/styles/devibeans.css';
import LEVELS_DATA from './levelsData';
import CheckerAnswers from './checkerAnswers';

class DrawerLevel {
    private checkerAnswers;

    constructor() {
        this.checkerAnswers = new CheckerAnswers();
    }

    public drawLevel(level: number): void {
        const htmlViewer = document.querySelector('#codeContainer');
        const htmlCode: string = LEVELS_DATA[level - 1].htmlCode;
        const task = LEVELS_DATA[level - 1].task;
        const allLevelDataElement = document.querySelectorAll('.game-level__item');
        const levelDataElement = document.querySelector(`[data-level="${level}"]`);
        const carpetWrapper = document.querySelector('.carpet__wrapper');
        const gameBoardTask = document.querySelector('.game-board__task');
        if (gameBoardTask !== null) {
            gameBoardTask.innerHTML = task;
        }
        if (htmlViewer !== null) {
            htmlViewer.innerHTML = hljs.highlight(`${htmlCode}`, { language: 'xml' }).value;
        }
        if (allLevelDataElement !== null) {
            allLevelDataElement.forEach((el) => el.classList.remove('_active'));
        }
        if (levelDataElement !== null) {
            levelDataElement.classList.add('_active');
        }
        if (carpetWrapper !== null) {
            carpetWrapper.innerHTML = LEVELS_DATA[level - 1].htmlCodeGameBoard;
        }
        setTimeout(() => {
            const hideElements = document.querySelectorAll('.hide');
            if (hideElements !== null) {
                hideElements.forEach((el) => el.classList.add('_visible'));
            }
        }, 400);

        this.checkerAnswers.delEventsCheckAnswer();
        this.checkerAnswers.startCheckerAnswers();
    }
}

export default DrawerLevel;
