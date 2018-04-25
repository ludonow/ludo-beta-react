import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
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

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSearching: false,
            searchingText: ''
        };
        this.handleMobileSearchCancelTouchTap = this.handleMobileSearchCancelTouchTap.bind(this);
        this.handleMobileSearchTouchTap = this.handleMobileSearchTouchTap.bind(this);
        this.handlePersonalCardListToggleButtonClick = this.handlePersonalCardListToggleButtonClick.bind(this);
        this.handleSearchSubmitKeyUp = this.handleSearchSubmitKeyUp.bind(this);
        this.handleSearchSubmitTouchTap = this.handleSearchSubmitTouchTap.bind(this);
        this.handleSearchingTextChange = this.handleSearchingTextChange.bind(this);
        this.handleSearchingTextClear = this.handleSearchingTextClear.bind(this);
        this.searchSubmit = this.searchSubmit.bind(this);
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

    searchSubmit(searchText) {
        const key = this.props.searchFilter;
        const searchParams = { [key]: searchText };
        /**
         * How to serialize an Object into a list of parameters?
         * ref: https://stackoverflow.com/questions/6566456/how-to-serialize-an-object-into-a-list-of-parameters/23639793#23639793
         */
        const filterCondition = Object.entries(searchParams).map(([key, val]) => `${key}=${val}`).join('&');
        browserHistory.push(`/search?stage=1&${filterCondition}`);
    }

    render() {
        const {
            getFilteredLudoList,
            handleNavbarToggle,
            isNavbarVisible,
            isOpeningLudoListPage,
            isPersonalCardListVisible,
            pathName,
            userBasicData,
        } = this.props;

        const {
            isSearching,
            searchingText,
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
                            <SearchCloseIcon handleMobileSearchCancelTouchTap={this.handleMobileSearchCancelTouchTap} />
                        :
                            <SearchIcon handleMobileSearchTouchTap={this.handleMobileSearchTouchTap} />
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
                        pathName={pathName}
                        userBasicData={userBasicData}
                    />
                </StyledMediaQuery>
            </HeaderWrapper>
        );
    }
};

Header.propTypes = {
    getFilteredLudoList: PropTypes.func.isRequired,
    handleNavbarToggle: PropTypes.func.isRequired,
    handlePersonalCardListToggle: PropTypes.func.isRequired,
    isNavbarVisible: PropTypes.bool.isRequired,
    isOpeningLudoListPage: PropTypes.bool.isRequired,
    isPersonalCardListVisible: PropTypes.bool.isRequired,
    pathName: PropTypes.string.isRequired,
    searchFilter: PropTypes.string.isRequired,
    userBasicData: PropTypes.object.isRequired,
};

export default Header;
