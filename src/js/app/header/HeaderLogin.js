import React, { Component } from 'react';
import { Link } from 'react-router';

import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Tooltip from 'material-ui/internal/Tooltip';

import Login from '../Login';

import headerProfileIcon from '../../../images/header/profile.png';

const style = {
    'fontSize': '12px'
};

export default class HeaderLogin extends Component {
    constructor() {
        super();
        this.state = {
            anchorEl: {},
            isLoginPopOverOpen: false,
            showTooltip: false
        };
        this.handleLogIn = this.handleLogIn.bind(this);
        this.handlePopoverRequestClose = this.handlePopoverRequestClose.bind(this);
        this.handleProfileIconClick = this.handleProfileIconClick.bind(this);
        this.handleTooltipDisappear = this.handleTooltipDisappear.bind(this);
        this.handleTooltipShow = this.handleTooltipShow.bind(this);
    }

    handleLogIn() {
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

    handleTooltipDisappear() {
        this.setState({
            showTooltip: false
        });
    }

    handleTooltipShow() {
        this.setState({
            showTooltip: true
        });
    }

    render() {
        return(
            /* components/_header-profile */
            <div
                className="header-login"
                onMouseLeave={this.handleTooltipDisappear}
                onMouseOver={this.handleTooltipShow}
            >
                <Link to="Login">
                    <img
                        className="header-profile-icon"
                        src={headerProfileIcon}
                    />
                </Link>
                <Tooltip
                    horizontalPosition="left"
                    label="登入"
                    show={this.state.showTooltip}
                    style={{fontSize: 12, right: 15, top: 40, zIndex: 5}}
                    touch
                    verticalPosition="bottom"
                />
            </div>
        );
    }
}