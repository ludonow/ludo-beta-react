import React, { PropTypes } from 'react';
import styled from 'styled-components';

import Button from '../../components/Button';
import LoadingIcon from '../../components/LoadingIcon';
import { ButtonListWrapper } from '../../baseStyle';

const StepButtonList = ({
    handleCardSubmit,
    handleContentTypeSelect,
    handleDialogClose,
    handleStepNext,
    handleStepPrev,
    handleTemplateDelete,
    handleTemplateEdit,
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
                        backgroundColor={'#B1B1B1'}
                        data="text"
                        label="文字回報"
                        onClick={handleContentTypeSelect}
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
                        label="下一步"
                        onClick={handleStepNext}
                    />
                </ButtonListWrapper>
            );
        case 3:
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
        case 4:
            return (
                <ButtonListWrapper>
                    <Button
                        backgroundColor={'#B1B1B1'}
                        disabled={isSubmitting}
                        fontSize="14px"
                        label="修改內容"
                        onClick={handleTemplateModify}
                        padding="8px"
                        width="100px"
                    />
                    {
                        !isAtTemplatePage ?
                            <Button
                                backgroundColor={'#FF704E'}
                                disabled={isSubmitting && isTemplateSubmitButtonDisabled}
                                fontSize="14px"
                                label="創建模板"
                                onClick={handleTemplateSubmit}
                                padding="8px"
                                width="100px"
                            />
                        : null
                    }
                    {
                        isAtTemplatePage ?
                            <Button
                                backgroundColor={'#2e968c'}
                                disabled={isSubmitting && isCardSubmitButtonDisabled}
                                fontSize="14px"
                                label="開始玩囉"
                                onClick={handleCardSubmit}
                                padding="8px"
                                width="100px"
                            />
                        : null
                    }
                    {
                        isAtTemplatePage && isMyTemplate ?
                            <Button
                                backgroundColor={'rgb(242, 65, 80)'}
                                disabled={isSubmitting}
                                fontSize="14px"
                                label="刪除模板"
                                onClick={handleTemplateDelete}
                                padding="8px"
                                width="100px"
                            />
                        : null
                    }
                    {
                        isAtTemplatePage && isMyTemplate ?
                            <Button
                                backgroundColor={'#4267b2'}
                                disabled={isSubmitting}
                                fontSize="14px"
                                label="儲存變更"
                                onClick={handleTemplateEdit}
                                padding="8px"
                                width="100px"
                            />
                        : null
                    }
                    {
                        isSubmitting ?
                            <LoadingIcon />
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
    handleContentTypeSelect: PropTypes.func.isRequired,
    handleDialogClose: PropTypes.func.isRequired,
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
