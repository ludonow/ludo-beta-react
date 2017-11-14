import React, { Component } from 'react';

export default class PrevButton extends Component {
    constructor(props) {
        super(props);
        this.handleTouchTap = this.handleTouchTap.bind(this);
    }

    handleTouchTap(event) {
        event.preventDefault();
        this.props.handleStepChange(-1);
    }

    render() {
        return (
            <div>
                <button onTouchTap={this.handleTouchTap}>上一步</button>
            </div>
        );
    }
}
