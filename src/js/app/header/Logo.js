import React from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';

import logoImage from '../../../images/Ludo_logo.png';

const StyledLink = styled(Link)`
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

/* components/_header-logo.scss */
const Logo = () => (
    <StyledLink to="/cardList">
        <img src={logoImage} />
    </StyledLink>
);

export default Logo;
