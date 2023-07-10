import CssEditor from './css-editor.html';
import './css-editor.scss';
import htmlToElement from '../../../../utils';
import { PageElement } from '../../../../types';

const cssEditor: PageElement = htmlToElement(CssEditor);

export default cssEditor;
