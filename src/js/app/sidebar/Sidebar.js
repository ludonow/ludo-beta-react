import React from "react";

import SidebarPlayground from './SidebarPlayground';
import SidebarProfile from './SidebarProfile';
import SidebarCreate from './SidebarCreate';
import SidebarFriend from './SidebarFriend';
import SidebarSportsPlayground from './SidebarSportsPlayground';
import SidebarReadPlayground from './SidebarReadPlayground';

export default class SideBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return ( 
            <div className="right-sidebar">
                <div className="right-sidebar-item color-sidebar1">
                    <SidebarPlayground />
                </div>
                <div className="right-sidebar-item color-sidebar2">
                    <SidebarProfile />
                </div>
                <div className="right-sidebar-item color-sidebar3">
                    <SidebarCreate {...this.props}/>
                </div>
                <div className="right-sidebar-item color-sidebar4">
                    <SidebarFriend />
                </div>
                <div className="right-sidebar-item color-sidebar5">
                    <SidebarSportsPlayground />
                </div>
                <div className="right-sidebar-item color-sidebar6">
                    <SidebarReadPlayground />
                </div>
            </div>
        );
    }
};