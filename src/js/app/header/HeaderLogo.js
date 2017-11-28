import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import imageLogo from '../../../images/Ludo_logo.png';

const screenWidth = window.innerWidth;
const rightSidebarWidth = 0;
const cardPadding = 7;
const gridItemWidth = 210 + 2*cardPadding;
const mainWidth = screenWidth - rightSidebarWidth;
const contentPaddingX = Math.round( (mainWidth - 5 * gridItemWidth)/2 );
const logoLeft = contentPaddingX;

export default class HeaderLogo extends Component {
    constructor(props) {
        super(props);
        this.handleLogoLink = this.handleLogoLink.bind(this);
    }

    handleLogoLink() {
        this.props.getFilteredLudoList();
        browserHistory.push('/playground');
    }

    render() {
        return (
            /* components/_header-logo.scss */
            <div
                className="header-Ludo-logo"
                onClick={this.handleLogoLink}
            >
                <img
                    className="header-Ludo-logo__icon"
                    src={imageLogo}
                />
            </div>
        );
    }
}