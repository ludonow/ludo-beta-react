import React from 'react';
import styled from 'styled-components';

const HamburgerIconWrapper = styled.div`
    display: inline-block;
    margin: 13px 15px;
    position: relative;

    span {
        background: #cdcdcd;
        border-radius: 3px;
        display: block;
        height: 1px;
        margin-bottom: 5px;
        position: relative;
        transform-origin: 4px 0px;
        transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                    background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                    opacity 0.55s ease;
        width: 15px;
        z-index: 1;
    }
`;

const HamburgerIcon = () => (
    <HamburgerIconWrapper>
        <span></span>
        <span></span>
        <span></span>
    </HamburgerIconWrapper>
)

export default HamburgerIcon;
