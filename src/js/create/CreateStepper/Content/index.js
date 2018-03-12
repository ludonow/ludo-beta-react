import React, { Component } from 'react';

import BasicDataForm from './BasicDataForm/index';
import BonusPeriodSelectForm from '../../BonusPeriodSelectForm';
import CardPreview from '../../CardPreview';
import Draft from '../../../active/desktop-report-post/Draft';
import TypeSelectButtonList from '../../../components/TypeSelectButtonList';
import cameraIconSrc from '../../../../images/active/camera-icon.png';
import videoIconSrc from '../../../../images/active/video-icon.png';

const iconInfoList = [
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

const Content = ({
    contentType,
    duration,
    handleCheckPointChange,
    handleContentTypeSelect,
    handleDurationChange,
    handleImageChange,
    handleImageResize,
    handleIntroductionChange,
    handlePeriodChange,
    handleStepNext,
    handleTagAdd,
    handleTagDelete,
    handleTitleChange,
    handleVideoChange,
    imageLocation,
    images,
    interval,
    introduction,
    isAtTemplatePage,
    period,
    resizedHeight,
    resizedWidth,
    setImageLocation,
    step,
    tags,
    title,
    video,
}) => {
    switch (step) {
        case 0:
            return (
                <BasicDataForm
                    duration={duration}
                    handleCheckPointChange={handleCheckPointChange}
                    handleDurationChange={handleDurationChange}
                    handleTagAdd={handleTagAdd}
                    handleTagDelete={handleTagDelete}
                    handleTitleChange={handleTitleChange}
                    interval={interval}
                    step={step}
                    tags={tags}
                    title={title}
                />
            )
        case 1:
            return (
                <TypeSelectButtonList
                    handleTypeSelect={handleContentTypeSelect}
                    iconInfoList={iconInfoList}
                />
            )
        case 2:
            return (
                <Draft
                    handleImageChange={handleImageChange}
                    handleImageResize={handleImageResize}
                    handleStepNext={handleStepNext}
                    handleTextChange={handleIntroductionChange}
                    handleVideoChange={handleVideoChange}
                    imageLocation={imageLocation}
                    images={images}
                    reportType={contentType}
                    resizedHeight={resizedHeight}
                    resizedWidth={resizedWidth}
                    setImageLocation={setImageLocation}
                    text={introduction}
                    video={video}
                />
            )
        case 3:
            return (
                <BonusPeriodSelectForm
                    handlePeriodChange={handlePeriodChange}
                    period={period}
                />
            )
        case 4:
            return (
                <CardPreview
                    duration={duration}
                    interval={interval}
                    introduction={introduction}
                    isAtTemplatePage={isAtTemplatePage}
                    period={period}
                    tags={tags}
                    title={title}
                />
            )
        default:
            return (
                <div>錯誤</div>
            )
    }
}

export default Content;
