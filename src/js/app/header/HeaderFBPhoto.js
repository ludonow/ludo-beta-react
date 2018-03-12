import React, { Component } from 'react';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import styled from 'styled-components';

// styled-components
const AvatarPhotoWrapper = styled.div`
    img {
        height: 20px;
        margin-right: 15px;
        width: 20px;
    }
`;

// override material-ui
const menuItemStyle = {
    'fontSize': '12px',
    'textAlign': 'center'
};

export default class HeaderFBPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: {},
            anchorOrigin: {
                "horizontal": "right",
                "vertical": "bottom"
            },
            isLoginPopOverOpen: false,
            showTooltip: false,
            targetOrigin: {
                "horizontal": "right",
                "vertical": "top"
            }
        };
        this.handleLogOut = this.handleLogOut.bind(this);
        this.handlePopoverRequestClose = this.handlePopoverRequestClose.bind(this);
        this.handleProfileIconClick = this.handleProfileIconClick.bind(this);
        this.handleTooltipDisplay = this.handleTooltipDisplay.bind(this);
        this.handleTooltipHide = this.handleTooltipHide.bind(this);
    }

    handleLogOut() {
        this.handlePopoverRequestClose();
    }

    handlePopoverRequestClose() {
        this.setState({
            isLoginPopOverOpen: false
        });
    }

    handleProfileIconClick(event) {
        this.setState({
            anchorEl: event.currentTarget,
            isLoginPopOverOpen: true
        });
    }

    handleTooltipDisplay() {
        this.setState({
            showTooltip: true
        });
    }

    handleTooltipHide() {
        this.setState({
            showTooltip: false
        });
    }

    render() {
        const { userBasicData } = this.props;
        const {
            anchorEl,
            anchorOrigin,
            isLoginPopOverOpen,
            targetOrigin
        } = this.state;
        return (
            <AvatarPhotoWrapper
                onClick={this.handleProfileIconClick}
                onMouseOver={this.handleTooltipDisplay}
                onMouseLeave={this.handleTooltipHide}
            >
                {
                    userBasicData.photo ?
                        <img src={userBasicData.photo} />
                    : null
                }
                <Popover
                    anchorEl={anchorEl}
                    anchorOrigin={anchorOrigin}
                    onRequestClose={this.handlePopoverRequestClose}
                    open={isLoginPopOverOpen}
                    targetOrigin={targetOrigin}
                >
                    <Menu>
                        <MenuItem
                            href="https://api.ludonow.com/logout"
                            innerDivStyle={menuItemStyle}
                            onTouchTap={this.handleLogOut}
                            primaryText="登出"
                        />
                    </Menu>
                </Popover>
            </AvatarPhotoWrapper>
        );
    }
}