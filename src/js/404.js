import React from 'react';
import styled from 'styled-components';

import { baseUrl } from './baseurl-config';
import Button from './components/Button';
import { StyledLink } from './baseStyle';

const BackGround = styled.div`
    color: rgba(255, 255, 255, 0.2);
    font-family: Helvetica;
    font-size: 400px;
`;

const BackGroundWrapper = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    z-index: -1;
`;

const ButtonWrapper = styled.div`
    bottom: 0;
    margin-bottom: 20px;
    position: fixed;
    width: 100%;
`;

const Description = styled.div`
    align-items: center;
    color: white;
    display: flex;
    font-size: 48px;
    font-weight: bold;
    height: 100%;
    justify-content: center;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: calc(100vh - 40px);
    margin-top: -30px;
    justify-content: center;
    text-align: center;
    width: 100%;
`;

const NotFoundPage = () => (
    <Wrapper>
        <Description>
            找不到此頁面
        </Description>
        <BackGroundWrapper>
            <BackGround>
                404
            </BackGround>
        </BackGroundWrapper>
        <ButtonWrapper>
            <StyledLink to={`${baseUrl}/cardList`}>
                <Button
                    label="回首頁"
                />
            </StyledLink>
        </ButtonWrapper>
    </Wrapper>
);

export default NotFoundPage;
