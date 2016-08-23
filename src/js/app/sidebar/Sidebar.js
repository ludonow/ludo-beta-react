import React from "react";
import { Link } from "react-router";

import SidebarPlayground from './SidebarPlayground';
import SidebarProfile from './SidebarProfile';
import SidebarCreate from './SidebarCreate';
import SidebarFriend from './SidebarFriend';
import SidebarSportsPlayground from './SidebarSportsPlayground';
import SidebarReadPlayground from './SidebarReadPlayground';

export default class SideBar extends React.Component {
    render() {
        return ( 
            <div className="right-sidebar">
                <SidebarPlayground />
                <SidebarProfile />
                <SidebarCreate />
                <SidebarFriend />
                <SidebarSportsPlayground />
                <SidebarReadPlayground />
            </div>
        );
    }
};