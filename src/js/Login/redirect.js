import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import LoadingIcon from '../components/LoadingIcon';

class LoginRedirect extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const loginRedirectUrl = localStorage.getItem('loginRedirectUrl') || '%2F';
        console.log("loginRedirectUrl:" + loginRedirectUrl)
        if (loginRedirectUrl == "www") {
            window.location.href = "http://www.ludonow.com"
        } else {
            browserHistory.replace(loginRedirectUrl);
        }
    }

    render() {
        return (
            <div>
                <LoadingIcon />
                重新導向中
            </div>
        );
    }
}

export default LoginRedirect;
