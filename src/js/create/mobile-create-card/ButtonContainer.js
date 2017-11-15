import React, { Component } from 'react';
import { cyan400 } from 'material-ui/styles/colors';

import StepButton from './StepButton';

const maxStep = 1;

export default class ButtonContainer extends Component {
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
