import React, { Component } from 'react';
import styled from 'styled-components';

import BasicDataForm from './BasicDataForm/index';
import BonusPeriodSelectForm from './BonusPeriodSelectForm';
import CardPreview from '../../CardPreview';
import Draft from '../../../active/desktop-report-post/Draft';
import TypeSelectButtonList from '../../../active/desktop-report-post/TypeSelectButtonList';

// styled components

const Content = ({
    duration,
    form,
    handleCheckPointChange,
    handleDurationChange,
    handleFormSelect,
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
                    handleReportTypeClick={handleFormSelect}
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
                    reportType={form}
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
