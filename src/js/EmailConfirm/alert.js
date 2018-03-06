import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Dialog from 'material-ui/Dialog';

const initialState = {
    open: true,
};

class EmailConfirm extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.handleDialogClose = this.handleDialogClose.bind(this);
    }

    handleDialogClose() {
        this.setState({
            ...initialState,
            open: false,
        });
        browserHistory.push('/cardList');
    }

    render() {
        const {
            open,
        } = this.state;
        return (
            <Dialog
                onRequestClose={this.handleDialogClose}
                open={open}
                title="驗證信件已送出"
            >
                請到該電子信箱開啟驗證信件進行驗證
            </Dialog>
        );
    }
}

export default EmailConfirm;
