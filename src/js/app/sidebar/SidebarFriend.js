import React from "react";
import { Link } from "react-router";

import Friend from '../../friend/Friend';

export default class SidebarFriend extends React.Component {
    render() {
        return (
            <div className="right-sidebar-item color-sidebar4">
                <Link to="Friend">
                    <div className="right-sidebar-item__icon freinds-icon"></div>
                </Link>
            </div>
        );
    }
};