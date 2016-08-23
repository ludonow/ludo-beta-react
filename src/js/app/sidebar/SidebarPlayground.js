import React from "react";
import { Link } from "react-router";

import Playground from '../../playground/Playground';

export default class SidebarPlayground extends React.Component {
    render() {
        return (
            <div className="right-sidebar-item color-sidebar1">
                <Link to="Playground">
                    <div className="right-sidebar-item__icon playground-icon"></div>
                </Link>
            </div>
        );
    }
};