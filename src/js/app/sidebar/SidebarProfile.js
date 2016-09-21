import React from "react";
import { Link } from "react-router";

import Profile from '../../profile/Profile';

export default class SidebarProfile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { currentUserId } = this.props;
        return (
            <Link to={`/profile/${currentUserId}`}>
                <div className="right-sidebar-item__icon profile-icon"></div>
            </Link>
        );
    }
};