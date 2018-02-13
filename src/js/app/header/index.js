import React, { Component, PropTypes } from 'react';
import { browserHistory, Link } from 'react-router';
import MediaQuery from 'react-responsive';
import styled from 'styled-components';
import TextField from 'material-ui/TextField';
import { grey300 } from 'material-ui/styles/colors';

import axios from '../../axios-config';

import DesktopSearchBar from './SearchBar/DesktopSearchBar';
import HeaderFBPhoto from './HeaderFBPhoto';
import HeaderLeft from './HeaderLeft';
import HeaderLogIn from './HeaderLogIn';
import HeaderPrevPageArrow from './HeaderPrevPageArrow';
import Logo from './Logo';
import MobileSearchBar from './SearchBar/MobileSearchBar';
import Playground from '../../playground/Playground';
import Profile from '../../profile/Profile';
import Create from '../../create/Create';
import Friend from '../../friend/Friend';

import { A } from './SearchBar/common';
import CompareArrowsIcon from 'material-ui/svg-icons/action/compare-arrows';
import magnifierIcon from '../../../images/magnifier.svg';

// styled components
const AvatarWrapper = styled.div``;

const HeaderRightWrapper = styled.div`
    align-items: center;
    display: inline-flex;
    height: 100%;
`;

const HeaderWrapper = styled.div`
    background-color: #717070;
    border-bottom-color: #B6BCC1;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    display: flex;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 3;

    @media (max-width: 767px) {
        height: 70px;
    }
    @media (min-width: 768px) {
        height: 40px;
    }
`;

const SearchIconWrapper = styled(A)`
    position: absolute;
    right: 0;
    padding: 20px;

    img {
        width: 30px;
        height: 30px;
    }
`;

const StyledMediaQuery = styled(MediaQuery)`
    display: inline-flex;
    justify-content: space-between;
    width: 100%;
`;

// child components
const HeaderRight = ({
    userBasicData
}) => (
    <HeaderRightWrapper>
        <AvatarWrapper>
            {
                userBasicData.name ?
                    <HeaderFBPhoto userBasicData={userBasicData} />
                :
                    <HeaderLogIn />
            }
        </AvatarWrapper>
    </HeaderRightWrapper>
);

const SearchIcon = ({ handleMobileSearchTouchTap }) => (
    <SearchIconWrapper onTouchTap={handleMobileSearchTouchTap}>
        <img src={magnifierIcon} />
    </SearchIconWrapper>
);

const SearchCloseIcon = ({ handleMobileSearchCancelTouchTap }) => (
    <SearchIconWrapper onTouchTap={handleMobileSearchCancelTouchTap}>
        <CompareArrowsIcon
            color={grey300}
            style={{height: '30px', width: '30px'}}
        />
    </SearchIconWrapper>
);

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSearching: false,
            searchingText: ''
        };
        this.handleFilterClick = this.handleFilterClick.bind(this);
        this.handleHistoryFilterClick = this.handleHistoryFilterClick.bind(this);
        this.handleMobileSearchCancelTouchTap = this.handleMobileSearchCancelTouchTap.bind(this);
        this.handleMobileSearchTouchTap = this.handleMobileSearchTouchTap.bind(this);
        this.handleSearchSubmitKeyUp = this.handleSearchSubmitKeyUp.bind(this);
        this.handleSearchSubmitTouchTap = this.handleSearchSubmitTouchTap.bind(this);
        this.handleSearchingTextChange = this.handleSearchingTextChange.bind(this);
        this.handleSearchingTextClear = this.handleSearchingTextClear.bind(this);
        this.handleTemplateFilterClick = this.handleTemplateFilterClick.bind(this);
        this.searchSubmit = this.searchSubmit.bind(this);
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

    handleSearchSubmitKeyUp(event) {
        if (event.key === 'Enter') {
            this.searchSubmit(this.state.searchingText);
        }
    }

    handleSearchSubmitTouchTap(event) {
        event.preventDefault();
        this.searchSubmit(this.state.searchingText);
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

    searchSubmit(searchText) {
        const searchParams = {
            "title": searchText
        };
        /**
         * How to serialize an Object into a list of parameters?
         * ref: https://stackoverflow.com/questions/6566456/how-to-serialize-an-object-into-a-list-of-parameters/23639793#23639793
         */
        const filterCondition = Object.entries(searchParams).map(([key, val]) => `${key}=${val}`).join('&');
        browserHistory.push('/playground');
        this.props.getFilteredLudoList(filterCondition);
    }

    render() {
        const {
            getFilteredLudoList,
            getLatestLudoList,
            handleNavbarToggle,
            isNavbarVisible,
            isOpeningCreateFormPage,
            isOpeningLudoListPage,
            isOpeningProfilePage,
            userBasicData 
        } = this.props;

        const {
            isSearching,
            searchingText
        } = this.state;

        return (
            /* layout/_header.scss */
            <HeaderWrapper>
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
                                handleSearchSubmitKeyUp={this.handleSearchSubmitKeyUp}
                                handleSearchSubmitTouchTap={this.handleSearchSubmitTouchTap}
                                handleSearchingTextChange={this.handleSearchingTextChange}
                                handleSearchingTextClear={this.handleSearchingTextClear}
                                searchingText={searchingText}
                            />
                        :
                            <Logo getFilteredLudoList={getFilteredLudoList} />
                    }
                    {
                        isSearching ?
                            <SearchCloseIcon
                                handleMobileSearchCancelTouchTap={this.handleMobileSearchCancelTouchTap}
                            />
                        :
                            <SearchIcon
                                handleMobileSearchTouchTap={this.handleMobileSearchTouchTap}
                            />
                    }
                </MediaQuery>
                <StyledMediaQuery minDeviceWidth={768}>
                    <HeaderLeft
                        getFilteredLudoList={getFilteredLudoList}
                        handleNavbarToggle={handleNavbarToggle}
                        isNavbarVisible={isNavbarVisible}
                    />
                    <DesktopSearchBar
                        handleSearchSubmitKeyUp={this.handleSearchSubmitKeyUp}
                        handleSearchSubmitTouchTap={this.handleSearchSubmitTouchTap}
                        handleSearchingTextChange={this.handleSearchingTextChange}
                        handleSearchingTextClear={this.handleSearchingTextClear}
                        searchingText={searchingText}
                    />
                    <HeaderRight
                        userBasicData={userBasicData}
                    />
                </StyledMediaQuery>
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
            </HeaderWrapper>
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
