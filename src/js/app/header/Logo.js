import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import styled from 'styled-components';

import logoImage from '../../../images/Ludo_logo.png';

const StyledLogo = styled.div`
    align-items: center;
    cursor: pointer;
    display: flex;
    height: 100%;

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
        & > img {
            width: 52px;
        }
    }
    
    & > img {
        position: relative;
        height: 40%;
    }
`;

export default class Logo extends Component {
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
            <StyledLogo
                onClick={this.handleLogoLink}
            >
                <img src={logoImage} />
            </StyledLogo>
        );
    }
}