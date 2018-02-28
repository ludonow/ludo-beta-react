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

export default class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canSubmit: false,
            errorMessageFromServer: ''
        };
        this.disableButton = this.disableButton.bind(this);
        this.enableButton = this.enableButton.bind(this);
        this.handleLogIn = this.handleLogIn.bind(this);
    }

    disableButton() {
        this.setState({
            canSubmit: false
        });
    }

    enableButton() {
        this.setState({
            canSubmit: true
        });
    }

    handleSignUp(event) {
        browserHistory.push('/playground');
    }

    handleLogIn(logInData) {
        logInData.password = md5(logInData.password);
        axios.post('/login', logInData)
        .then((response) => {
            if (response.data.status === '200') {
                this.props.handleShouldUserBasicDataUpdate(true);
                browserHistory.push('/playground');
            // } else if (response.data.status === '') {
                 /* wrong password */
            //     console.log('wrong password');
            // } else if (response.data.status === '') {
                 /* email not exist */
            //     console.log('email not exist');
            } else {
                this.setState({
                    errorMessageFromServer: response.data.message[0]
                });
            }
        })
        .catch((error) => {
            window.alert('登入時發生錯誤，請再試一次，若問題依舊發生，請聯絡開發人員！');
            console.error('Login handleLogIn error', error);
        });
    }

    render() {
        return (
            /* components/_login.scss */
            <div className="login-container">
                <Formsy.Form
                    className="login-top-container"
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
                        type="password"
                        validations="isPassword"
                    />
                    <div className="server-error-message">
                        {this.state.errorMessageFromServer}
                    </div>
                    <div className="buttons">
                        <button
                            className="login"
                            type="submit"
                        >
                            登入
                        </button>
                        <Link
                            className="signup"
                            to={`${baseUrl}/signup`}
                        >
                            註冊
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
