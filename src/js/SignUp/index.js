import React, { Component } from "react";
import { browserHistory } from 'react-router';
import styled from 'styled-components';
import { Form } from 'formsy-react';
import md5 from 'blueimp-md5';

import axios from '../axios-config';
import Button, { StyledButton } from '../components/Button';
import { baseUrl } from '../baseurl-config';
import FormsyHOCInput from '../app/FormsyHOCInput';
import StepperCloseIcon from '../components/StepperCloseIcon';
import {
    StyledAnchor,
    StyledDialog,
    StyledLink,
} from '../baseStyle';

const validators = {
    password: {
        message: '密碼必須大於8碼，至少有1個數字和1個英文字',
        regexp: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    }
};

Formsy.addValidationRule('isPassword', (values, value) => {
    if (validators.password.regexp.test(value)) {
        return true;
    } else {
        return false;
    }
});

// styled components
const ButtonList = styled.div`
    display: inline-flex;
    justify-content: space-between;
    margin: 10px auto 0 auto;

    @media (min-width: 769px) {
        width: 65%;
    }

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const OtherLinkWrapper = styled.div`
    font-size: 12px;
    margin-top: 30px;
`;

const SignUpForm = styled(Form)`
    display: flex;
    flex-direction: column;
    padding: 20px 10px;
    margin: 0 auto;

    @media (min-width: 769px) {
        width: 50%;
    }

    @media (max-width: 768px) {
        width: 80%;
    }

    .error-message {
        color: red;
        font-size: 12px;
    }

    input {
        background-color: #DEDEDE;
        border: none;
        border-radius: 50px;
        caret-color: auto;
        color: #707070;
        margin: 10px auto;
        padding: 10px 0 10px 10px;

        @media (min-width: 769px) {
            width: 60%;
        }

        @media (max-width: 768px) {
            width: calc(100% - 10px);
        }

        ::placeholder {
            color: #BCBCBC;
        }
    }
`;

// override material ui
const desktopBodyStyle = {
    fontFamily: 'Helvetica',
    padding: '30px 0 80px 0',
};
const mobileBodyStyle = {
    ...desktopBodyStyle,
    padding: '0 0 20px 0',
};

const dialogStyle = {
    textAlign: 'center',
};

const desktopTitleStyle = {
    color: '#919191',
    fontFamily: 'Exo, Microsoft JhengHei',
    fontWeight: 'bold',
};
const mobileTitleStyle = {
    ...desktopTitleStyle,
    fontSize: '16px',
    padding: '70px 0 10px 0',
};

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessageFromServer: '',
            isSubmitButtonDisabled: true,
            open: true,
        };
        this.disableButton = this.disableButton.bind(this);
        this.enableButton = this.enableButton.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
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
            open: false,
        });
        browserHistory.push('/cardList');
    }

    handleSignUp(data) {
        const signUpData = Object.assign({}, data);
        delete signUpData.repeated_password;
        signUpData.password = md5(signUpData.password);
        this.setState({
            isSubmitButtonDisabled: true,
        });
        axios.post('/signup', signUpData)
        .then((response) => {
            if (response.data.status === '200') {
                const emailData = {
                    email: data.email
                };
                window.location.reload();
                browserHistory.push('/bind');
            } else {
                this.setState({
                    errorMessageFromServer: response.data.message[0],
                    isSubmitButtonDisabled: true,
                });
            }
        })
        .catch((error) => {
            if (window.confirm('註冊時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                window.open("https://www.facebook.com/messages/t/ludonow");
            }
            this.setState({
                isSubmitButtonDisabled: false,
            });
        });
    }

    /* components/_login.scss */
    render() {
        const {
            errorMessageFromServer,
            isSubmitButtonDisabled,
            open,
        } = this.state;

        const width = window.innerWidth || document.body.clientWidth;

        const bodyStyle = (width <= 768) ? mobileBodyStyle : desktopBodyStyle;
        const titleStyle = (width <= 768) ? mobileTitleStyle : desktopTitleStyle;
        const buttonWidth = (width <= 768) ? '85px' : '95px';

        return (
            <StyledDialog
                bodyStyle={bodyStyle}
                onRequestClose={this.handleDialogClose}
                open={open}
                style={dialogStyle}
                title="成為會員，與玩家們互動吧！"
                titleStyle={titleStyle}
            >
                <StepperCloseIcon
                    handleCloseClick={this.handleDialogClose}
                    padding="15px"
                />
                <SignUpForm
                    onInvalid={this.disableButton}
                    onValid={this.enableButton}
                    onValidSubmit={this.handleSignUp}
                >
                    <FormsyHOCInput
                        name="email"
                        placeholder="電子信箱"
                        required
                        validationError="這不是有效的電子信箱"
                        validations="isEmail"
                    />
                    <FormsyHOCInput
                        name="password"
                        placeholder="密碼"
                        required
                        validationError={validators.password.message}
                        validations="isPassword"
                        type="password"
                    />
                    <FormsyHOCInput
                        name="repeated_password"
                        placeholder="再次輸入密碼"
                        required
                        validationError="與之前輸入密碼不同"
                        validations="equalsField:password"
                        type="password"
                    />
                    <FormsyHOCInput
                        name="name"
                        placeholder="名稱"
                        required
                        validationError="姓名大於30個字"
                        validations="maxLength:30"
                    />
                    <div className="server-error-message">
                        {errorMessageFromServer}
                    </div>
                    <ButtonList>
                        <Button
                            backgroundColor="#FF5C5C"
                            disabled={isSubmitButtonDisabled}
                            fontSize="12px"
                            label="註冊"
                            margin="0"
                            padding="8px"
                            type="submit"
                            width={buttonWidth}
                        />
                        <StyledLink to={`${baseUrl}/login`}>
                            <Button
                                backgroundColor="#005074"
                                fontSize="12px"
                                label="返回登入"
                                margin="0"
                                padding="8px"
                                width={buttonWidth}
                            />
                        </StyledLink>
                    </ButtonList>
                    <OtherLinkWrapper>
                        <StyledAnchor
                            color="#B4B0B0"
                            fontFamily="Exo, Microsoft JhengHei"
                            href="https://api.ludonow.com/users/password/new"
                        >
                            忘記密碼？
                        </StyledAnchor>
                    </OtherLinkWrapper>
                </SignUpForm>
            </StyledDialog>
        );
    }
}