import React from "react";
import { browserHistory } from "react-router";
import Playground from '../../playground/Playground';

import imageLogo from '../../../images/Ludo_logo.png';

export default class HeaderLogo extends React.Component {
    handleLogoLink() {
        browserHistory.push(`/playground`);
    }

    render() {
        return (
            <div className="header-Ludo-logo" style={style} onClick={this.handleLogoLink}>
                <img src={imageLogo} className="header-Ludo-logo__icon"/>
            </div>
        );
    }
};

const screenWidth = window.innerWidth;
const rightSidebarWidth = 100;
const cardPadding = 5;
const gridItemWidth = 210 + 2*cardPadding;
const mainWidth = screenWidth - rightSidebarWidth;
const totalColumn = Math.floor(mainWidth / gridItemWidth);
const contentPaddingX = Math.round( (mainWidth - totalColumn * gridItemWidth)/2 );
const logoLeft = contentPaddingX + cardPadding;

const style = {
    left: `${logoLeft}px`
};