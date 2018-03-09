import React, { Component } from "react";
import axios from '../axios-config';
import { browserHistory, Link } from 'react-router';
import Formsy from 'formsy-react';
import md5 from 'blueimp-md5';

import { baseUrl } from '../baseurl-config';
import FormsyHOCInput from './FormsyHOCInput.js';

import logoImgPath from '../../images/Ludo_logo.png';

const validators = {
    password: {
        regexp: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        message: '密碼必須大於8碼，至少有1個數字和1個英文字'
    }
};

Formsy.addValidationRule('isPassword', (values, value) => {
    if (validators.password.regexp.test(value)) {
        return true;
    } else {
        return false;
    }
});

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSubmitButtonDisabled: true,
            errorMessageFromServer: ''
        };
        this.disableButton = this.disableButton.bind(this);
        this.enableButton = this.enableButton.bind(this);
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

    render() {
        const {
            errorMessageFromServer,
            isSubmitButtonDisabled,
        } = this.state;

        return (
            /* components/_login.scss */
            <div className="login-container">
                <Formsy.Form
                    className="login-top-container"
                    onValid={this.enableButton}
                    onValidSubmit={this.handleSignUp}
                    onInvalid={this.disableButton}
                >
                    <div className="logo-container">
                        <img src={logoImgPath} className="logo-icon" />
                    </div>
                    <FormsyHOCInput
                        name="email"
                        placeholder="輸入Email"
                        required
                        validations="isEmail"
                        validationError="這不是有效的Email"
                    />
                    <FormsyHOCInput
                        name="password"
                        placeholder="輸入密碼"
                        required
                        type="password"
                        validations="isPassword"
                        validationError={validators.password.message}
                    />
                    <FormsyHOCInput
                        name="repeated_password"
                        placeholder="再次輸入密碼"
                        required
                        type="password"
                        validations="equalsField:password"
                        validationError="與之前輸入密碼不同"
                    />
                    <FormsyHOCInput
                        name="name"
                        placeholder="輸入姓名"
                        required
                        validations="maxLength:10"
                        validationError="姓名大於10個字"
                    />
                    <div className="server-error-message">
                        {errorMessageFromServer}
                    </div>
                    <div className="buttons">
                        <button
                            className="signup"
                            disabled={isSubmitButtonDisabled}
                            type="submit"
                        >
                            註冊
                        </button>
                        <Link
                            className="login"
                            to={`${baseUrl}/login`}
                        >
                            返回登入頁
                        </Link>
                    </div>
                </Formsy.Form>
            </div>
        );
    }
}