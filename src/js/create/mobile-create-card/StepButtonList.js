import React, { Component } from 'react';
import styled from 'styled-components';

const DeleteButtonStyle = {
    backgroundColor: '#f24150',
    marginTop: '10px'
};

// child components
class StepButton extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        this.props.handleStepChange(this.props.stepVariation);
    }

    render() {
        const {
            disabled,
            label
        } = this.props;
        return (
            <button
                className="ludo-button disabled-button"
                disabled={disabled}
                onClick={this.handleClick}
            >
                {label}
            </button>
        );
    }
}

const SubmitButton = ({
    deleteButton,
    disabled,
    handleClick,
    label
}) => (
    <button
        className="ludo-button disabled-button"
        disabled={disabled}
        onClick={handleClick}
        style={deleteButton ? DeleteButtonStyle : {}}
    >
        {label}
    </button>
);

const StepButtonList = ({
    handleCardSubmit,
    handleStepChange,
    handleTemplateDelete,
    handleTemplateModify,
    handleTemplateSubmit,
    isAtTemplatePage,
    isCreatedByCurrentUser,
    isLudoSubmitButtonDisabled,
    isNextStepButtonDisabled,
    isTemplateDeleteButtonDisabled,
    isTemplateSubmitButtonDisabled,
    maxStep,
    step
}) => {
    switch (step) {
        case 0:
            return (
                <div className="button-container">
                    <StepButton
                        disabled={isNextStepButtonDisabled}
                        handleStepChange={handleStepChange}
                        label="下一步"
                        stepVariation={1}
                    />
                </div>
            );
        case 1:
            return (
                <div className="button-container">
                    <StepButton
                        handleStepChange={handleStepChange}
                        label="上一步"
                        stepVariation={-1}
                    />
                    <StepButton
                        disabled={isNextStepButtonDisabled}
                        handleStepChange={handleStepChange}
                        label="下一步"
                        stepVariation={1}
                    />
                </div>
            );
        case 2:
            return (
                <div className="button-container">
                    <StepButton
                        handleStepChange={handleStepChange}
                        label="上一步"
                        stepVariation={-1}
                    />
                    <StepButton
                        disabled={isNextStepButtonDisabled}
                        handleStepChange={handleStepChange}
                        label="預覽"
                        stepVariation={1}
                    />
                </div>
            );
        case 3:
            return (
                <div className="button-container">
                    <SubmitButton
                        handleClick={handleTemplateModify}
                        label="修改"
                        stepVariation={-1}
                    />
                    {
                        !isAtTemplatePage ?
                            <SubmitButton
                                disabled={isTemplateSubmitButtonDisabled}
                                label="建立模板"
                                handleClick={handleTemplateSubmit}
                            />
                        : null
                    }
                    {
                        isAtTemplatePage ?
                            <SubmitButton
                                disabled={isLudoSubmitButtonDisabled}
                                label="開始玩囉"
                                handleClick={handleCardSubmit}
                            />
                        : null
                    }
                    {
                        isAtTemplatePage && isCreatedByCurrentUser ?
                            <SubmitButton
                                deleteButton
                                disabled={isTemplateDeleteButtonDisabled}
                                label="刪除模板"
                                handleClick={handleTemplateDelete}
                            />
                        : null
                    }
                </div>
            );
        default:
            return (
                <div>錯誤</div>
            );
    }
}

export default StepButtonList;
