import React, { Component } from 'react';

export default class CategorySelector extends Component {
    constructor(props) {
        super(props);
    }

    handleTouchTap(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div className="category-selector">
                CategorySelector
            </div>
        );
    }
}
