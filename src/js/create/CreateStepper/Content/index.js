import React, { Component } from 'react';
import styled from 'styled-components';

import BasicDataForm from './BasicDataForm/index';
import BonusPeriodSelectForm from './BonusPeriodSelectForm';
import CardPreview from '../../mobile-create-card/CardPreview';
import Draft from '../../../active/desktop-report-post/Draft';
import TypeSelectButtonList from '../../../active/desktop-report-post/TypeSelectButtonList';

// styled components

const Content = ({
    duration,
    handleCheckPointChange,
    handleDurationChange,
    handleImageChange,
    handleImageResize,
    handleIntroductionChange,
    handlePeriodChange,
    handleStepNext,
    handleTagAdd,
    handleTagDelete,
    handleTitleChange,
    handleTypeSelect,
    handleVideoChange,
    imageLocation,
    images,
    interval,
    introduction,
    period,
    resizedHeight,
    resizedWidth,
    setImageLocation,
    step,
    tags,
    title,
    type,
    video,
}) => {
    switch (step) {
        case 0:
            return (
                <BasicDataForm
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
                    handleReportTypeClick={handleTypeSelect}
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
                    reportType={type}
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
                    introduction={introduction}
                    tags={tags}
                    title={title}
                    singleLudoObject
                />
            )
        default:
            return (
                <div>錯誤</div>
            )
    }
}

export default Content;
