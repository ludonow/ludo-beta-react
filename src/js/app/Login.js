import React from "react";
import axios from '../axios-config';

import logoImgPath from '../../images/Ludo_logo.png';
import googleIcon from '../../images/login/google-icon.png';
import twitterIcon from '../../images/login/twitter-icon.png';
import facebookIcon from '../../images/login/facebook-icon.png';

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            loginInformation: {
                email: '',
                password: ''
            },
            isEmailBlank: true,
            isPasswordBlank: true
        };
        this.handleEmailField = this.handleEmailField.bind(this);
        this.handlePasswordField = this.handlePasswordField.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleEmailField(event) {
        if(event.target.value) {
            this.setState(
                Object.assign(this.state, {
                    isEmailBlank: false
                })
            );
        } else {
            this.setState( 
                Object.assign(this.state, {
                    isEmailBlank: true
                })
            );
        }
    }

    handlePasswordField(event) {
        if(event.target.value) {
            this.setState(
                Object.assign(this.state, {
                    isPasswordBlank: false
                })
            );
        } else {
            this.setState(
                Object.assign(this.state, {
                    isPasswordBlank: true
                })
            );
        }
    }

    handleLogin() {
        const { isEmailBlank, isPasswordBlank } = this.state;
        if (!isEmailBlank && !isPasswordBlank) {
            const { loginInformation } = this.state;
            axios.post('/login', loginInformation)
            .then(function (response) {
                window.alert(`successfully login`);
            })
            .catch(function (error) {
                console.log('error', error);
            });
        } else {
            window.alert(`Lack of email or password`);
        }
    }

    render() {
        return (
            /* components/_card.scss */
            <div className="grid">
                {/* components/_login.scss */}
                <div className="login-container">
                    <div className="login-top-container">
                        <div className="logo-container">
                            <img src={logoImgPath} className="logo-icon" />
                        </div>
                        <div className="email">
                            <input
                                disabled
                                onChange={this.handleEmailField}
                                placeholder="email"
                                type="text"
                            />
                        </div>
                        <div className="password">
                            <input
                                disabled
                                onChange={this.handlePasswordField}
                                placeholder="password"
                                type="text"
                            />
                        </div>
                        <button
                            className="login"
                            disabled 
                            onClick={this.handleLogin}
                        >
                            Log in
                        </button>
                        <button
                            className="signup"
                            disabled
                        >
                            Sign up
                        </button>
                    </div>
                    <div className="login-bottom-container">
                        <div className="other-login-instruction">
                            <p>or</p>
                            <br />
                            <p>Log in via your favorite social media</p>
                        </div>
                        <div className="other-login-icon-container">
                            <div className="twitter">
                                <img
                                    className="other-login-icon"
                                    src={twitterIcon}
                                />
                            </div>
                            <div className="google">
                                <img
                                    className="other-login-icon"
                                    src={googleIcon}
                                />
                            </div>
                            <div className="facebook">
                                <a href="http://api.ludonow.com/auth/facebook">
                                    <img
                                        className="fb-login-icon"
                                        src={facebookIcon}
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};