import React from 'react';
import styled from 'styled-components';

import TypeSelectButtonList from '../../components/TypeSelectButtonList';
import Draft from './Draft';
import ErrorMessage from './ErrorMessage';
import ReportPreview from './ReportPreview';

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
    reportType,
    resizedHeight,
    resizedWidth,
    setImageLocation,
    step,
    text,
    video,
}) => {
    switch (step) {
        case 0:
            return (
                <TypeSelectButtonList handleTypeSelect={handleReportTypeClick} />
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
