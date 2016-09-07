import React from "react";

import logoImgPath from '../../images/Ludo_logo.png';
import googleIcon from '../../images/login/google-icon.png';
import twitterIcon from '../../images/login/twitter-icon.png';
import facebookIcon from '../../images/login/facebook-icon.png';

export default class Login extends React.Component {
    constructor() {
        super();
    }

    handleLogin() {
        console.log('login');
    }

    render() {
        return ( 
            <div className="grid">
                <div className="login-container">
                    <div className="login-top-container">
                        <div className="logo-container">
                            <img src={logoImgPath} className="logo-icon" />
                        </div>
                        <div className="email">
                            <input type="text" placeholder="email" />
                        </div>
                        <div className="password">
                            <input type="text" placeholder="password" />
                        </div>
                        <button className="login">
                            Log in
                        </button>
                        <button className="signup">
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
                                <img src={twitterIcon} className="other-login-icon" />
                            </div>
                            <div className="google">
                                <img src={googleIcon} className="other-login-icon" />
                            </div>
                            <div className="facebook">
                                <img src={facebookIcon} className="other-login-icon" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};