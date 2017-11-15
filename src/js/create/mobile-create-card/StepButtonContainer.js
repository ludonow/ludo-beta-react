import React, { Component } from 'react';
import { cyan400 } from 'material-ui/styles/colors';

const maxStep = 1;

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
            handleStepChange,
            step
        } = this.props;
        return (
            <div className="button-container">
                {
                    step == 0 ? 
                        null
                    :
                        <StepButton
                            handleStepChange={handleStepChange}
                            label="上一步"
                            stepVariation={-1}
                        />
                }
                {
                    step == maxStep ?
                        null
                    :
                        <StepButton
                            handleStepChange={handleStepChange}
                            label="下一步"
                            stepVariation={1}
                        />
                }
            </div>
        );
    }
}
