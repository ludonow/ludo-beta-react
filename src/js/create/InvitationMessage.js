import React, { Component } from 'react';
import axios from '../axios-config';

import CloseIcon from 'material-ui/svg-icons/navigation/close';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class InvitationMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDialogOfMessageAlreadySendOpen: false,
            denounceTypeArray: ['Ludo', '回報', '留言'],
            isSendingError: false,
            message: ''
        }
        this.handleMessageAlreadySend = this.handleMessageAlreadySend.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleMessageSend = this.handleMessageSend.bind(this);
        this.handleSendingError = this.handleSendingError.bind(this);
    }

    handleMessageAlreadySend() {
        this.setState({
            isDialogOfMessageAlreadySendOpen: false
        });
        this.props.onRequestClose();
    }

    handleMessageChange(event) {
        const message = event.target.value;
        this.setState({
            message
        });
    }

    handleMessageSend(event) {
        const ludoInvitationPost = {
            ...this.props.ludoCreateForm,
            type: 'invite',
            friend_id: this.props.friend_id, 
            message: this.state.message
        };
        this.props.onRequestClose();
        axios.post('/apis/ludo', ludoInvitationPost)
        .then((response) => {
            if (response.data.status === '200') {
                this.setState({
                    isDialogOfMessageAlreadySendOpen: true
                });
            } else {
                this.setState({
                    isSendingError: true
                });
                console.error('InvitationMessage handleMessageSend response from server: ', response);
                console.error('InvitationMessage handleMessageSend message from server: ', response.data.message);
            }
        })
        .catch((error) => {
            this.setState({
                isSendingError: true
            });
            console.error('InvitationMessage handleMessageSend error', error);
        });
    }

    handleSendingError(event) {
        this.setState({
            isSendingError: false
        });
    }

    render() {
        /* components/_denounce-box.scss */
        const actions = [
            <RaisedButton
                className="denounce-button"
                label="取消"
                onTouchTap={this.props.onRequestClose}
            />,
            <RaisedButton
                className="denounce-button"
                disabled={!this.state.message}
                label="確定送出"
                primary
                onTouchTap={this.handleMessageSend}
            />
        ];
        const confirmActions = [
            <RaisedButton
                label="知道了！"
                primary
                onTouchTap={this.handleMessageAlreadySend}
            />
        ];
        const errorActions = [
            <RaisedButton
                label="知道了！"
                primary
                onTouchTap={this.handleSendingError}
            />
        ];
        return (
            <div>
                <Dialog
                    actions={actions}
                    onRequestClose={this.props.onRequestClose}
                    open={this.props.isMessageDialogOpen}
                    title="想說的話"
                >
                    <TextField
                        floatingLabelText="和被邀請人說一些話吧！"
                        fullWidth
                        multiLine
                        onChange={this.handleMessageChange}
                    />
                </Dialog>
                <Dialog
                    actions={confirmActions}
                    onRequestClose={this.handleMessageAlreadySend}
                    open={this.state.isDialogOfMessageAlreadySendOpen}
                >
                    已送出Ludo邀請
                </Dialog>
                <Dialog
                    actions={errorActions}
                    onRequestClose={this.handleSendingError}
                    open={this.state.isSendingError}
                >
                    Ludo邀請送出錯誤，請再試一次；若問題仍發生，請聯絡開發人員
                </Dialog>
            </div>
        );
    }
}