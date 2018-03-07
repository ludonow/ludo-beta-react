import React from 'react';
import MediaQuery from 'react-responsive';
import styled from 'styled-components';

import { baseUrl } from '../baseurl-config';
import Button from '../components/Button';
import { StyledLink } from '../baseStyle';
import tutorialOpen from '../../images/tutorial/open.png';
import SlideShow from './SlideShow';

const ButtonWrapper = styled.div`
    align-items: flex-end;
    display: flex;
    height: 100%;
    justify-content: center;
`;

const ImageWrapper = styled.div`
    display: flex;
    justify-content: center;

    img {
        height: 100%;
        max-height: 1600px;
        max-width: 1000px;
        position: absolute;
        z-index: -1;
    }
`;

const Wrapper = styled.div`
    height: calc(100vh - 70px);
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
                    margin="0 auto 50px auto"
                />
            </StyledLink>
        </ButtonWrapper>
    </Wrapper>
);

export default Tutorial;
