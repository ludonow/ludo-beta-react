import React from "react";
import { browserHistory } from "react-router";
import Playground from '../../playground/Playground';

import imageLogo from '../../../images/Ludo_logo.png';

const screenWidth = window.innerWidth;
const rightSidebarWidth = 0;
const cardPadding = 7;
const gridItemWidth = 210 + 2*cardPadding;
const mainWidth = screenWidth - rightSidebarWidth;
const contentPaddingX = Math.round( (mainWidth - 5 * gridItemWidth)/2 );
const logoLeft = contentPaddingX;

const style = {
    left: `${logoLeft}px`
};

export default class HeaderLogo extends React.Component {
    handleLogoLink() {
        browserHistory.push('/playground');
    }

    render() {
        return (
            <div
                className="header-Ludo-logo"
                onClick={this.handleLogoLink}
                style={style}
            >
                <img
                    className="header-Ludo-logo__icon"
                    src={imageLogo} 
                />
            </div>
        );
    }
}