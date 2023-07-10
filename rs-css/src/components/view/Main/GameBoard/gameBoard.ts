import GameBoard from './game-board.html';
import './game-board.scss';
import './selectors.scss';
import htmlToElement from '../../../../utils';
import { PageElement } from '../../../../types';

const gameBoard: PageElement = htmlToElement(GameBoard);

export default gameBoard;
