import React from 'react';
import styled from 'styled-components';

import HamburgerIcon from './HamburgerIcon';
import Logo from './HeaderLogo';

const HeaderLeftWrapper = styled.div`
    align-items: center;
    display: inline-flex;
    height: 40px;
    justify-content: space-between;
`;

const HeaderLeft = ({
    getFilteredLudoList
}) => (
    <HeaderLeftWrapper>
        <HamburgerIcon />
        <Logo 
            getFilteredLudoList={getFilteredLudoList}
        />
    </HeaderLeftWrapper>
);

export default HeaderLeft;
