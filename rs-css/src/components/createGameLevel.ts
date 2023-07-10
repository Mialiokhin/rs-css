import { LevelsData } from '../types';

class CreateGameLevel {
    levelsData: LevelsData[];

    constructor(levelsData: LevelsData[]) {
        this.levelsData = levelsData;
    }

    public createLevelItems(): void {
        const gameLevelContainer = document.querySelector('.game-level');
        if (!gameLevelContainer) return;

        this.levelsData.forEach((levelData) => {
            const { level } = levelData;
            const levelItem = document.createElement('div');
            levelItem.classList.add('game-level__item');
            levelItem.setAttribute('data-level', level.toString());

            const birdSpan = document.createElement('span');
            birdSpan.classList.add('bird');
            levelItem.appendChild(birdSpan);

            const levelNumberSpan = document.createElement('span');
            levelNumberSpan.classList.add('level', `level-${level}`);
            levelNumberSpan.textContent = level.toString();
            levelItem.appendChild(levelNumberSpan);

            gameLevelContainer.appendChild(levelItem);
        });

        const resetButton = document.createElement('button');
        resetButton.type = 'button';
        resetButton.classList.add('btn', 'btn-outline-secondary', 'game-level__reset');
        resetButton.textContent = 'Reset Progress';
        gameLevelContainer.appendChild(resetButton);
    }
}

export default CreateGameLevel;
