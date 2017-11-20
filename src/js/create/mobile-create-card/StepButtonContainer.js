import React, { Component } from 'react';
import { cyan400 } from 'material-ui/styles/colors';

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
        const { label } = this.props;
        return (
            <button
                className="ludo-button"
                onTouchTap={this.handleTouchTap}
            >
                {label}
            </button>
        );
    }
}

const SubmitButton = ({
    handleTouchTap,
    label
}) => (
    <button
        className="ludo-button"
        onTouchTap={handleTouchTap}
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
                    :
                        null
                }
                {
                    step < maxStep ? 
                        <StepButton
                            handleStepChange={handleStepChange}
                            label={nextStepLabel}
                            stepVariation={1}
                        />
                    :
                        null
                }
                {
                    step === maxStep ? 
                        <SubmitButton
                            label="發佈卡片"
                            handleTouchTap={handleCardSubmit}
                        />
                    :
                        null
                }
            </div>
        );
    }
}
