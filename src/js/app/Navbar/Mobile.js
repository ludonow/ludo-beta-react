import React, { Component } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';

import { baseUrl } from '../../baseurl-config';

const authedInfoList = [
    {
        isExternal: true,
        text: "登出",
        url: "https://api.ludonow.com/logout"
    },
];

const linkInfoList = [
    {
        text: "遊戲廣場",
        url: "cardList"
    },
    {
        text: "看看範例",
        url: "cardList?stage=0",
    },
    {
        text: "開啟新局",
        url: "create",
    }
];

const myCardListLinkInfoSampleList = [
    {
        text: "個人數據",
        url: "myCardList?stage=1&user_id="
    },
    // {
    //     text: "正在遊戲",
    //     url: "/myCardList?stage=2&user_id="
    // },
    // {
    //     text: "已經結束",
    //     url: "/myCardList?stage=3&user_id="
    // },
    // {
    //     text: "我的模板",
    //     url: "/myCardList?stage=0&user_id="
    // }
];

const settingLinkInfoList = [
    {
        text: "使用教學",
        url: "tutorial"
    },
    {
        isExternal: true,
        text: "提供意見",
        url: "https://m.me/ludonow?ref=%E5%B0%88%E4%BA%BA%E6%9C%8D%E5%8B%99"
    }
];

const unAuthedInfoList = [
    {
        text: "登入",
        url: "login"
    },
];

// styled components
const InnerCircle = styled.div`
    background-color: ${props => props.isNavbarVisible ? '#F8B10E' : 'white'};
    border-radius: 50%;
    box-shadow: ${props => props.isNavbarVisible ? '' : '0 0 1px -1px'};
    height: 30px;
    width: 30px;
`;

const ListWrapper = styled.ul`
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
    display: ${props => props.isNavbarVisible ? 'flex' : 'none'};
    height: calc(100vh - 70px);
    flex-direction: column;
    justify-content: center;
`;

const MobileNavbarWrapper = styled.div`
    bottom: 0;
    position: fixed;
    width: 100%;
    z-index: 3;
`;

const StyledAnchor = styled.a`
    color: white;
    text-decoration: none;
`;

const StyledLink = styled(Link)`
    color: white;
    text-decoration: none;
`;

const StyledListItem = styled.li`
    border: 1px solid white;
    border-radius: 20px;
    font-weight: bold;
    padding: 8px 30px;
    margin: 20px auto;

    &:active, &:focus {
        background-color: #FFC645;
    }
`;

const OutSideCircle = styled.div`
    align-items: center;
    background-color: white;
    border-radius: 50%;
    display: flex;
    height: 40px;
    justify-content: center;
    margin: 20px;
    width: 40px;
`;

const ToggleButtonWrapper = styled.div`
    bottom: 0;
    position: fixed;
    right: 0;
`;

// child component
const DoubleCircleIcon = ({
    handleClick,
    isNavbarVisible
}) => (
    <OutSideCircle onClick={handleClick}>
        <InnerCircle isNavbarVisible={isNavbarVisible} />
    </OutSideCircle>
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
        const { isNavbarVisible } = this.props; 
        return (
            <ToggleButtonWrapper>
                <DoubleCircleIcon
                    handleClick={this.handleClick}
                    isNavbarVisible={isNavbarVisible}
                />
            </ToggleButtonWrapper>
        );
    }
}

const Mobile = ({
    currentUserId,
    handleNavbarClose,
    handleNavbarToggle,
    isNavbarVisible
}) => {
    const myCardListLinkInfoList = myCardListLinkInfoSampleList.map(info => ({
        ...info,
        url: info.url + currentUserId,
    }));

    const authInfoList = currentUserId ? authedInfoList : unAuthedInfoList;

    return (
        <MobileNavbarWrapper>
            <ToggleButton
                handleNavbarToggle={handleNavbarToggle}
                isNavbarVisible={isNavbarVisible}
            />
            <ListWrapper isNavbarVisible={isNavbarVisible}>
                {
                    linkInfoList.map((linkInfo, index) => (
                        <StyledListItem key={`mobile-navbar-link-${index}`}>
                            <StyledLink
                                onClick={handleNavbarClose}
                                to={`${baseUrl}/${linkInfo.url}`}
                            >
                                {linkInfo.text}
                            </StyledLink>
                        </StyledListItem>
                    ))
                }
                {
                    myCardListLinkInfoList.map((linkInfo, index) => (
                        <StyledListItem key={`mobile-navbar-my-card-list-${index}`}>
                            <StyledLink
                                onClick={handleNavbarClose}
                                to={`${baseUrl}/${linkInfo.url}`}
                            >
                                {linkInfo.text}
                            </StyledLink>
                        </StyledListItem>
                    ))
                }
                {
                    authInfoList.map((linkInfo, index) => (
                        <StyledListItem key={`mobile-navbar-auth-${index}`}>
                            {
                                linkInfo.isExternal ? 
                                    <StyledAnchor
                                        href={linkInfo.url}
                                        key={linkInfo.text}
                                    >
                                        {linkInfo.text}
                                    </StyledAnchor>
                                :
                                    <StyledLink
                                        onClick={handleNavbarClose}
                                        to={`${baseUrl}/${linkInfo.url}`}
                                    >
                                        {linkInfo.text}
                                    </StyledLink>
                            }
                        </StyledListItem>
                    ))
                }
                {
                    settingLinkInfoList.map((linkInfo, index) => (
                        <StyledListItem key={`mobile-navbar-auth-${index}`}>
                            {
                                linkInfo.isExternal ? 
                                    <StyledAnchor
                                        href={linkInfo.url}
                                        key={linkInfo.text}
                                    >
                                        {linkInfo.text}
                                    </StyledAnchor>
                                :
                                    <StyledLink
                                        onClick={handleNavbarClose}
                                        to={`${baseUrl}/${linkInfo.url}`}
                                    >
                                        {linkInfo.text}
                                    </StyledLink>
                            }
                        </StyledListItem>
                    ))
                }
            </ListWrapper>
        </MobileNavbarWrapper>
    );
}

export default Mobile;
