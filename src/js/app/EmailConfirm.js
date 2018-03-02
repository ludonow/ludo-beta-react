import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import styled from 'styled-components';
import Dialog from 'material-ui/Dialog';
import Formsy from 'formsy-react';

import axios from '../axios-config';
import DiscardAlert from '../components/DiscardAlert';
import FormsyHOCInput from './FormsyHOCInput';

const initialState = {
    errorMessageFromServer: '',
    isDiscardAlertOpen: false,
    isSubmitButtonDisabled: true,
    open: true,
};

const StyledForm = styled(Formsy.Form)`
    display: flex;
    justify-content: center;
`;

class EmailConfirm extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.disableButton = this.disableButton.bind(this);
        this.enableButton = this.enableButton.bind(this);
        this.handleCloseClick = this.handleCloseClick.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.handleDiscardAlertClose = this.handleDiscardAlertClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    disableButton() {
        this.setState({
            isSubmitButtonDisabled: true
        });
    }

    enableButton() {
        this.setState({
            isSubmitButtonDisabled: false
        });
    }

    handleCloseClick() {
        this.setState({ isDiscardAlertOpen: true });
    }

    handleDialogClose() {
        this.setState({
            ...initialState,
            open: false,
        });
        browserHistory.push('/cardList');
    }

    handleDiscardAlertClose() {
        this.setState({ isDiscardAlertOpen: false });
    }

    handleSubmit(emailObject) {
        axios.post(`/apis/validate/email/${this.props.currentUserId}`, emailObject)
        .then((response) => {
            if (response.data.status === '200') {
                this.props.handleShouldUserBasicDataUpdate(true);
                browserHistory.push('/cardList');
            } else {
                this.setState({
                    errorMessageFromServer: response.data.message[0]
                });
                if (window.confirm('送出信箱確認訊息時伺服器未回傳正確資訊，請點擊「確定」回報此問題給開發團隊')) {
                    window.open("https://www.facebook.com/messages/t/ludonow");
                }
            }
        })
        .catch((error) => {
            if (window.confirm('送出信箱確認訊息時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                window.open("https://www.facebook.com/messages/t/ludonow");
            }
        });
    }

    render() {
        const {
            email
        } = this.props;

        const {
            errorMessageFromServer,
            isDiscardAlertOpen,
            isSubmitButtonDisabled,
            open,
        } = this.state;
        return (
            <div>
                <Dialog
                    onRequestClose={this.handleCloseClick}
                    open={open}
                >
                    <StyledForm
                        onValid={this.enableButton}
                        onValidSubmit={this.handleSubmit}
                        onInvalid={this.disableButton}
                    >
                        <FormsyHOCInput
                            name="email"
                            onChange={this.handleEmailChange}
                            placeholder="輸入常用的Email"
                            required
                            validations="isEmail"
                            validationError="這不是有效的Email"
                            value={email ? email : ''}
                        />
                        <button
                            className="signup"
                            disabled={isSubmitButtonDisabled}
                            type="submit"
                        >
                            信箱確認
                        </button>
                        <div>
                            {errorMessageFromServer}
                        </div>
                    </StyledForm>
                    <DiscardAlert
                        alertTitle="信箱未確認完成將無法收到遊戲通知，確定要關閉嗎"
                        buttonLabel="關閉"
                        handleDialogClose={this.handleDialogClose}
                        handleDiscardAlertClose={this.handleDiscardAlertClose}
                        isDiscardAlertOpen={isDiscardAlertOpen}
                    />
                </Dialog>
            </div>
        );
    }
}

export default EmailConfirm;
