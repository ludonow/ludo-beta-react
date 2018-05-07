import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import styled from 'styled-components';
import Dialog from 'material-ui/Dialog';
import Formsy from 'formsy-react';

import axios from '../axios-config';
import StepperCloseIcon from '../components/StepperCloseIcon';
import FormsyHOCInput from '../app/FormsyHOCInput';

const initialState = {
    errorMessageFromServer: '',
    isSubmitButtonDisabled: true,
    open: true,
};

// styled comopnents
const ResendWrapper = styled.div`
    display: none;
    margin-top: 20px;
`;

const StyledForm = styled(Formsy.Form)`
    display: flex;
    justify-content: center;
    margin-top: 35px;
`;

const TextCenter = styled.div`
    line-height: 1.1rem;
    margin-bottom: 10px;
    text-align: center;
    white-space: pre-wrap;
`;

class EmailConfirm extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.disableButton = this.disableButton.bind(this);
        this.enableButton = this.enableButton.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
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

    handleDialogClose() {
        this.setState({
            ...initialState,
            open: false,
        });
        browserHistory.push('/cardList');
    }

    handleSubmit(emailObject) {
        this.setState({ isSubmitButtonDisabled: true });
        axios.post(`/apis/validate/email/${this.props.currentUserId}`, emailObject)
        .then((response) => {
            if (response.data.status === '200') {
                this.props.handleShouldUserBasicDataUpdate(true);
                browserHistory.push('/email-confirm-alert');
            } else {
                this.setState({
                    errorMessageFromServer: response.data.message[0],
                    isSubmitButtonDisabled: false
                });
            }
        })
        .catch((error) => {
            if (window.confirm('送出信箱確認訊息時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                window.open("https://www.facebook.com/messages/t/ludonow");
            }
            this.setState({ isSubmitButtonDisabled: false });
        });
    }

    render() {
        const {
            email
        } = this.props;

        const {
            errorMessageFromServer,
            isSubmitButtonDisabled,
            open,
        } = this.state;
        return (
            <Dialog
                onRequestClose={this.handleDialogClose}
                open={open}
                title="驗證信件已送出"
            >
                <StepperCloseIcon handleCloseClick={this.handleDialogClose} />
                <div>
                    請到以下電子信箱<br />
                    {email}<br />
                    開啟驗證信件進行驗證
                </div>
                <ResendWrapper>
                    <TextCenter>
                        沒有收到 Email？<br /> 點擊「重新寄出」按鈕再次寄出驗證信
                    </TextCenter>
                    <StyledForm
                        onInvalid={this.disableButton}
                        onValid={this.enableButton}
                        onValidSubmit={this.handleSubmit}
                    >
                        <FormsyHOCInput
                            name="email"
                            onChange={this.handleEmailChange}
                            placeholder="確認Email"
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
                            重新寄出
                        </button>
                        <div>
                            {errorMessageFromServer}
                        </div>
                    </StyledForm>
                </ResendWrapper>
            </Dialog>
        );
    }
}

export default EmailConfirm;
