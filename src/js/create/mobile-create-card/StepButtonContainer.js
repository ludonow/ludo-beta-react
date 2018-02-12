import React, { Component } from 'react';
import { cyan400 } from 'material-ui/styles/colors';

const DeleteButtonStyle = {
    backgroundColor: '#f24150',
    marginTop: '10px'
};

// child components
class StepButton extends Component {
    constructor(props) {
        super(props);
        this.handleTouchTap = this.handleTouchTap.bind(this);
    }

    handleTouchTap(event) {
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
                onTouchTap={this.handleTouchTap}
            >
                {label}
            </button>
        );
    }
}

const SubmitButton = ({
    deleteButton,
    disabled,
    handleTouchTap,
    label
}) => (
    <button
        className="ludo-button disabled-button"
        disabled={disabled}
        onTouchTap={handleTouchTap}
        style={deleteButton ? DeleteButtonStyle : {}}
    >
        {label}
    </button>
);

export default class StepButtonContainer extends Component {
    constructor(props) {
        super(props);
        this.handleTouchTap = this.handleTouchTap.bind(this);
    }

    handleTouchTap(event) {
        event.preventDefault();
        this.props.handleStepChange(this.props.stepVariation);
    }

    render() {
        const {
            handleCardSubmit,
            handleStepChange,
            handleTemplateDelete,
            handleTemplateSubmit,
            isAtTemplatePage,
            isCreatedByCurrentUser,
            isLudoSubmitButtonDisabled,
            isNextStepButtonDisabled,
            isTemplateDeleteButtonDisabled,
            isTemplateSubmitButtonDisabled,
            maxStep,
            step
        } = this.props;

        let nextStepLabel = '';

        switch (step) {
            case (maxStep - 1):
                nextStepLabel = '預覽卡片';
                break;
            default:
                nextStepLabel = '下一步';
                break;
        }

        return (
            <div className="button-container">
                {
                    step !== 0 ? 
                        <StepButton
                            handleStepChange={handleStepChange}
                            label="上一步"
                            stepVariation={-1}
                        />
                    : null
                }
                {
                    step <= (maxStep - 1) ? 
                        <StepButton
                            disabled={isNextStepButtonDisabled}
                            handleStepChange={handleStepChange}
                            label={nextStepLabel}
                            stepVariation={1}
                        />
                    : null
                }
                {
                    step === maxStep && !isAtTemplatePage ?
                        <SubmitButton
                            disabled={isTemplateSubmitButtonDisabled}
                            label="建立模板"
                            handleTouchTap={handleTemplateSubmit}
                        />
                    : null
                }
                {
                    step === maxStep && isAtTemplatePage ?
                        <SubmitButton
                            disabled={isLudoSubmitButtonDisabled}
                            label="發佈卡片"
                            handleTouchTap={handleCardSubmit}
                        />
                    : null
                }
                {
                    step === maxStep && isAtTemplatePage && isCreatedByCurrentUser ?
                        <SubmitButton
                            deleteButton
                            disabled={isTemplateDeleteButtonDisabled}
                            label="刪除模板"
                            handleTouchTap={handleTemplateDelete}
                        />
                    : null
                }
            </div>
        );
    }
}
