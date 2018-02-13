import React from "react";
import { Link } from "react-router";
import styled from 'styled-components';

import HeaderLeft from '../Header/HeaderLeft';

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

const ProfileLabel = "個人數據";

const ProfileLinkTextList = [
    "等待加入",
    "正在遊戲",
    "已經結束",
    "我的模板"
];

const SettingLinkTextList = [
    "帳號設定",
    "說明",
    "提供意見"
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

// child components
const CardSystemLinkList = ({ CardSystemLinkInfoList }) => (
    <LinkListWrapper>
        {
            CardSystemLinkInfoList.map(CardSystemLinkInfo => (
                <Link to={CardSystemLinkInfo.url}>
                    <ListItem>
                        {CardSystemLinkInfo.text}
                    </ListItem>
                </Link>
            ))
        }
    </LinkListWrapper>
);

const ProfileLinkList = ({ ProfileLabel, ProfileLinkTextList }) => (
    <LinkListWrapper>
        <Label>{ProfileLabel}</Label>
        {
            ProfileLinkTextList.map(ProfileLinkText => (
                <ListItem>
                    {ProfileLinkText}
                </ListItem>
            ))
        }
    </LinkListWrapper>
);

const SettingLinkList = ({ SettingLinkTextList }) => (
    <LinkListWrapper>
        {
            SettingLinkTextList.map(SettingLinkText => (
                <ListItem>
                    {SettingLinkText}
                </ListItem>
            ))
        }
    </LinkListWrapper>
);

const Navbar =({
    handleNavbarToggle,
    isNavbarVisible
}) =>  (
    <Modal isNavbarVisible={isNavbarVisible}>
        <NavbarWrapper>
            <HeaderLeft
                handleNavbarToggle={handleNavbarToggle}
                isNavbarVisible={isNavbarVisible}
            />
            <CardSystemLinkList
                CardSystemLinkInfoList={CardSystemLinkInfoList}
            />
            <ProfileLinkList
                ProfileLabel={ProfileLabel}
                ProfileLinkTextList={ProfileLinkTextList}
            />
            <SettingLinkList
                SettingLinkTextList={SettingLinkTextList}
            />
        </NavbarWrapper>
    </Modal>
);

export default Navbar;
