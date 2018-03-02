import React from "react";
import axios from '../axios-config';
import { browserHistory, Link } from 'react-router';
import Formsy from 'formsy-react';
import md5 from 'blueimp-md5';

import { baseUrl } from '../baseurl-config';
import FormsyHOCInput from './FormsyHOCInput.js';
import PasswordField from './PasswordField.js';

import logoImgPath from '../../images/Ludo_logo.png';
// import googleIcon from '../../images/login/google-icon.png';
// import twitterIcon from '../../images/login/twitter-icon.png';
import facebookIcon from '../../images/login/facebook-icon.png';

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

export default class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessageFromServer: '',
            isSubmitButtonDisabled: true,
        };
        this.disableButton = this.disableButton.bind(this);
        this.enableButton = this.enableButton.bind(this);
        this.handleLogIn = this.handleLogIn.bind(this);
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

    handleLogIn(logInData) {
        logInData.password = md5(logInData.password);
        axios.post('/login', logInData)
        .then((response) => {
            if (response.data.status === '200') {
                this.props.handleShouldUserBasicDataUpdate(true);
                browserHistory.push('/cardList');
            } else {
                this.setState({
                    errorMessageFromServer: response.data.message[0]
                });
            }
        })
        .catch((error) => {
            if (window.confirm('登入時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                window.open("https://www.facebook.com/messages/t/ludonow");
            }
        });
    }

    render() {
        const {
            errorMessageFromServer,
            isSubmitButtonDisabled
        } = this.state;

        return (
            /* components/_login.scss */
            <div className="login-container">
                <Formsy.Form
                    className="login-top-container"
                    onInvalid={this.disableButton}
                    onValid={this.enableButton}
                    onValidSubmit={this.handleLogIn}
                >
                    <div className="logo-container">
                        <img src={logoImgPath} className="logo-icon" />
                    </div>
                    <FormsyHOCInput
                        className="email"
                        name="email"
                        placeholder="輸入Email"
                        required
                        type="text"
                        validations="isEmail"
                    />
                    <FormsyHOCInput
                        className="password"
                        name="password"
                        placeholder="輸入密碼"
                        required
                        validationError={validators.password.message}
                        validations="isPassword"
                        type="password"
                    />
                    <div className="server-error-message">
                        {errorMessageFromServer}
                    </div>
                    <div className="buttons">
                        <button
                            className="login"
                            disabled={isSubmitButtonDisabled}
                            type="submit"
                        >
                            登入
                        </button>
                        <Link
                            className="signup"
                            to={`${baseUrl}/signup`}
                        >
                            前往註冊頁
                        </Link>
                    </div>
                    <a
                        className="forget-password"
                        href="https://api.ludonow.com/users/password/new"
                    >
                        忘記密碼
                    </a>
                </Formsy.Form>
                <div className="login-bottom-container">
                    <a href="https://api.ludonow.com/auth/facebook">
                        <img
                            className="fb-login-icon"
                            src={facebookIcon}
                        />
                    </a>
                    <div className="fb-login-text">FB登入</div>
                </div>
            </div>
        );
    }
}
