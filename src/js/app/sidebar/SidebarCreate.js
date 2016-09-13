import React from "react";
import { Link } from "react-router";

import Create from '../../create/Create';

export default class SidebarCreate extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Link to={`/create`}>
                <div className="right-sidebar-item__icon start-ludo-icon"></div>
            </Link>
        );
    }
};