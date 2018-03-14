import React, { PropTypes } from 'react';

import BonusPeriodSelectForm from '../BonusPeriodSelectForm';
import CardPreview from '../CardPreview';
import CreateFormTextField from './CreateFormTextField';
import DayForm from './DayForm';
import TypeSelectButtonList from '../../components/TypeSelectButtonList';

const MobileCreateForm = ({
    duration,
    handleCheckPointChange,
    handleDurationChange,
    handleIntroductionChange,
    handlePeriodChange,
    handleTagAdd,
    handleTagDelete,
    handleTitleChange,
    interval,
    introduction,
    isAtTemplatePage,
    period,
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
                <BonusPeriodSelectForm
                    handlePeriodChange={handlePeriodChange}
                    period={period}
                />
            );
        case 3:
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
