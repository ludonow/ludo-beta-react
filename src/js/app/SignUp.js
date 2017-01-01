import React from "react";
import axios from '../axios-config';
import { browserHistory, Link } from 'react-router';
import Formsy from 'formsy-react';
import md5 from 'blueimp-md5';

import FormsyHOCInput from './FormsyHOCInput.js';
import PasswordField from './PasswordField.js';

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

export default class SignUp extends React.Component {
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

    handleSignUp(data) {
        const signUpData = Object.assign({}, data);
        delete signUpData.repeated_password;
        signUpData.password = md5(signUpData.password);
        axios.post('/signup', signUpData)
        .then((response) => {
            console.log('response', response);
            if (response.data.status === '200') {
                browserHistory.push('/login');
            } else {
                console.error('SignUp handleSignUp response', response);
            }
        })
        .catch((error) => {
            console.error('SignUp handleSignUp error', error);
        });
    }

    render() {
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
                    <PasswordField
                        name="password"
                        placeholder="輸入密碼"
                        required
                        validations="isPassword"
                        validationError={validators.password.message}
                    />
                    <PasswordField
                        name="repeated_password"
                        placeholder="再次輸入密碼"
                        required
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
                    <div className="buttons">
                        <button
                            className="signup"
                            disabled={!this.state.canSubmit}
                            type="submit"
                        >
                            註冊
                        </button>
                        <Link
                            className="login"
                            to="login"
                        >
                            返回登入頁
                        </Link>
                    </div>
                </Formsy.Form>
            </div>
        );
    }
}