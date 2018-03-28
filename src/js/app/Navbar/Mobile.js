import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import styled from 'styled-components';

import { baseUrl } from '../../baseurl-config';
import {
    StyledAnchor,
    StyledLink,
} from '../../baseStyle';
import {
    cardSystemLinkInfoList,
    getMyCardListLinkInfoList,
    getSettingLinkInfoList,
} from './common';
import defaultAvatartIcon from '../../../images/header/default_avatar.png';

const authedInfoList = [
    {
        isExternal: true,
        text: "登出",
        url: "https://api.ludonow.com/logout"
    },
];

const myCardListLinkInfoSampleList = [
    {
        text: "個人數據",
        url: "myCardList?stage=1&user_id="
    },
];

const unAuthedInfoList = [
    {
        text: "登入",
        url: "login"
    },
];

// styled components
const ButtonListWrapper = styled.div`
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
    display: ${props => props.isNavbarVisible ? 'flex' : 'none'};
    flex-direction: column;
    height: calc(100vh - 70px);
    justify-content: center;
`;

const InnerCircle = styled.div`
    background-color: ${props => props.isNavbarVisible ? '#F8B10E' : 'white'};
    border-radius: 50%;
    box-shadow: ${props => props.isNavbarVisible ? '' : '0 0 1px -1px'};
    height: 30px;
    width: 30px;
`;

const LinkListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`;

const MobileNavbarWrapper = styled.div`
    bottom: 0;
    position: fixed;
    width: 100%;
    z-index: 3;
`;

const StyledListItem = styled.div`
    background-color: ${props => props.selected ? '#FFC645' : 'transparent'};
    border: 1px solid white;
    border-radius: 20px;
    display: flex;
    font-weight: bold;
    justify-content: center;
    margin: 20px auto;
    padding: 8px 30px;

    &:active, &:focus {
        background-color: #FFC645;
    }
`;

const OutSideCircle = styled.div`
    align-items: center;
    background-color: white;
    border-radius: 50%;
    display: flex;
    height: 50px;
    justify-content: center;
    margin: 20px;
    width: 50px;

    img {
        border-radius: 50%;
        height: 40px;
        width: 40px;
    }
`;

const ToggleButtonWrapper = styled.div`
    bottom: 0;
    position: fixed;
    right: 0;
`;

// child component
const DoubleCircleIcon = ({
    handleClick,
    userPhotoUrl,
}) => (
    <OutSideCircle onClick={handleClick}>
        {
            userPhotoUrl ?
                <img src={userPhotoUrl} />
            :
                <img src={defaultAvatartIcon} />
        }
    </OutSideCircle>
);

// child components
const LinkList = ({
    handleNavbarClose,
    linkInfoList,
    selectedIndex,
    startingIndex,
}) => (
    <LinkListWrapper>
        {
            linkInfoList.map((linkInfo, arrayIndex)=> (
                linkInfo.isExternal ?
                    <StyledAnchor
                        href={linkInfo.url}
                        key={linkInfo.text}
                    >
                        <StyledListItem>
                            {linkInfo.text}
                        </StyledListItem>
                    </StyledAnchor>
                :
                    <StyledLink
                        key={linkInfo.text}
                        onClick={handleNavbarClose}
                        to={`${baseUrl}/${linkInfo.url}`}
                    >
                        <StyledListItem selected={selectedIndex === (arrayIndex + startingIndex)}>
                            {linkInfo.text}
                        </StyledListItem>
                    </StyledLink>
            ))
        }
    </LinkListWrapper>
);

class ToggleButton extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        const {
            handleNavbarToggle,
            isNavbarVisible
        } = this.props;
        handleNavbarToggle(!isNavbarVisible);
    }

    render() {
        const {
            userPhotoUrl,
        } = this.props;

        return (
            <ToggleButtonWrapper>
                <DoubleCircleIcon
                    handleClick={this.handleClick}
                    userPhotoUrl={userPhotoUrl}
                />
            </ToggleButtonWrapper>
        );
    }
}

const Mobile = ({
    chatFuelId,
    currentUserId,
    handleNavbarClose,
    handleNavbarToggle,
    isNavbarVisible,
    selectedIndex,
    userPhotoUrl,
}) => {
    const authInfoList = currentUserId ? authedInfoList : unAuthedInfoList;

    return (
        <MobileNavbarWrapper>
            <ToggleButton
                handleNavbarToggle={handleNavbarToggle}
                isNavbarVisible={isNavbarVisible}
                userPhotoUrl={userPhotoUrl}
            />
            <ButtonListWrapper
                isNavbarVisible={isNavbarVisible}
                onClick={handleNavbarClose}
            >
                <LinkList
                    handleNavbarClose={handleNavbarClose}
                    linkInfoList={cardSystemLinkInfoList}
                    selectedIndex={selectedIndex}
                    startingIndex={0}
                />
                <LinkList
                    handleNavbarClose={handleNavbarClose}
                    linkInfoList={getMyCardListLinkInfoList(myCardListLinkInfoSampleList, currentUserId)}
                    selectedIndex={selectedIndex}
                    startingIndex={3}
                />
                <LinkList
                    handleNavbarClose={handleNavbarClose}
                    linkInfoList={authInfoList}
                    selectedIndex={selectedIndex}
                    startingIndex={4}
                />
                <LinkList
                    handleNavbarClose={handleNavbarClose}
                    linkInfoList={getSettingLinkInfoList(chatFuelId)}
                    selectedIndex={selectedIndex}
                    startingIndex={5}
                />
            </ButtonListWrapper>
        </MobileNavbarWrapper>
    );
}

Mobile.propTypes = {
    chatFuelId: PropTypes.string.isRequired,
    currentUserId: PropTypes.string.isRequired,
    handleNavbarClose: PropTypes.func.isRequired,
    handleNavbarToggle: PropTypes.func.isRequired,
    isNavbarVisible: PropTypes.bool.isRequired,
    selectedIndex: PropTypes.number.isRequired,
    userPhotoUrl: PropTypes.string.isRequired,
};

export default Mobile;
