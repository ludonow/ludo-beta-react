import React, { Component } from 'react';
import styled from 'styled-components';

import cameraIconSrc from '../../../images/active/camera-icon.png';
import videoIconSrc from '../../../images/active/video-icon.png';

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
    handleReportTypeClick,
}) => (
    <IconButtonListWrapper>
        <IconButtonWrapper firstItem>
            <img
                data-payload="image"
                onClick={handleReportTypeClick}
                src={cameraIconSrc}
                title="圖片回報"
            />
        </IconButtonWrapper>
        <IconButtonWrapper lastItem>
            <img
                data-payload="video"
                onClick={handleReportTypeClick}
                src={videoIconSrc}
                title="影片回報"
            />
        </IconButtonWrapper>
    </IconButtonListWrapper>
);

export default TypeSelectButtonList;
