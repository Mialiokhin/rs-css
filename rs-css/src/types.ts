import LEVELS_DATA from './components/levelsData';

export type PageElement = ChildNode | null;

export interface LevelsData {
    level: number;
    htmlCode: string;
    htmlCodeGameBoard: string;
    cssSelector: string[];
    task: string;
}

export type OnLevelChangedCallback = ((newLevel: number) => void) | null;

export type OnLevelWonWithHelpCallback = (() => void) | null;

export enum LevelIndex {
    FIRST = 1,
    LAST = LEVELS_DATA.length,
    INCREMENT = 1,
    NUMBER_OF_LEVELS = LEVELS_DATA.length,
}

export enum autoTypingAnswerText {
    START_INDEX = 0,
    TYPING_SPEED = 150,
    INCREMENT = 1,
}
