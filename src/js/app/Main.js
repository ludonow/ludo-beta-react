import React from 'react';
import styled from 'styled-components';

const MainWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin: 70px auto 0 auto;
    position: relative;

    /* @media (max-width: 767px) {
        margin: 100px auto 0 auto;
    } */
`;

const Main = ({
    children,
    handleScrollEvent
}) => (
    <MainWrapper onScroll={handleScrollEvent}>
        {children}
    </MainWrapper>
);

export default Main;
