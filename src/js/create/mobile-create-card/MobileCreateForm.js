import React, { Component } from 'react';

import CreateFormTextField from './CreateFormTextField';
import DaySlider from './DaySlider';

const MobileCreateForm = ({
    handleIntroductionChange,
    handleTagAdd,
    handleTagDelete,
    handleTitleChange,
    step,
    tags
}) => {
    switch (step) {
        case 0:
            return <CreateFormTextField
                        handleIntroductionChange={handleIntroductionChange}
                        handleTagAdd={handleTagAdd}
                        handleTagDelete={handleTagDelete}
                        handleTitleChange={handleTitleChange}
                        tags={tags}
                    />
        case 1:
            return <DaySlider />
    }
}

export default MobileCreateForm;
