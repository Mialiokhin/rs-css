import DrawerLevel from './drawerLevel';
import ChooseLevel from './chooseLevel';
import Helper from './helper';
import CheckerAnswers from './checkerAnswers';
import CreateGameLevel from './createGameLevel';
import LEVELS_DATA from './levelsData';
import { LevelIndex } from '../types';

class App {
    private level: number;
    private drawerLevel: DrawerLevel;
    private chooseLevel: ChooseLevel;
    private helper: Helper;
    private checkerAnswers: CheckerAnswers;
    private createGameLevel: CreateGameLevel;

    constructor() {
        this.level = Number(localStorage.getItem('level')) || LevelIndex.FIRST;
        this.drawerLevel = new DrawerLevel();
        this.createGameLevel = new CreateGameLevel(LEVELS_DATA);
        this.chooseLevel = new ChooseLevel();
        this.chooseLevel.setOnLevelChangedCallback(this.onLevelChanged);
        this.helper = new Helper();
        this.helper.onLevelWonWithHelpCallbackSet(this.onLevelWonWithHelp);
        this.checkerAnswers = new CheckerAnswers();
        this.checkerAnswers.onLevelWon(this.onLevelWon);
        this.checkerAnswers.onLevelLost(this.onLevelLost);
    }

    start(): void {
        localStorage.setItem('level', `${this.level}`);
        this.createGameLevel.createLevelItems();
        this.drawerLevel.drawLevel(this.level);
        this.chooseLevel.ifLevelChanged();
        this.helper.attachToElements('[data-helper]');
        this.helper.resetProgress();
        this.checkerAnswers.startCheckerAnswers();
        this.helper.updateWonStyle();
        this.helper.addListenerToHelpButton();
    }

    private onLevelChanged = (newLevel: number): void => {
        this.level = newLevel;
        localStorage.setItem('level', `${newLevel}`);
        this.drawerLevel.drawLevel(this.level);
        this.helper.attachToElements('[data-helper]');
        this.helper.clearInput();
    };

    public onLevelWonWithHelp = () => {
        const wonWithHelp: number[] = JSON.parse(localStorage.getItem('wonWithHelp') || '[]');
        if (!wonWithHelp.includes(this.level)) {
            wonWithHelp.push(this.level);
            localStorage.setItem('wonWithHelp', JSON.stringify(wonWithHelp));
        }
    };

    private onLevelWon = (): void => {
        this.helper.animateElementsOffScreen();
        setTimeout(() => {
            this.updateWonLevels();
            this.helper.updateWonStyle();
            this.onLevelChanged(this.chooseLevel.getNextLevel());
            this.helper.ifAllLevelsPassed();
        }, 1000);
    };

    private onLevelLost = (): void => {
        this.helper.anamationLost();
        console.log('You lost.');
    };

    private updateWonLevels(): void {
        const wonLevels: number[] = JSON.parse(localStorage.getItem('wonLevels') || '[]');
        if (!wonLevels.includes(this.level)) {
            wonLevels.push(this.level);
            localStorage.setItem('wonLevels', JSON.stringify(wonLevels));
        }
    }
}

export default App;
