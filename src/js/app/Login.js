import React from "react";
import axios from '../axios-config';
import { browserHistory, Link } from 'react-router';
import Formsy from 'formsy-react';
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
            canSubmit: false
        };
        this.disableButton = this.disableButton.bind(this);
        this.enableButton = this.enableButton.bind(this);
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

    handleLogIn(data) {
        axios.post('/login', data)
        .then((response) => {
            console.log('response', response);
            if (response.data.status === '200') {
                browserHistory.push('/playground');
            // } else if (response.data.status === '') {
                 /* wrong password */
            //     console.log('wrong password');
            // } else if (response.data.status === '') {
                 /* email not exist */
            //     console.log('email not exist');
            } else {
                console.log('Login handleLogIn response', response);
            }
        })
        .catch((error) => {
            console.log('Login handleLogIn error', error);
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
                    onInvalid={this.disableButton}
                >
                    <div className="logo-container">
                        <img src={logoImgPath} className="logo-icon" />
                    </div>
                    <FormsyHOCInput
                        className="email"
                        name="email"
                        placeholder="輸入Email"
                        required
                        validations="isEmail"
                        validationError="這不是有效的Email"
                    />
                    <PasswordField
                        className="password"
                        name="password"
                        placeholder="輸入密碼"
                        required
                        validations="isPassword"
                        validationError={validators.password.message}
                    />
                    <div className="buttons">
                        <button
                            className="login"
                            disabled={!this.state.canSubmit}
                            type="submit"
                        >
                            登入
                        </button>
                        <Link
                            className="signup"
                            to="signup"
                        >
                            註冊
                        </Link>
                    </div>
                </Formsy.Form>
                <div className="login-bottom-container">
                    <a href="http://api.ludonow.com/auth/facebook">
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