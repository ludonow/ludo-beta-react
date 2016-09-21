import React from "react";
import { Link } from 'react-router';

import HeaderClock from './HeaderClock';
import HeaderHeart from './HeaderHeart';
import HeaderLogo from './HeaderLogo';
import HeaderMarbles from './HeaderMarbles';
import HeaderRate from './HeaderRate';
import HeaderLevel from './HeaderLevel';

import Login from '../Login';

import facebookIcon from '../../../images/login/facebook-icon.png';

// http://ludotest.rzbyc5phqb.ap-southeast-1.elasticbeanstalk.com

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange(event) {
        console.log('files', event.target.files);
    }

    render() {
        const { userBasicData } = this.props;
        const { heart, marbles, success_rate, win_rate } = userBasicData;
        return ( 
            <div className="header">
                <div className="header-left">
                    <HeaderLogo />
                    {
                        this.props.userBasicData.name ?
                            <div className="header-facebook-login">
                                Hi, {this.props.userBasicData.name}
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <a href="http://api.ludonow.com/logout">
                                    Log Out
                                </a>
                            </div>
                        :
                        <div className="header-facebook-login">
                            <a href="http://api.ludonow.com/auth/facebook">
                                <img src={facebookIcon} className="facebook-login-icon" />
                            </a>
                        </div>
                    }
                </div>
                <div className="header-right">
                    <HeaderMarbles marbles={marbles}/>
                    <HeaderHeart heart={heart} />
                    {this.props.isProfile ? null : <HeaderRate success_rate={success_rate} win_rate={win_rate} /> }
                </div>
            </div>
                    // {this.props.isProfile ? <HeaderLevel />: null }
        );
    }
};

Header.propTypes = { isProfile: React.PropTypes.bool };