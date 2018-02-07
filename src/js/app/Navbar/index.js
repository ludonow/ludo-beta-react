import React, { Component, PropTypes }from "react";
import { browserHistory, Link } from "react-router";
import styled from 'styled-components';

import HeaderLeft from '../Header/HeaderLeft';

const CardSystemLinkTextList = [
    "遊戲廣場",
    "模板系統",
    "創建模板"
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
    margin: 15px auto;
`;

const Modal = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
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
const CardSystemLinkList = ({ CardSystemLinkTextList }) => (
    <LinkListWrapper>
        {
            CardSystemLinkTextList.map(CardSystemLinkText => (
                <ListItem>
                    {CardSystemLinkText}
                </ListItem>
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

class Navbar extends Component {
    render() {
        return (
            <Modal>
                <NavbarWrapper>
                    <HeaderLeft />
                    <CardSystemLinkList
                        CardSystemLinkTextList={CardSystemLinkTextList}
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
    }
}

export default Navbar;
