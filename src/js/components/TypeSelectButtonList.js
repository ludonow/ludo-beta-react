import React, { Component } from 'react';
import styled from 'styled-components';

const IconButtonListWrapper = styled.div`
    display: inline-flex;
    justify-content: center;
    margin-bottom: 50px;
    width: 100%;
`;

const IconButtonWrapper = styled.div`
    align-items: center;
    border-left: ${props => props.firstItem ? 'none' : '1px #C9C9C9 solid'};
    border-right: ${props => props.lastItem ? 'none' : '1px #C9C9C9 solid'};
    display: flex;
    height: 12.5vw;
    justify-content: center;
    width: 100%;
    
    img {
        cursor: pointer;
        height: 125px;
        width: 155px;
    }
`;

const TypeSelectButtonList = ({
    handleTypeSelect,
    iconInfoList,
}) => (
    <IconButtonListWrapper>
        {
            iconInfoList.map((iconInfo, index) => (
                <IconButtonWrapper
                    firstItem={index === 0}
                    lastItem={index === iconInfoList.length}
                >
                    <img
                        data-payload={iconInfo.payload}
                        onClick={handleTypeSelect}
                        src={iconInfo.src}
                        title={iconInfo.title}
                    />
                </IconButtonWrapper>
            ))
        }
    </IconButtonListWrapper>
);

export default TypeSelectButtonList;
