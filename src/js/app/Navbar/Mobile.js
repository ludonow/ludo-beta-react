import React, { Component } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';

const linkInfoList = [
    {
        text: '遊戲廣場',
        url: '/cardList'
    },
    {
        text: '模板系統',
        url: '/cardList?stage=0',
    },
    {
        text: '創建模板',
        url: '/create',
    },
    {
        text: '我的訂閱',
        url: '/profile',
    }
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

const StyledLink = styled(Link)`
    color: white;
    text-decoration: none;
`;

const StyledListItem = styled.li`
    border: 1px solid white;
    border-radius: 20px;
    font-weight: bold;
    padding: 8px 30px;
    margin: 30px auto;

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
    handleNavbarClose,
    handleNavbarToggle,
    isNavbarVisible
}) => (
    <MobileNavbarWrapper>
        <ToggleButton
            handleNavbarToggle={handleNavbarToggle}
            isNavbarVisible={isNavbarVisible}
        />
        <ListWrapper isNavbarVisible={isNavbarVisible}>
            {
                linkInfoList.map((linkInfo, index) => (
                    <StyledListItem key={`mobile-navbar-item-${index}`}>
                        <StyledLink
                            onClick={handleNavbarClose}
                            to={linkInfo.url}
                        >
                            {linkInfo.text}
                        </StyledLink>
                    </StyledListItem>
                ))
            }
        </ListWrapper>
    </MobileNavbarWrapper>
);

export default Mobile;
