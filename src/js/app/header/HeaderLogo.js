import React from "react";
import { Link } from "react-router";
import Playground from '../../playground/Playground';

import imageLogo from '../../../images/Ludo_logo.png';

export default class HeaderLogo extends React.Component {
    render() {
        return (
            <Link to="Playground">
                <div className="header-Ludo-logo" style={style}>
                    <img src={imageLogo} className="header-Ludo-logo__icon"/>
                </div>
            </Link>
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