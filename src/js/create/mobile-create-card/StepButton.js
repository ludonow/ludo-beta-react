import React, { Component } from 'react';
import { cyan400 } from 'material-ui/styles/colors'

export default class StepButton extends Component {
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
