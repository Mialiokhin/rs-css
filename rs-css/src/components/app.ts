import LevelDrawer from './levelDrawer';
import LevelChooser from './levelChooser';
import Helper from './helper';
import CheckerAnswers from './checkerAnswers';
import LevelCreator from './levelCreator';
import LEVELS_DATA from './levelsData';
import LocalStorageManager from './LocalStorageManager';

class App {
    private level: number;
    private levelDrawer: LevelDrawer;
    private levelChooser: LevelChooser;
    private helper: Helper;
    private checkerAnswers: CheckerAnswers;

    constructor() {
        this.level = LocalStorageManager.getLevel();
        this.levelChooser = new LevelChooser();
        this.helper = new Helper();
        this.checkerAnswers = new CheckerAnswers();
        this.levelDrawer = new LevelDrawer();
    }

    start(): void {
        LocalStorageManager.setLevel(this.level);
        LevelCreator.createLevels(LEVELS_DATA);
        this.levelChooser.setOnLevelChangedCallback(this.onLevelChanged);
        this.helper.onLevelWonWithHelpCallbackSet(this.onLevelWonWithHelp);
        this.checkerAnswers.onLevelWon(this.onLevelWon);
        this.checkerAnswers.onLevelLost(this.onLevelLost);
        this.levelDrawer.drawLevel(this.level);
        this.levelChooser.ifLevelChanged();
        this.helper.attachToElements('[data-helper]');
        this.helper.resetProgress();
        this.checkerAnswers.startCheckerAnswers();
        this.helper.updateWonStyle();
        this.helper.addListenerToHelpButton();
    }

    private onLevelChanged = (newLevel: number): void => {
        this.level = newLevel;
        LocalStorageManager.setLevel(newLevel);
        this.levelDrawer.drawLevel(this.level);
        this.helper.attachToElements('[data-helper]');
        this.helper.clearInput();
    };

    public onLevelWonWithHelp = (): void => {
        const wonWithHelp: number[] = LocalStorageManager.getWonWithHelp();
        if (!wonWithHelp.includes(this.level)) {
            wonWithHelp.push(this.level);
            LocalStorageManager.addWonWithHelp(this.level);
        }
    };

    private onLevelWon = (): void => {
        this.helper.animateElementsOffScreen();
        setTimeout(() => {
            this.updateWonLevels();
            this.helper.updateWonStyle();
            this.onLevelChanged(this.levelChooser.getNextLevel());
            this.helper.ifAllLevelsPassed();
        }, 1000);
    };

    private onLevelLost = (): void => {
        this.helper.anamationLost();
        console.log('You lost.');
    };

    private updateWonLevels(): void {
        const wonLevels: number[] = LocalStorageManager.getWonLevels();
        if (!wonLevels.includes(this.level)) {
            wonLevels.push(this.level);
            LocalStorageManager.addWonLevel(this.level);
        }
    }
}

export default App;
