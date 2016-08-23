import React from "react";
import { Link } from "react-router";

import Playground from '../../playground/Playground';

export default class SidebarSportsPlayground extends React.Component {
    render() {
        return (
            <div className="right-sidebar-item color-sidebar5">
                <Link to="Playground">
                    <div className="right-sidebar-item__icon ludo-sports-icon"></div>
                </Link>
            </div>
        );
    }
};