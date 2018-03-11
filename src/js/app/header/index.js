import React, { Component, PropTypes } from 'react';
import { browserHistory, Link } from 'react-router';
import MediaQuery from 'react-responsive';
import styled from 'styled-components';
import TextField from 'material-ui/TextField';
import { grey300 } from 'material-ui/styles/colors';

import axios from '../../axios-config';

import DesktopSearchBar from './SearchBar/DesktopSearchBar';
import HamburgerIcon from './HamburgerIcon';
import HeaderLeft from './HeaderLeft';
import HeaderPrevPageArrow from './HeaderPrevPageArrow';
import HeaderRight from './HeaderRight';
import Logo from './Logo';
import MobileSearchBar from './SearchBar/MobileSearchBar';
import Playground from '../../playground/Playground';
import Profile from '../../profile/Profile';
import Create from '../../create/Create';

import { A } from './SearchBar/common';
import CompareArrowsIcon from 'material-ui/svg-icons/action/compare-arrows';
import magnifierIcon from '../../../images/magnifier.svg';

// styled components
const HeaderWrapper = styled.div`
    background-color: #717070;
    border-bottom-color: #B6BCC1;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    display: flex;
    height: 40px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 3;

    @media (max-width: 768px) {
        height: 70px;
    }
`;

const SearchIconWrapper = styled(A)`
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
        this.handlePersonalCardListToggleButtonClick = this.handlePersonalCardListToggleButtonClick.bind(this);
        this.handleSearchSubmitKeyUp = this.handleSearchSubmitKeyUp.bind(this);
        this.handleSearchSubmitTouchTap = this.handleSearchSubmitTouchTap.bind(this);
        this.handleSearchingTextChange = this.handleSearchingTextChange.bind(this);
        this.handleSearchingTextClear = this.handleSearchingTextClear.bind(this);
        this.handleTemplateFilterClick = this.handleTemplateFilterClick.bind(this);
        this.searchSubmit = this.searchSubmit.bind(this);
    }

    handleFilterClick(event) {
        this.props.getFilteredLudoList(event.target.value);
        browserHistory.push('/cardList');
    }

    handleHistoryFilterClick() {
        this.props.getFilteredLudoList('stage=3');
        browserHistory.push('/cardList');
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

    handlePersonalCardListToggleButtonClick(event) {
        event.preventDefault();
        const {
            handlePersonalCardListToggle,
            isPersonalCardListVisible
        } = this.props;
        handlePersonalCardListToggle(!isPersonalCardListVisible);
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
        browserHistory.push('/cardList');
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
        browserHistory.push(`/search?stage=1&${filterCondition}`);
        // this.props.getFilteredLudoList(filterCondition);
    }

    render() {
        const {
            getFilteredLudoList,
            handleNavbarToggle,
            isNavbarVisible,
            isOpeningCreateFormPage,
            isOpeningLudoListPage,
            isPersonalCardListVisible,
            userBasicData 
        } = this.props;

        const {
            isSearching,
            searchingText
        } = this.state;

        return (
            /* layout/_header.scss */
            <HeaderWrapper>
                <StyledMediaQuery 
                    className="header-left"
                    maxWidth={768}
                >
                    <HamburgerIcon
                        handleNavbarToggle={handleNavbarToggle}
                        isNavbarVisible={isNavbarVisible}
                    />
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
                </StyledMediaQuery>
                <StyledMediaQuery minWidth={769}>
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
                        handlePersonalCardListToggleButtonClick={this.handlePersonalCardListToggleButtonClick}
                        isOpeningLudoListPage={isOpeningLudoListPage}
                        isPersonalCardListVisible={isPersonalCardListVisible}
                        userBasicData={userBasicData}
                    />
                </StyledMediaQuery>
            </HeaderWrapper>
        );
    }
};

Header.propTypes = {
    getFilteredLudoList: PropTypes.func,
    handleNavbarToggle: PropTypes.func,
    handlePersonalCardListToggle: PropTypes.func,
    isNavbarVisible: PropTypes.bool,
    isOpeningCreateFormPage: PropTypes.bool,
    isOpeningLudoListPage: PropTypes.bool,
    isPersonalCardListVisible: PropTypes.bool,
    userBasicData: PropTypes.object
};
