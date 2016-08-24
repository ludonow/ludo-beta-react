import React from "react";
import { Link } from "react-router";

import Create from '../../create/Create';

export default class SidebarCreate extends React.Component {
    render() {
        return (
            <Link to="Create">
                <div className="right-sidebar-item__icon start-ludo-icon"></div>
            </Link>
        );
    }
};