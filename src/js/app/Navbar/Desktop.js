import React from "react";
import { Link } from "react-router";
import styled from 'styled-components';

import HeaderLeft from '../Header/HeaderLeft';

const ProfileLabel = "個人數據";

const CardSystemLinkInfoList = [
    {
        text: "遊戲廣場",
        url: "/cardList"
    },
    {
        text: "模板系統",
        url: "/cardList?stage=0"
    },
    {
        text: "創建模板",
        url: "/create"
    }
];

const ProfileLinkInfoList = [
    {
        text: "等待加入",
        url: "/profile"
    },
    {
        text: "正在遊戲",
        url: "/profile"
    },
    {
        text: "已經結束",
        url: "/profile"
    },
    {
        text: "我的模板",
        url: "/profile"
    }
];

const SettingLinkInfoList = [
    // {
    //     text: "帳號設定",
    //     url: "https://www.facebook.com/messages/t/ludonow"
    // },
    // {
    //     text: "說明",
    //     url: "https://www.facebook.com/messages/t/ludonow"
    // },
    {
        isExternal: true,
        text: "提供意見",
        url: "https://www.facebook.com/messages/t/ludonow"
    }
];

// styled components
const Label = styled.div`
    font-size: 12px;
    margin-left: 15px;
    text-align: left;
`;

const LinkListWrapper = styled.ul`
    font-size: 14px;
    margin: 40px auto;
    text-align: center;
`;

const ListItem = styled.li`
    border: 1px transparent solid;
    cursor: pointer;
    margin: 15px 0;
    padding: 2px 0;

    &:active {
        background-color: black;
    }

    &:hover {
        border: 1px white solid;
        border-radius: 1rem;
    }
`;

const Modal = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    display: ${props => props.isNavbarVisible ? 'block' : 'none'};
    height: 100vh;
    position: fixed;
    top: 40px;
    width: 100%;
    z-index: 3;
`;

const NavbarWrapper = styled.div`
    background-color: #374867;
    color: white;
    height: 100vh;
    position: fixed;
    top: 0;
    width: 10vw;
`;

const StyledAnchor = styled.a`
    color: white;
    text-decoration: none;
`;

const StyledLink = styled(Link)`
    color: white;
    text-decoration: none;
`;

// child components
const LinkList = ({
    handleNavbarClose,
    label,
    linkInfoList
}) => (
    <LinkListWrapper>
        { label ?
            <Label>{label}</Label>
            : null
        }
        {
            linkInfoList.map(linkInfo => (
                linkInfo.isExternal ? 
                    <StyledAnchor href={linkInfo.url}>
                        <ListItem>
                            {linkInfo.text}
                        </ListItem>
                    </StyledAnchor>
                :
                    <StyledLink
                        onClick={handleNavbarClose}
                        to={linkInfo.url}
                    >
                        <ListItem>
                            {linkInfo.text}
                        </ListItem>
                    </StyledLink>
            ))
        }
    </LinkListWrapper>
);

const Desktop =({
    handleNavbarClose,
    handleNavbarToggle,
    isNavbarVisible
}) =>  (
    <Modal isNavbarVisible={isNavbarVisible}>
        <NavbarWrapper>
            <HeaderLeft
                handleNavbarToggle={handleNavbarToggle}
                isNavbarVisible={isNavbarVisible}
            />
            <LinkList
                handleNavbarClose={handleNavbarClose}
                linkInfoList={CardSystemLinkInfoList}
            />
            <LinkList
                handleNavbarClose={handleNavbarClose}
                label={ProfileLabel}
                linkInfoList={ProfileLinkInfoList}
            />
            <LinkList
                handleNavbarClose={handleNavbarClose}
                linkInfoList={SettingLinkInfoList}
            />
        </NavbarWrapper>
    </Modal>
);

export default Desktop;
