import React, { Component, PropTypes } from 'react';
import { browserHistory, Link } from 'react-router';
import MediaQuery from 'react-responsive';

import HeaderFBPhoto from './HeaderFBPhoto';
import HeaderFilter from './HeaderFilter';
import HeaderFuel from './HeaderFuel';
import HeaderLogo from './HeaderLogo';
import HeaderLogIn from './HeaderLogIn';
import HeaderPrevPageArrow from './HeaderPrevPageArrow';
import HeaderRate from './HeaderRate';

import Playground from '../../playground/Playground';
import Profile from '../../profile/Profile';
import Create from '../../create/Create';
import Friend from '../../friend/Friend';

import facebookIcon from '../../../images/login/facebook-icon.png';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.handleFilterClick = this.handleFilterClick.bind(this);
        this.handleTemplateFilterClick = this.handleTemplateFilterClick.bind(this);
    }

    handleFilterClick() {
        this.props.getFilteredLudoList();
        browserHistory.push('/playground');
    }

    handleTemplateFilterClick() {
        this.props.getFilteredLudoList('stage=0');
        browserHistory.push('/playground');
    }

    render() {
        const { getFilteredLudoList, getLatestLudoList, isOpeningLudoListPage, isOpeningProfilePage, userBasicData } = this.props;
        const { heart, marbles, success_rate, win_rate } = userBasicData;
        let headerProfile;
        if (userBasicData.name) {    // user has login
            headerProfile = <HeaderFBPhoto userBasicData={userBasicData}/>
        } else {    // user has not login
            headerProfile = <HeaderLogIn />
        }
        return (
            /* layout/_header.scss */
            <div className="header">
                <div className="header-left">
                    <MediaQuery maxDeviceWidth={768}>
                        <HeaderPrevPageArrow />
                    </MediaQuery>
                    <HeaderLogo />
                    {
                        isOpeningLudoListPage ?
                            <HeaderFilter
                                getFilteredLudoList={getFilteredLudoList}
                                getLatestLudoList={getLatestLudoList}
                            />
                        :
                            null
                    }
                </div>
                <div className="header-right">
                    <HeaderFuel heart={heart} />
                        {
                            isOpeningProfilePage ?
                                null
                            :
                                <HeaderRate success_rate={success_rate} win_rate={win_rate} />
                        }
                    {/* components/_header-profile.scss */}
                    <div className="header-profile">
                        {headerProfile}
                    </div>
                </div>
                {/*fab menu icon for RWD design*/}
                <label className ="fab-menu">
                    <input className="fab-menu-checkbox" type="checkbox"/>
                    <div className="menu-box">
                        <div className="menu-circle"></div>
                        <ul className="menu-items">
                            <li><span onClick={this.handleFilterClick}>Playground</span></li>
                            <li><span onClick={this.handleTemplateFilterClick}>Template</span></li>
                            <li><Link to="/profile">Profile</Link></li>
                            <li><Link to="/create">Create</Link></li>
                            <li><Link to="/friend">Friends</Link></li>
                            {/* TODO: RWD for fab-menu in log in page */}
                            <li>
                                {
                                    this.props.isLoggedIn ?
                                        <a href="http://api.ludonow.com/logout">
                                            Log Out
                                        </a>
                                    :
                                        <Link to="/login">Log In</Link>
                                }
                            </li>
                        </ul>
                    </div>
              </label>
            </div>
            // {isOpeningProfilePage ? <HeaderLevel />: null }
        );
    }
};

Header.propTypes = {
    getFilteredLudoList: PropTypes.func,
    getLatestLudoList: PropTypes.func,
    isOpeningLudoListPage: PropTypes.bool,
    isOpeningProfilePage: PropTypes.bool,
    userBasicData: PropTypes.object
};
