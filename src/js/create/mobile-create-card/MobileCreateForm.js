import React, { PropTypes } from 'react';

import BonusPeriodSelectForm from '../BonusPeriodSelectForm';
import CardPreview from '../CardPreview';
import CreateFormTextField from './CreateFormTextField';
import DayForm from './DayForm';
import Draft from '../../components/Draft';
import LoadingIcon from '../../components/LoadingIcon';
import TypeSelectButtonList from '../../components/TypeSelectButtonList';

const MobileCreateForm = ({
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
    isSubmitting,
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
                <CreateFormTextField
                    handleIntroductionChange={handleIntroductionChange}
                    handleTagAdd={handleTagAdd}
                    handleTagDelete={handleTagDelete}
                    handleTitleChange={handleTitleChange}
                    introduction={introduction}
                    title={title}
                    tags={tags}
                />
            );
        case 1:
            return (
                <DayForm
                    duration={duration}
                    interval={interval}
                    handleCheckPointChange={handleCheckPointChange}
                    handleDurationChange={handleDurationChange}
                />
            );
        case 2:
            return (
                <TypeSelectButtonList handleTypeSelect={handleContentTypeSelect} />
            );
        case 3:
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
        case 4:
            return (
                <BonusPeriodSelectForm
                    handlePeriodChange={handlePeriodChange}
                    period={period}
                />
            );
        case 5:
            return (
                <div>
                    {
                        isSubmitting ?
                            <LoadingIcon />
                        :
                            <CardPreview
                                duration={duration}
                                interval={interval}
                                introduction={introduction}
                                isAtTemplatePage={isAtTemplatePage}
                                period={period}
                                tags={tags}
                                title={title}
                            />
                    }
                </div>
            );
    }
}

MobileCreateForm.propTypes = {
    contentType: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    handleCheckPointChange: PropTypes.func.isRequired,
    handleContentTypeSelect: PropTypes.func.isRequired,
    handleDurationChange: PropTypes.func.isRequired,
    handleImageChange: PropTypes.func.isRequired,
    handleImageResize: PropTypes.func.isRequired,
    handleIntroductionChange: PropTypes.func.isRequired,
    handlePeriodChange: PropTypes.func.isRequired,
    handleStepNext: PropTypes.func.isRequired,
    handleTagAdd: PropTypes.func.isRequired,
    handleTagDelete: PropTypes.func.isRequired,
    handleTitleChange: PropTypes.func.isRequired,
    handleVideoChange: PropTypes.func.isRequired,
    imageLocation: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired,
    interval: PropTypes.number.isRequired,
    introduction: PropTypes.string.isRequired,
    isAtTemplatePage: PropTypes.bool.isRequired,
    period: PropTypes.string.isRequired,
    resizedHeight: PropTypes.number.isRequired,
    resizedWidth: PropTypes.number.isRequired,
    setImageLocation: PropTypes.func.isRequired,
    step: PropTypes.number.isRequired,
    tags: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    video: PropTypes.string.isRequired,
};

export default MobileCreateForm;
