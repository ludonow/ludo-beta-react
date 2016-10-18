import React, { Component } from 'react';
import { Link } from 'react-router';

import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

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
            isLoginPopOverOpen: false
        };
        this.handleLogIn = this.handleLogIn.bind(this);
        this.handlePopoverRequestClose = this.handlePopoverRequestClose.bind(this);
        this.handleProfileIconClick = this.handleProfileIconClick.bind(this);
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

    render() {
        return(
            <div className="header-login">
                <Link to="Login">
                    <img
                        className="profile-icon"
                        src={headerProfileIcon}
                    />
                </Link>
            </div>
        );
    }
}
    // render() {
    //     return (
    //         <div
    //             className="header-login"
    //             onClick={this.handleProfileIconClick}
    //         >
    //             <img
    //                 className="profile-icon"
    //                 src={headerProfileIcon}
    //             />
    //             <Popover
    //                 anchorEl={this.state.anchorEl}
    //                 onRequestClose={this.handlePopoverRequestClose}
    //                 open={this.state.isLoginPopOverOpen}
    //             >
    //                 <Menu>
    //                     <MenuItem
    //                         href="http://api.ludonow.com/auth/facebook"
    //                         innerDivStyle={style}
    //                         linkButton
    //                         onTouchTap={this.handleLogIn}
    //                         primaryText="FB登入"
    //                     />
    //                 </Menu>
    //             </Popover>
    //         </div>
    //     );
    // }