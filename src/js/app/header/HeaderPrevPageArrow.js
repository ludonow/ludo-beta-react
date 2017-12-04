import React from 'react';
import { browserHistory } from 'react-router';
import styled from 'styled-components';

import imageBack from '../../../images/header/back.png';

const HeaderLeftArrowContainer = styled.div`
    width: 10%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;

    & > img {
        height: 50%;
        padding-left: 10px;
    }
`;

const HeaderPrevPageArrow = () => (
    <HeaderLeftArrowContainer
        onTouchTap={browserHistory.goBack}
    >
        <img src={imageBack}/>
    </HeaderLeftArrowContainer>
);

export default HeaderPrevPageArrow;
