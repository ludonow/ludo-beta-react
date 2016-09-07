import React from "react";

import imageLogo from '../../images/Ludo_logo.png';

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
                    <div className="logo-container">
                        <img src={imageLogo} className="logo-icon" />
                    </div>
                    <div className="email">
                        email
                    </div>
                    <div className="password">
                        password
                    </div>
                    <div className="login">
                        login
                    </div>
                    <div className="signup">
                        signup
                    </div>
                </div>
            </div>
        );
    }
};