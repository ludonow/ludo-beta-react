import React, { Component } from 'react';
import styled from 'styled-components';

import eyeIcon from '../../images/circle_button/eye.png';
import penIcon from '../../images/circle_button/pen.svg';
import plusIcon from '../../images/circle_button/plus.png';
import rightArrowIcon from '../../images/circle_button/right-arrow.png';

const Wrapper = styled.div`
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;

    img {
        width: 20px;
    }
`;

const RightArrowWrapper = Wrapper.extend`
    img {
        height: 20px;
        width: 10px;
    }
`;

const CircleButton = ({
    stage,
}) => {
    switch (stage) {
        case 0:
            return (
                <Wrapper>
                    <img src={penIcon} />
                </Wrapper>
            );
        case 1:
            return (
                <Wrapper>
                    <img src={plusIcon} />
                </Wrapper>
            );
            case 2:
            return (
                <Wrapper>
                    <img src={eyeIcon} />
                </Wrapper>
            );
        case 3:
        default:
            return (
                <RightArrowWrapper>
                    <img src={rightArrowIcon} />
                </RightArrowWrapper>
            );
    }
}

export default CircleButton;
