import React, { Component } from 'react';
import styled from 'styled-components';

import { ButtonListWrapper } from '../../baseStyle';
import Button from '../../components/Button';

const StyledButtonListWrapper = ButtonListWrapper.extend`
    button {
        font-size: 16px;
        margin: 0 10px;
        padding: 8px 0;
    }
`;

const DeleteButtonStyle = {
    backgroundColor: '#f24150',
    marginTop: '10px'
};

const StepButtonList = ({
    handleCardSubmit,
    handleContentTypeSelect,
    handleStepNext,
    handleStepPrev,
    handleTemplateDelete,
    handleTemplateModify,
    handleTemplateSubmit,
    isAtTemplatePage,
    isCreatedByCurrentUser,
    isLudoSubmitButtonDisabled,
    isNextStepButtonDisabled,
    isPreviewButtonDisabled,
    isTemplateDeleteButtonDisabled,
    isTemplateSubmitButtonDisabled,
    maxStep,
    step,
}) => {
    switch (step) {
        case 0:
            return (
                <StyledButtonListWrapper>
                    <Button
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
                        label="上一步"
                        onClick={handleStepPrev}
                    />
                    <Button
                        disabled={isNextStepButtonDisabled}
                        label="下一步"
                        onClick={handleStepNext}
                    />
                </StyledButtonListWrapper>
            );
        case 2:
            return (
                <StyledButtonListWrapper>
                    <Button
                        label="上一步"
                        onClick={handleStepPrev}
                    />
                    <Button
                        data="text"
                        label="純文字"
                        onClick={handleContentTypeSelect}
                    />
                </StyledButtonListWrapper>
            );
        case 3:
            return (
                <StyledButtonListWrapper>
                    <Button
                        label="上一步"
                        onClick={handleStepPrev}
                    />
                    <Button
                        disabled={isNextStepButtonDisabled}
                        label="下一步"
                        onClick={handleStepNext}
                    />
                </StyledButtonListWrapper>
            );
        case 4:
            return (
                <StyledButtonListWrapper>
                    <Button
                        label="上一步"
                        onClick={handleStepPrev}
                    />
                    <Button
                        disabled={isPreviewButtonDisabled}
                        label="預覽"
                        onClick={handleStepNext}
                    />
                </StyledButtonListWrapper>
            );
        case 5:
            return (
                <StyledButtonListWrapper>
                    <Button
                        label="修改"
                        onClick={handleTemplateModify}
                    />
                    {
                        !isAtTemplatePage ?
                            <Button
                                disabled={isTemplateSubmitButtonDisabled}
                                label="建立模板"
                                onClick={handleTemplateSubmit}
                            />
                        : null
                    }
                    {
                        isAtTemplatePage ?
                            <Button
                                disabled={isLudoSubmitButtonDisabled}
                                label="開始玩囉"
                                onClick={handleCardSubmit}
                            />
                        : null
                    }
                    {
                        isAtTemplatePage && isCreatedByCurrentUser ?
                            <Button
                                deleteButton
                                disabled={isTemplateDeleteButtonDisabled}
                                label="刪除模板"
                                onClick={handleTemplateDelete}
                            />
                        : null
                    }
                </StyledButtonListWrapper>
            );
        default:
            return (
                <div>錯誤</div>
            );
    }
}

export default StepButtonList;
