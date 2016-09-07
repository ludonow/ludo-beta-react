import React from "react";
import { Link } from 'react-router';

import HeaderClock from './HeaderClock';
import HeaderHeart from './HeaderHeart';
import HeaderLogo from './HeaderLogo';
import HeaderMarbles from './HeaderMarbles';
import HeaderRate from './HeaderRate';
import HeaderLevel from './HeaderLevel';

import Login from '../Login';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return ( 
            <div className="header">
                <div className="header-left">
                    <HeaderLogo />
                    <Link to="login">
                        <button className="link-to-login-button" onClick={this.handleLogin}>
                            Login
                        </button>
                    </Link>
                </div>
                <div className="header-right">
                    <HeaderMarbles />
                    <HeaderHeart />
                    {this.props.isProfile ? null : <HeaderRate /> }
                    {this.props.isProfile ? <HeaderLevel />: null }
                </div>
            </div>
        );
    }
};

Header.propTypes = { isProfile: React.PropTypes.bool };