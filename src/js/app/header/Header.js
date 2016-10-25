import React from 'react';
import { Link } from 'react-router';
import IconButton from 'material-ui/IconButton';

import HeaderFBPhoto from './HeaderFBPhoto';
import HeaderFuel from './HeaderFuel';
// import HeaderLevel from './HeaderLevel';  // unused
import HeaderLogo from './HeaderLogo';
import HeaderLogin from './HeaderLogin';
import HeaderMarbles from './HeaderMarbles';
import HeaderRate from './HeaderRate';
import Login from '../Login';

import facebookIcon from '../../../images/login/facebook-icon.png';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { userBasicData } = this.props;
        const { heart, marbles, success_rate, win_rate } = userBasicData;
        let headerProfile;
        if (userBasicData.name) {    // user has login
            headerProfile = <HeaderFBPhoto userBasicData={userBasicData}/>
        } else {    // user has not login
            headerProfile = <HeaderLogin />
        }
        return (
            /* layout/_header.scss */
            <div className="header">
                <div className="header-left">
                    <HeaderLogo />
                </div>
                <div className="header-right">
                    <HeaderMarbles marbles={marbles}/>
                    <HeaderFuel heart={heart} />
                        {
                            this.props.isProfile ? 
                                null
                            :
                                <HeaderRate success_rate={success_rate} win_rate={win_rate} /> 
                        }
                    {/* components/_header-profile.scss */}
                    <div className="header-profile">
                        {headerProfile}
                    </div>
                </div>
            </div>
            // {this.props.isProfile ? <HeaderLevel />: null }
        );
    }
};

Header.propTypes = { isProfile: React.PropTypes.bool };