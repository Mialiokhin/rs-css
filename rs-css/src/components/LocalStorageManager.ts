import { LEVEL_INDEX } from '../const';

class LocalStorageManager {
    static getLevel() {
        return Number(localStorage.getItem('level')) || LEVEL_INDEX.FIRST;
    }

    static setLevel(level: number) {
        localStorage.setItem('level', `${level}`);
    }

    static getWonWithHelp() {
        return JSON.parse(localStorage.getItem('wonWithHelp') || '[]');
    }

    static addWonWithHelp(level: number | number[]) {
        const wonWithHelp = this.getWonWithHelp();
        if (!wonWithHelp.includes(level)) {
            wonWithHelp.push(level);
            localStorage.setItem('wonWithHelp', JSON.stringify(wonWithHelp));
        }
    }

    static getWonLevels() {
        return JSON.parse(localStorage.getItem('wonLevels') || '[]');
    }

    static addWonLevel(level: number | number[]) {
        const wonLevels = this.getWonLevels();
        if (!wonLevels.includes(level)) {
            wonLevels.push(level);
            localStorage.setItem('wonLevels', JSON.stringify(wonLevels));
        }
    }

    static resetProgress(wonLevels: number[], wonWithHelp: number[]) {
        localStorage.setItem('wonLevels', `${wonLevels}`);
        localStorage.setItem('wonWithHelp', `${wonWithHelp}`);
    }
}

export default LocalStorageManager;
