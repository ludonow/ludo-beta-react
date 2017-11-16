import React, { Component } from 'react';

export default class CardPreview extends Component {
    constructor(props) {
        super(props);
    }

    handleTouchTap(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div className="card-preview">
                CardPreview
            </div>
        );
    }
}
