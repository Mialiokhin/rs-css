import { PageElement } from './types';

export default function htmlToElement(htmlString: PageElement): PageElement {
    if (htmlString !== null) {
        const template = document.createElement('template');
        template.innerHTML = htmlString as unknown as string;
        return template.content.firstChild;
    }
    return null;
}
