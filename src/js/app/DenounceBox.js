import React, { Component } from 'react';
import axios from '../axios-config';

import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class DenounceBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            denounceTypeArray: ['Ludo', '回報', '留言']
        }
    }

    handleDenounceSend = (event) => {
        const denounceConfirm = window.confirm(`真的要檢舉這個${this.state.denounceTypeArray[this.props.denounceType]}嗎？`)
        if (denounceConfirm) {
            console.log('handleDenounceSend');
        }
    }

    render() {
        return (
            <Card>
                <CardHeader
                    title={`檢舉此${this.state.denounceTypeArray[this.props.denounceType]}`}
                />
                <div>{this.props.currentTargetId}</div>
                <TextField hintText="檢舉的原因" />
                <RaisedButton label="取消" onTouchTap={this.props.onRequestClose} />
                <RaisedButton label="確定送出" onTouchTap={this.handleDenounceSend} />
            </Card>
        );
    }
}