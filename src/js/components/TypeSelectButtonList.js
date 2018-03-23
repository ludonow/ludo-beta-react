import React, { Component } from 'react';
import styled from 'styled-components';

import cameraIconSrc from '../../images/camera-icon.png';
import videoIconSrc from '../../images/video-icon.png';

const defaultIconInfoList = [
    {
        payload: 'image',
        src: cameraIconSrc,
        title: '圖片形式'
    },
    {
        payload: 'video',
        src: videoIconSrc,
        title: '影片形式'
    }
];

const IconButtonListWrapper = styled.div`
    width: 100%;

    @media (max-width: 768px) {
        align-items: center;
        display: flex;
        flex-direction: column;
    }
    @media (min-width: 769px) {
        display: inline-flex;
        justify-content: center;
        margin-bottom: 50px;
    }
`;

const IconButtonWrapper = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    width: 100%;

    @media (max-width: 768px) {
        border-bottom: ${props => props.lastItem ? 'none' : '1px #C9C9C9 solid'};
        border-top: ${props => props.firstItem ? 'none' : '1px #C9C9C9 solid'};
        padding: 30px 0;
    }
    @media (min-width: 769px) {
        border-left: ${props => props.firstItem ? 'none' : '1px #C9C9C9 solid'};
        border-right: ${props => props.lastItem ? 'none' : '1px #C9C9C9 solid'};
        height: 12.5vw;
    }
    
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
                    lastItem={index === (iconInfoList.length - 1)}
                    key={`type-${index}`}
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

TypeSelectButtonList.defaultProps = {
    iconInfoList: defaultIconInfoList,
};

export default TypeSelectButtonList;
