import React from "react";
import { Link } from "react-router";

import Playground from '../../playground/Playground';

export default class SidebarSportsPlayground extends React.Component {
    render() {
        return (
            <Link to="Playground">
                <div className="right-sidebar-item__icon ludo-sports-icon"></div>
            </Link>
        );
    }
};