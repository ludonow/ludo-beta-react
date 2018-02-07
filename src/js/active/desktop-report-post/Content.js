import React from 'react';
import styled from 'styled-components';

import Draft from './Draft';
import ErrorMessage from './ErrorMessage';
import ReportPreview from './ReportPreview';

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
    handleImageChange,
    handleImageResize,
    handleReportTypeClick,
    handleStepNext,
    handleStepPrev,
    handleTextChange,
    handleVideoChange,
    imageLocation,
    images,
    ludoId,
    reportType,
    resizedHeight,
    resizedWidth,
    setImageLocation,
    step,
    text,
    video
}) => {
    switch (step) {
        case 0:
            return (
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
        case 1:
            return (
                <Draft
                    handleImageChange={handleImageChange}
                    handleImageResize={handleImageResize}
                    handleStepNext={handleStepNext}
                    handleTextChange={handleTextChange}
                    handleVideoChange={handleVideoChange}
                    imageLocation={imageLocation}
                    images={images}
                    ludoId={ludoId}
                    reportType={reportType}
                    resizedHeight={resizedHeight}
                    resizedWidth={resizedWidth}
                    setImageLocation={setImageLocation}
                    text={text}
                    video={video}
                />
            );
        case 2:
            return (
                <ReportPreview
                    imagePreviewUrl={images[0] ? images[0].preview : ''}
                    reportType={reportType}
                    resizedHeight={resizedHeight}
                    resizedWidth={resizedWidth}
                    text={text}
                    video={video}
                />
            );
        default:
            return (
                <ErrorMessage />
            );
    }
} 

export default Content;
