import HtmlViewer from './html-viewer.html';
import './html-viewer.scss';
import htmlToElement from '../../../../utils';
import { PageElement } from '../../../../types';

const htmlViewer: PageElement = htmlToElement(HtmlViewer);

export default htmlViewer;
