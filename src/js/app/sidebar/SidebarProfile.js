import React from "react";
import { Link } from "react-router";

import Profile from '../../profile/Profile';

export default class SidebarProfile extends React.Component {
    render() {
        return (
            <Link to="Profile">
                <div className="right-sidebar-item__icon profile-icon"></div>
            </Link>
        );
    }
};