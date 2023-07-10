import Header from './header.html';
import './header.scss';
import htmlToElement from '../../../utils';
import { PageElement } from '../../../types';

const header: PageElement = htmlToElement(Header);

export default header;
