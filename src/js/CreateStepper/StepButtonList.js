import React from 'react';
import PropTypes from 'prop-types';

import Button from '../components/Button';
import { ButtonListWrapper } from '../baseStyle';

const StyledButtonListWrapper = ButtonListWrapper.extend`
    button {
        padding: 8px 0;
        @media (max-width: 768px) {
            margin: 0 10px;
        }
    }
`;

const MultipleButtonListWrapper = StyledButtonListWrapper.extend`
    button {
        font-size: 14px;
        @media (max-width: 768px) {
            margin: 0 1px;
            width: 75px;
        }
        @media (min-width: 769px) {
            width: 100px;
        }
    }
`;

const StepButtonList = ({
    handleCardSubmit,
    handleContentTypeSelect,
    handleDialogClose,
    handleStepNext,
    handleStepPrev,
    handleTemplateDelete,
    handleTemplateModify,
    handleTemplateSave,
    handleTemplateSubmit,
    isAtTemplatePage,
    isCardSubmitButtonDisabled,
    isMyTemplate,
    isNextStepButtonDisabled,
    isPreviewButtonDisabled,
    isSubmitting,
    isTemplateDeleteButtonDisabled,
    isTemplateSaveButtonDisabled,
    isTemplateSubmitButtonDisabled,
    step,
}) => {
    switch(step) {
        case 0:
            return (
                <StyledButtonListWrapper>
                    <Button
                        backgroundColor={'#B1B1B1'}
                        disabled={isNextStepButtonDisabled}
                        label="下一步"
                        onClick={handleStepNext}
                    />
                </StyledButtonListWrapper>
            );
        case 1:
            return (
                <StyledButtonListWrapper>
                    <Button
                        backgroundColor={'#B1B1B1'}
                        label="上一步"
                        onClick={handleStepPrev}
                    />
                    <Button
                        backgroundColor={'#B1B1B1'}
                        data="text"
                        label="純文字"
                        onClick={handleContentTypeSelect}
                    />
                </StyledButtonListWrapper>
            );
        case 2:
            return (
                <StyledButtonListWrapper>
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
                </StyledButtonListWrapper>
            );
        case 3:
            return (
                <StyledButtonListWrapper>
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
                </StyledButtonListWrapper>
            );
        case 4:
            return (
                <MultipleButtonListWrapper>
                    <Button
                        backgroundColor={'#B1B1B1'}
                        disabled={isSubmitting}
                        label="修改內容"
                        onClick={handleTemplateModify}
                    />
                    {
                        !isAtTemplatePage ?
                            <Button
                                backgroundColor={'#FF704E'}
                                disabled={isSubmitting || isTemplateSubmitButtonDisabled}
                                label="創建模板"
                                onClick={handleTemplateSubmit}
                            />
                        : null
                    }
                    {
                        isAtTemplatePage ?
                            <Button
                                backgroundColor={'#2e968c'}
                                disabled={isSubmitting || isCardSubmitButtonDisabled}
                                label="開始玩囉"
                                onClick={handleCardSubmit}
                            />
                        : null
                    }
                    {
                        isAtTemplatePage && isMyTemplate ?
                            <Button
                                backgroundColor={'rgb(242, 65, 80)'}
                                disabled={isSubmitting || isTemplateDeleteButtonDisabled}
                                label="刪除模板"
                                onClick={handleTemplateDelete}
                            />
                        : null
                    }
                    {
                        isAtTemplatePage && isMyTemplate ?
                            <Button
                                backgroundColor={'#4267b2'}
                                disabled={isSubmitting || isTemplateSaveButtonDisabled}
                                label="儲存變更"
                                onClick={handleTemplateSave}
                            />
                        : null
                    }
                </MultipleButtonListWrapper>
            );
        default:
            return (
                <StyledButtonListWrapper>
                    <Button
                        backgroundColor={'#717171'}
                        label="關閉"
                        onClick={handleDialogClose}
                    />
                </StyledButtonListWrapper>
            );
    }
};

StepButtonList.propTypes = {
    handleCardSubmit: PropTypes.func.isRequired,
    handleContentTypeSelect: PropTypes.func.isRequired,
    handleDialogClose: PropTypes.func.isRequired,
    handleStepNext: PropTypes.func.isRequired,
    handleStepPrev: PropTypes.func.isRequired,
    handleTemplateDelete: PropTypes.func.isRequired,
    handleTemplateModify: PropTypes.func.isRequired,
    handleTemplateSave: PropTypes.func.isRequired,
    handleTemplateSubmit: PropTypes.func.isRequired,
    isAtTemplatePage: PropTypes.bool.isRequired,
    isCardSubmitButtonDisabled: PropTypes.bool.isRequired,
    isMyTemplate: PropTypes.bool.isRequired,
    isNextStepButtonDisabled: PropTypes.bool.isRequired,
    isPreviewButtonDisabled: PropTypes.bool.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    isTemplateDeleteButtonDisabled: PropTypes.bool.isRequired,
    isTemplateSaveButtonDisabled: PropTypes.bool.isRequired,
    isTemplateSubmitButtonDisabled: PropTypes.bool.isRequired,
    step: PropTypes.number.isRequired,
};

export default StepButtonList;
