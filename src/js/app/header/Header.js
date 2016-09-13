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

export default class Header extends React.Component {
    constructor(props) {
        super(props);
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
                                <a href="http://ludotest.rzbyc5phqb.ap-southeast-1.elasticbeanstalk.com/logout">
                                    Log Out
                                </a>
                            </div>
                        :
                        <div className="header-facebook-login">
                            <a href="http://ludotest.rzbyc5phqb.ap-southeast-1.elasticbeanstalk.com/auth/facebook">
                                <img src={facebookIcon} className="facebook-login-icon" />
                            </a>
                        </div>
                    }
                </div>
                <div className="header-right">
                    <HeaderMarbles marbles={marbles}/>
                    <HeaderHeart heart={heart} />
                    {this.props.isProfile ? null : <HeaderRate success_rate={success_rate} win_rate={win_rate} /> }
                    {this.props.isProfile ? <HeaderLevel />: null }
                </div>
            </div>
        );
    }
};

Header.propTypes = { isProfile: React.PropTypes.bool };