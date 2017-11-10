import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class CategoryButtons extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="category-buttons-container">
                <RaisedButton label="生活作息" />
                <RaisedButton label="閱讀" />
                <RaisedButton label="運動" />
                <RaisedButton label="教科書" />
                <RaisedButton label="新技能" />
                <RaisedButton label="不可被提起的" />
                <RaisedButton label="其他" />
            </div>
        );
    }
}