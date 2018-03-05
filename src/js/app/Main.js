import React from 'react';
import styled from 'styled-components';
import MediaQuery from 'react-responsive';

const MainWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin: 70px auto 0 auto;
    position: relative;

    /* @media (max-width: 767px) {
        margin: 100px auto 0 auto;
    } */
`;

const MobileMainWrapper = styled.div`
    margin: 70px auto 0 auto;
    position: relative;
`;

const Main = ({
    children,
    handleScrollEvent
}) => (
    <div>
        <MediaQuery minWidth={769}>
            <MainWrapper onScroll={handleScrollEvent}>
                {children}
            </MainWrapper>
        </MediaQuery>
        <MediaQuery maxWidth={768}>
            <MobileMainWrapper onScroll={handleScrollEvent}>
                {children}
            </MobileMainWrapper>
        </MediaQuery>
    </div>
);

export default Main;
