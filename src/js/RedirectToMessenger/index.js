import React from 'react';
import styled from 'styled-components';
import { StyledAnchor } from '../baseStyle';
import Button from '../components/Button';

const Title = styled.div`
    margin-bottom: 20px;
`;

const Wrapper = styled.div`
    text-align: center;
`;

const RedirectToMessenger = () => (
    <Wrapper>
        <Title>
            登入成功
        </Title>
        <StyledAnchor href="https://m.me/ludonow">
            <Button label="回即時通" />
        </StyledAnchor>
    </Wrapper>
);

export default RedirectToMessenger;
