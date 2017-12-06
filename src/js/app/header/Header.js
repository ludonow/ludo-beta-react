import React, { Component, PropTypes } from 'react';
import { browserHistory, Link } from 'react-router';
import MediaQuery from 'react-responsive';
import styled from 'styled-components';
import TextField from 'material-ui/TextField';
import { grey300, grey700 } from 'material-ui/styles/colors';

import axios from '../../axios-config';

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
import CancelIcon from 'material-ui/svg-icons/navigation/cancel';
import CompareArrowsIcon from 'material-ui/svg-icons/action/compare-arrows';

/**
 * hacky usage of styled-component to use react-tap-event-plugin
 * ref: https://github.com/styled-components/styled-components/issues/527#issuecomment-281931998
 */
const A = (props) => (
    <a {...props} />
);

const CancelIconContainer  = styled(A)`
    padding: 5px;
`;

const SearchBar = styled.div`
    width: 260px;
    background-color: #999999;
    border-radius: 50px;
    display: inline-flex;

    & > img {
        position: relative;
        padding: 5px 10px;
        width: 20px;
        height: 20px;
    }

    & input {
        border: none;
        outline: none;
        background-color: #999999;
        caret-color: white;
        color: white;
        font-size: 0.8rem;
    }
`;

const SearchBarContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    padding: 20px;
`;

const SearchIconContainer = styled(A)`
    position: absolute;
    right: 0;
    padding: 20px;

    img {
        width: 30px;
        height: 30px;
    }
`;

const MobileSearchBar = ({
    handleSearchSubmit,
    handleSearchingTextChange,
    handleSearchingTextClear,
    searchingText
}) => (
    <SearchBarContainer>
        <SearchBar>
            <img src={magnifierIcon} />
            <input
                autoFocus
                onChange={handleSearchingTextChange}
                onKeyUp={handleSearchSubmit}
                type="text"
                value={searchingText}
            />
            {
                searchingText ?
                    <CancelIconContainer
                        onTouchTap={handleSearchingTextClear}
                    >
                        <CancelIcon
                            color={grey700}
                            style={{height: '20px', width: '20px'}}
                        />
                    </CancelIconContainer>
                :
                    null
            }
        </SearchBar>
    </SearchBarContainer>
);

const SearchIcon = ({ handleMobileSearchTouchTap }) => (
    <SearchIconContainer
        onTouchTap={handleMobileSearchTouchTap}
    >
        <img src={magnifierIcon} />
    </SearchIconContainer>
);

const SeachtCloseIcon = ({ handleMobileSearchCancelTouchTap }) => (
    <SearchIconContainer
        onTouchTap={handleMobileSearchCancelTouchTap}
    >
        <CompareArrowsIcon
            color={grey300}
            style={{height: '30px', width: '30px'}}
        />
    </SearchIconContainer>
);

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSearching: false,
            searchingText: ''
        }
        this.handleFilterClick = this.handleFilterClick.bind(this);
        this.handleHistoryFilterClick = this.handleHistoryFilterClick.bind(this);
        this.handleMobileSearchCancelTouchTap = this.handleMobileSearchCancelTouchTap.bind(this);
        this.handleMobileSearchTouchTap = this.handleMobileSearchTouchTap.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleSearchingTextChange = this.handleSearchingTextChange.bind(this);
        this.handleSearchingTextClear = this.handleSearchingTextClear.bind(this);
        this.handleTemplateFilterClick = this.handleTemplateFilterClick.bind(this);
    }

    handleFilterClick(event) {
        this.props.getFilteredLudoList(event.target.value);
        browserHistory.push('/playground');
    }

    handleHistoryFilterClick() {
        this.props.getFilteredLudoList('stage=3');
        browserHistory.push('/playground');
    }

    handleMobileSearchCancelTouchTap(event) {
        event.preventDefault();
        this.setState(
            prevState => ({
                isSearching: false
            })
        );
    }

    handleMobileSearchTouchTap(event) {
        event.preventDefault();
        this.setState(
            prevState => ({
                isSearching: true
            })
        );
    }

    handleSearchSubmit(event) {
        if (event.key === 'Enter') {
            const searchParams = {
                "tag": event.currentTarget.value,
                "title": event.currentTarget.value
            };
            const filterCondition = Object.entries(searchParams).map(([key, val]) => `${key}=${val}`).join('&');
            this.props.getFilteredLudoList(filterCondition);
        }
    }

    handleSearchingTextChange(event) {
        this.setState({
            searchingText: event.currentTarget.value
        });
    }

    handleSearchingTextClear() {
        this.setState({
            searchingText: ''
        });
    }

    handleTemplateFilterClick() {
        this.props.getFilteredLudoList('stage=0');
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

        const {
            isSearching,
            searchingText
        } = this.state;

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
                    maxDeviceWidth={767}
                >
                    {
                        isOpeningCreateFormPage ?
                            null
                        :
                            <HeaderPrevPageArrow />
                    }
                    {
                        isSearching ?
                            <MobileSearchBar
                                handleSearchSubmit={this.handleSearchSubmit}
                                handleSearchingTextChange={this.handleSearchingTextChange}
                                handleSearchingTextClear={this.handleSearchingTextClear}
                                searchingText={searchingText}
                            />
                        :
                            <HeaderLogo 
                                getFilteredLudoList={getFilteredLudoList}
                            />
                    }
                    {
                        isSearching ?
                            <SeachtCloseIcon
                                handleMobileSearchCancelTouchTap={this.handleMobileSearchCancelTouchTap}
                            />
                        :
                            <SearchIcon
                                handleMobileSearchTouchTap={this.handleMobileSearchTouchTap}
                            />
                    }
                </MediaQuery>
                <MediaQuery
                    minDeviceWidth={768}
                >
                    <HeaderLogo 
                        getFilteredLudoList={getFilteredLudoList}
                    />
                </MediaQuery>
                <MediaQuery
                    className="header-right"
                    minDeviceWidth={768}
                >
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
