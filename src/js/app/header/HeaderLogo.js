import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import styled from 'styled-components';

import imageLogo from '../../../images/Ludo_logo.png';

const screenWidth = window.innerWidth;
const rightSidebarWidth = 0;
const cardPadding = 7;
const gridItemWidth = 210 + 2*cardPadding;
const mainWidth = screenWidth - rightSidebarWidth;
const contentPaddingX = Math.round( (mainWidth - 5 * gridItemWidth)/2 );
const logoLeft = contentPaddingX;

const HeeaderLudoLogo = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;

    @media (max-width: 767px) {
        width: 100%;
        position: absolute;
        justify-content: center;
    }

    @media (min-width: 768px) and (max-width: 991px) {
        position: relative;
        margin-left: 8vw;
	}

    @media (min-width: 992px) {
        position: relative;
        margin-left: 125px;
	}
    
    & > img {
        position: relative;
        height: 40%;
    }
`;

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
            <HeeaderLudoLogo
                onClick={this.handleLogoLink}
            >
                <img src={imageLogo} />
            </HeeaderLudoLogo>
        );
    }
}