import React, { PropTypes } from 'react';
import styled from 'styled-components';

import Button from '../../components/Button';
import LoadingIcon from '../../components/LoadingIcon';
import { ButtonListWrapper } from '../../baseStyle';

const StepButtonList = ({
    handleCardSubmit,
    handleDialogClose,
    handleFormSelect,
    handleStepNext,
    handleStepPrev,
    handleTemplateDelete,
    handleTemplateModify,
    handleTemplateSubmit,
    isAtTemplatePage,
    isCardSubmitButtonDisabled,
    isMyTemplate,
    isNextStepButtonDisabled,
    isPreviewButtonDisabled,
    isSubmitting,
    isTemplateSubmitButtonDisabled,
    step,
}) => {
    switch(step) {
        case 0:
            return (
                <ButtonListWrapper>
                    <Button
                        backgroundColor={'#B1B1B1'}
                        disabled={isNextStepButtonDisabled}
                        label="下一步"
                        onClick={handleStepNext}
                    />
                </ButtonListWrapper>
            );
        case 1:
            return (
                <ButtonListWrapper>
                    <Button
                        backgroundColor={'#B1B1B1'}
                        label="上一步"
                        onClick={handleStepPrev}
                    />
                    <Button
                        backgroundColor={'#717171'}
                        disabled={isPreviewButtonDisabled}
                        label="下一步"
                        onClick={handleStepNext}
                    />
                </ButtonListWrapper>
            );
        case 2:
            return (
                <ButtonListWrapper>
                    <Button
                        backgroundColor={'#B1B1B1'}
                        label="上一步"
                        onClick={handleStepPrev}
                    />
                    <Button
                        backgroundColor={'#717171'}
                        disabled={isPreviewButtonDisabled}
                        label="預覽"
                        onClick={handleStepNext}
                    />
                </ButtonListWrapper>
            );
        case 3:
            return (
                <ButtonListWrapper>
                    <Button
                        backgroundColor={'#B1B1B1'}
                        disabled={isSubmitting}
                        label="修改"
                        onClick={handleTemplateModify}
                    />
                    {
                        !isAtTemplatePage ?
                            <Button
                                backgroundColor={'#FF704E'}
                                disabled={isSubmitting && isTemplateSubmitButtonDisabled}
                                label="創建模板"
                                onClick={handleTemplateSubmit}
                            />
                        : null
                    }
                    {
                        isAtTemplatePage ?
                            <Button
                                backgroundColor={'#FF704E'}
                                disabled={isSubmitting && isCardSubmitButtonDisabled}
                                label="創建卡片"
                                onClick={handleCardSubmit}
                            />
                        : null
                    }
                    {
                        isAtTemplatePage && isMyTemplate ?
                            <Button
                                backgroundColor={'#FF704E'}
                                disabled={isSubmitting}
                                label="刪除模板"
                                onClick={handleTemplateDelete}
                            />
                        : null
                    }
                </ButtonListWrapper>
            );
        default:
            return (
                <ButtonListWrapper>
                    <Button
                        backgroundColor={'#717171'}
                        label="關閉"
                        onClick={handleDialogClose}
                    />
                </ButtonListWrapper>
            );
    }
};

StepButtonList.propTypes = {
    handleCardSubmit: PropTypes.func.isRequired,
    handleDialogClose: PropTypes.func.isRequired,
    handleFormSelect: PropTypes.func.isRequired,
    handleStepNext: PropTypes.func.isRequired,
    handleStepPrev: PropTypes.func.isRequired,
    handleTemplateDelete: PropTypes.func.isRequired,
    handleTemplateSubmit: PropTypes.func.isRequired,
    isAtTemplatePage: PropTypes.bool.isRequired,
    isCardSubmitButtonDisabled: PropTypes.bool.isRequired,
    isMyTemplate: PropTypes.bool.isRequired,
    isNextStepButtonDisabled: PropTypes.bool.isRequired,
    isPreviewButtonDisabled: PropTypes.bool.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    isTemplateSubmitButtonDisabled: PropTypes.bool.isRequired,
    step: PropTypes.number.isRequired,
};

export default StepButtonList;
