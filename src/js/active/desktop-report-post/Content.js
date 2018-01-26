import React from 'react';
import styled from 'styled-components';

import EmptyDraft from './EmptyDraft';

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

const Content = ({
    handleDialogClose,
    handleStepNext,
    handleStepPrev,
    reportType,
    step
}) => {
    switch (step) {
        case 0:
            return (
                <IconButtonListWrapper>
                    <IconButtonWrapper firstItem>
                        <img
                            data-attr="image"
                            onClick={handleStepNext}
                            src={cameraIconSrc}
                            title="圖片回報"
                        />
                    </IconButtonWrapper>
                    <IconButtonWrapper lastItem>
                        <img
                            data-attr="video"
                            onClick={handleStepNext}
                            src={videoIconSrc}
                            title="影片回報"
                        />
                    </IconButtonWrapper>
                </IconButtonListWrapper>
            );
        case 1:
            return (
                <EmptyDraft
                    reportType={reportType}
                />
            );
    }
} 

export default Content;
