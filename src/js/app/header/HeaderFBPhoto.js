import React, { Component } from 'react';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

const style = {
    'fontSize': '12px',
    'textAlign': 'center'
};

export default class HeaderFBPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: {},
            isLoginPopOverOpen: false
        };
        this.handleLogOut = this.handleLogOut.bind(this);
        this.handlePopoverRequestClose = this.handlePopoverRequestClose.bind(this);
        this.handleProfileIconClick = this.handleProfileIconClick.bind(this);
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

    render() {
        const { userBasicData } = this.props;
        return (
            <div
                className="header-fb-photo"
                onClick={this.handleProfileIconClick}
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
            </div>
        );
    }
}