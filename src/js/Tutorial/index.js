import React from 'react';
import MediaQuery from 'react-responsive';
import styled from 'styled-components';

import { baseUrl } from '../baseurl-config';
import Button from '../components/Button';
import { StyledLink } from '../baseStyle';
import tutorialOpen from '../../images/tutorial/open.svg';
import SlideShow from './SlideShow';

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: flex-end;
    position: absolute;
    width: 100%;
`;

const ImageWrapper = styled.div`
    display: flex;
    height: 100%;
    justify-content: center;
    position: absolute;
    width: 100%;

    img {
        height: 100%;
        max-height: 1600px;
        max-width: 1000px;
        z-index: -1;
    }
`;

const Wrapper = styled.div`
    display: flex;
    height: calc(100vh - 70px);
    width: 100%;
`;

const Tutorial = () => (
    <Wrapper>
        <ImageWrapper>
            <img src={tutorialOpen} />
        </ImageWrapper>
        <ButtonWrapper>
            <StyledLink to={`${baseUrl}/tutorial/slide-show`}>
                <Button
                    label="開始"
                    margin="0 auto 10px auto"
                />
            </StyledLink>
            <StyledLink to={`${baseUrl}/cardList`}>
                <Button
                    label="跳過教學"
                    margin="0 auto 10px auto"
                />
            </StyledLink>
        </ButtonWrapper>
    </Wrapper>
);

export default Tutorial;
