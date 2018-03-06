import React from "react";
import { Link } from "react-router";
import styled from 'styled-components';

import HeaderLeft from '../Header/HeaderLeft';
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

const ProfileLabel = "個人數據";

const myCardListLinkInfoSampleList = [
    {
        text: "等待加入",
        url: "myCardList?stage=1&user_id="
    },
    {
        text: "正在遊戲",
        url: "myCardList?stage=2&user_id="
    },
    {
        text: "已經結束",
        url: "myCardList?stage=3&user_id="
    },
    {
        text: "我的模板",
        url: "myCardList?stage=0&user_id="
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
                    <StyledAnchor 
                        href={linkInfo.url}
                        key={linkInfo.text}
                    >
                        <ListItem>
                            {linkInfo.text}
                        </ListItem>
                    </StyledAnchor>
                :
                    <StyledLink
                        key={linkInfo.text}
                        onClick={handleNavbarClose}
                        to={`${baseUrl}/${linkInfo.url}`}
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
    chatFuelId,
    currentUserId,
    handleNavbarClose,
    handleNavbarToggle,
    isNavbarVisible
}) => {
    return (
        <Modal isNavbarVisible={isNavbarVisible}>
            <NavbarWrapper>
                <HeaderLeft
                    handleNavbarToggle={handleNavbarToggle}
                    isNavbarVisible={isNavbarVisible}
                />
                <LinkList
                    handleNavbarClose={handleNavbarClose}
                    linkInfoList={cardSystemLinkInfoList}
                />
                <LinkList
                    handleNavbarClose={handleNavbarClose}
                    label={ProfileLabel}
                    linkInfoList={getMyCardListLinkInfoList(myCardListLinkInfoSampleList, currentUserId)}
                />
                <LinkList
                    handleNavbarClose={handleNavbarClose}
                    linkInfoList={getSettingLinkInfoList(chatFuelId)}
                />
            </NavbarWrapper>
        </Modal>
    );
};

export default Desktop;
