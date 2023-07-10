import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../common.scss';
import BodyWrapper from './BodyWrapper/bodyWrapper';
import Main from './Main/main';
import Header from './Header/header';
import GameBoard from './Main/GameBoard/gameBoard';
import CssEditor from './Main/CssEditor/cssEditor';
import HtmlViewer from './Main/HtmlViewer/htmlViewer';
import GameLevel from './Main/GameLevel/gameLevel';
import Footer from './Footer/footer';
import CodepenBackground from './СodepenBackground/codepenBackground';

export default function view(): void {
    if (BodyWrapper && Header) {
        BodyWrapper.appendChild(Header);
    }
    if (Main && GameBoard && CssEditor && HtmlViewer && GameLevel) {
        Main.appendChild(GameBoard);
        Main.appendChild(CssEditor);
        Main.appendChild(HtmlViewer);
        Main.appendChild(GameLevel);
    }

    if (BodyWrapper && Main) {
        BodyWrapper.appendChild(Main);
    }
    if (BodyWrapper && Footer) {
        BodyWrapper.appendChild(Footer);
    }
    if (BodyWrapper && CodepenBackground) {
        document.body.append(BodyWrapper);
        document.body.append(CodepenBackground);
    }
}
