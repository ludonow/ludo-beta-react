import React, { Component, PropTypes } from 'react';

import CardPreview from './CardPreview';
import CategorySelector from './CategorySelector';
import CreateFormTextField from './CreateFormTextField';
import DayForm from './DayForm';

const MobileCreateForm = ({
    categoryId,
    duration,
    handleCategoryChange,
    handleCheckPointChange,
    handleDurationChange,
    handleIntroductionChange,
    handleTagAdd,
    handleTagDelete,
    handleTitleChange,
    interval,
    introduction,
    step,
    tags,
    title
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
                <CategorySelector
                    categoryId={categoryId}
                    handleCategoryChange={handleCategoryChange}
                />
            );
        case 3:
            return (
                <CardPreview
                    categoryId={categoryId}
                    duration={duration}
                    introduction={introduction}
                    tags={tags}
                    title={title}
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
