import HtmlViewer from './game-level.html';
import './game-level.scss';
import htmlToElement from '../../../../utils';
import { PageElement } from '../../../../types';

const gameLevel: PageElement = htmlToElement(HtmlViewer);

export default gameLevel;
