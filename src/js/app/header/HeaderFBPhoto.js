import React, { Component } from 'react';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Tooltip from 'material-ui/internal/Tooltip';

const style = {
    'fontSize': '12px',
    'textAlign': 'center'
};

export default class HeaderFBPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: {},
            isLoginPopOverOpen: false,
            showTooltip: false
        };
        this.handleLogOut = this.handleLogOut.bind(this);
        this.handlePopoverRequestClose = this.handlePopoverRequestClose.bind(this);
        this.handleProfileIconClick = this.handleProfileIconClick.bind(this);
        this.handleTooltipDisappear = this.handleTooltipDisappear.bind(this);
        this.handleTooltipShow = this.handleTooltipShow.bind(this);
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
        const { userBasicData } = this.props;
        return (
            /* components/_header-profile.scss */
            <div
                className="header-fb-photo"
                onClick={this.handleProfileIconClick}
                onMouseLeave={this.handleTooltipDisappear}
                onMouseOver={this.handleTooltipShow}
            >
                {
                    userBasicData.photo ? 
                        <img
                            className="facebook-avatar"
                            src={userBasicData.photo}
                        />
                    :
                        null
                }
                <Popover
                    anchorEl={this.state.anchorEl}
                    onRequestClose={this.handlePopoverRequestClose}
                    open={this.state.isLoginPopOverOpen}
                >
                    <Menu>
                        <MenuItem
                            href="http://api.ludonow.com/logout"
                            innerDivStyle={style}
                            linkButton
                            onTouchTap={this.handleLogOut}
                            primaryText="登出"
                        />
                    </Menu>
                </Popover>
                <Tooltip
                    horizontalPosition="left"
                    label="登出"
                    show={this.state.showTooltip}
                    style={{fontSize: 12, right: 15, top: 40, zIndex: 5}}
                    touch
                    verticalPosition="bottom"
                />
            </div>
        );
    }
}