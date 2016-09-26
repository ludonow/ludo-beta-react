import React from "react";
import { Link } from "react-router";

import Playground from '../../playground/Playground';
import Profile from '../../profile/Profile';
import Create from '../../create/Create';
import Friend from '../../friend/Friend';

import SidebarPlayground from './SidebarPlayground';
import SidebarProfile from './SidebarProfile';
import SidebarCreate from './SidebarCreate';
import SidebarFriend from './SidebarFriend';
import SidebarSportsPlayground from './SidebarSportsPlayground';
import SidebarReadPlayground from './SidebarReadPlayground';

// const sidebarInstructionTextArray = ['Playground', 'Profile', 'Create', 'Friend', 'Sports', 'Read'];
const sidebarInstructionTextArray = ['遊樂園', '個人資料', '創建Ludo', '朋友', '運動', '閱讀'];

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            instructionText: 0,
            isHoverSidebarIndex: null
        };
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
    }

    handleMouseLeave(event) {
        this.setState({
            isHoverSidebarIndex: null
        });
    }

    handleMouseOver(event) {
        const index = Number(event.currentTarget.id);
        this.setState({
            instructionText: sidebarInstructionTextArray[index],
            isHoverSidebarIndex: index
        });
    }

    render() {
        const { instructionText, isHoverSidebarIndex } = this.state;
        return ( 
            <div className="right-sidebar">
                <div className="right-sidebar-item color-sidebar1" id="0" 
                    onMouseLeave={this.handleMouseLeave}
                    onMouseOver={this.handleMouseOver}
                >
                    <Link to={`playground`}>
                        {
                            isHoverSidebarIndex == 0 ?
                                <div className="right-sidebar-item__instruction">
                                    {instructionText}
                                </div>
                            : null
                        }
                        <SidebarPlayground />
                    </Link>
                </div>
                <div className="right-sidebar-item color-sidebar2" id="1" 
                    onMouseLeave={this.handleMouseLeave}
                    onMouseOver={this.handleMouseOver}
                >
                    <Link to={`/profile/${this.props.currentUserId}`}>
                        {
                            isHoverSidebarIndex == 1 ?
                                <div className="right-sidebar-item__instruction">
                                    {instructionText}
                                </div>
                            : null
                        }
                        <SidebarProfile {...this.props} />
                    </Link>
                </div>
                <div className="right-sidebar-item color-sidebar3" id="2" 
                    onMouseLeave={this.handleMouseLeave}
                    onMouseOver={this.handleMouseOver}
                >
                    <Link to={`/create`}>
                        {
                            isHoverSidebarIndex == 2 ?
                                <div className="right-sidebar-item__instruction">
                                    {instructionText}
                                </div>
                            : null
                        }
                        <SidebarCreate {...this.props} />
                    </Link>
                </div>
                <div className="right-sidebar-item color-sidebar4" id="3" 
                    onMouseLeave={this.handleMouseLeave}
                    onMouseOver={this.handleMouseOver}
                >
                    <Link to={`/friend`}>
                        {
                            isHoverSidebarIndex == 3 ?
                                <div className="right-sidebar-item__instruction">
                                    {instructionText}
                                </div>
                            : null
                        }
                        <SidebarFriend />
                    </Link>
                </div>
                <div className="right-sidebar-item color-sidebar5" id="4" 
                    onMouseLeave={this.handleMouseLeave}
                    onMouseOver={this.handleMouseOver}
                >
                    <Link to={`playground`}>
                        {
                            isHoverSidebarIndex == 4 ?
                                <div className="right-sidebar-item__instruction">
                                    {instructionText}
                                </div>
                            : null
                        }
                        <SidebarSportsPlayground />
                    </Link>
                </div>
                <div className="right-sidebar-item color-sidebar6" id="5" 
                    onMouseLeave={this.handleMouseLeave}
                    onMouseOver={this.handleMouseOver}
                >
                    <Link to={`playground`}>
                        {
                            isHoverSidebarIndex == 5 ?
                                <div className="right-sidebar-item__instruction">
                                    {instructionText}
                                </div>
                            : null
                        }
                        <SidebarReadPlayground />
                    </Link>
                </div>
            </div>
        );
    }
};