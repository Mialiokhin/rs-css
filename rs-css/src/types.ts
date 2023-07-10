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
