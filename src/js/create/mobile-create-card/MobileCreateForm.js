import React, { Component, PropTypes } from 'react';

import CreateFormTextField from './CreateFormTextField';
import DaySlider from './DaySlider';

const MobileCreateForm = ({
    duration,
    handleDurationChange,
    handleIntroductionChange,
    handleTagAdd,
    handleTagDelete,
    handleTitleChange,
    step,
    tags
}) => {
    switch (step) {
        case 0:
            return (
                <CreateFormTextField
                    handleIntroductionChange={handleIntroductionChange}
                    handleTagAdd={handleTagAdd}
                    handleTagDelete={handleTagDelete}
                    handleTitleChange={handleTitleChange}
                    tags={tags}
                />
            );
        case 1:
            return (
                <DaySlider 
                    duration={duration}
                    handleDurationChange={handleDurationChange}
                />
            );
    }
}

MobileCreateForm.propTypes = {
    duration: PropTypes.number.isRequired,
    handleDurationChange: PropTypes.func.isRequired,
    handleIntroductionChange: PropTypes.func.isRequired,
    handleTagAdd: PropTypes.func.isRequired,
    handleTagDelete: PropTypes.func.isRequired,
    handleTitleChange: PropTypes.func.isRequired,
    step: PropTypes.number.isRequired,
    tags: PropTypes.array.isRequired
};

export default MobileCreateForm;
