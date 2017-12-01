import React, { Component, PropTypes } from 'react';
import { browserHistory, Link } from 'react-router';
import MediaQuery from 'react-responsive';
import styled from 'styled-components';

import HeaderFBPhoto from './HeaderFBPhoto';
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
import magnifierIcon from '../../../images/magnifier.svg';

const SearchIconContainer = styled.div`
    position: absolute;
    right: 0;
    padding: 20px;
    & > img {
        width: 30px;
        height: 30px;
    }
`;

const SearchIcon = () => (
    <SearchIconContainer>
        <img src={magnifierIcon} />
    </SearchIconContainer>
);

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSearching: false
        }
        this.handleFilterClick = this.handleFilterClick.bind(this);
        this.handleTemplateFilterClick = this.handleTemplateFilterClick.bind(this);
        this.handleHistoryFilterClick = this.handleHistoryFilterClick.bind(this);
    }

    handleFilterClick(event) {
        this.props.getFilteredLudoList(event.target.value);
        browserHistory.push('/playground');
    }

    handleTemplateFilterClick() {
        this.props.getFilteredLudoList('stage=0');
        browserHistory.push('/playground');
    }

    handleHistoryFilterClick() {
        this.props.getFilteredLudoList('stage=3');
        browserHistory.push('/playground');
    }

    render() {
        const {
            getFilteredLudoList,
            getLatestLudoList,
            isOpeningCreateFormPage,
            isOpeningLudoListPage,
            isOpeningProfilePage,
            userBasicData 
        } = this.props;
        const { heart, marbles, success_rate, win_rate } = userBasicData;

        const { isSearching } = this.state;

        let headerProfile;
        if (userBasicData.name) {    // user has login
            headerProfile = <HeaderFBPhoto userBasicData={userBasicData}/>
        } else {    // user has not login
            headerProfile = <HeaderLogIn />
        }
        return (
            /* layout/_header.scss */
            <div className="header">
                <MediaQuery 
                    className="header-left"
                    maxDeviceWidth={768}
                >
                    {
                        isOpeningCreateFormPage ?
                            null
                        :
                            <HeaderPrevPageArrow />
                    }
                    {
                        isSearching ?
                            null
                        :
                            <HeaderLogo 
                                getFilteredLudoList={getFilteredLudoList}
                            />
                    }
                    <SearchIcon />
                </MediaQuery>
                <MediaQuery minDeviceWidth={768}>
                    <HeaderLogo 
                        getFilteredLudoList={getFilteredLudoList}
                    />
                </MediaQuery>
                <div className="header-right">
                    <MediaQuery minDeviceWidth={768}>
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
                    </MediaQuery>
                </div>
                {/*fab menu icon for RWD design*/}
                <label className ="fab-menu">
                    <input className="fab-menu-checkbox" type="checkbox"/>
                    <div className="menu-box">
                        <div className="menu-circle"></div>
                        <ul className="menu-items">
                            <li><span onClick={this.handleFilterClick}>遊樂場</span></li>
                            <li><span onClick={this.handleTemplateFilterClick}>模板</span></li>
                            <li><Link to="/profile">個人資訊</Link></li>
                            <li><Link to="/create">創建</Link></li>
                            <li><Link to="/friend">朋友</Link></li>
                            <li><span onClick={this.handleHistoryFilterClick}>歷史紀錄</span></li>
                            {/* TODO: RWD for fab-menu in log in page */}
                            <li>
                                {
                                    this.props.isLoggedIn ?
                                        <a href="http://api.ludonow.com/logout">
                                            登出
                                        </a>
                                    :
                                        <Link to="/login">登入</Link>
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
