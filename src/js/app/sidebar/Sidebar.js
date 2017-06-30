import React, { Component, PropTypes }from "react";
import { browserHistory, Link } from "react-router";

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
import SidebarTemplate from './SidebarTemplate';

import arrowIcon from '../../../images/sidebar/arrow.png';

// const sidebarInstructionTextArray = ['Playground', 'Profile', 'Create', 'Friend', 'Sports', 'Read'];
const sidebarInstructionTextArray = ['個人資料', '遊樂園', '模板', '創建', '朋友', '閱讀'];

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hoverSidebarIndex: null,
            instructionText: 0,
            isHoverSidebar: false
        };
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handlePlaygroundLink = this.handlePlaygroundLink.bind(this);
        this.handleReadPlaygroundLink = this.handleReadPlaygroundLink.bind(this);
        this.handleSidebarMouseLeave = this.handleSidebarMouseLeave.bind(this);
        this.handleSidebarMouseOver = this.handleSidebarMouseOver.bind(this);
        this.handleTemplateFilterLink = this.handleTemplateFilterLink.bind(this);
    }

    handleMouseLeave(event) {
        this.setState({
            hoverSidebarIndex: null
        });
    }

    handleMouseOver(event) {
        const index = Number(event.currentTarget.id);
        this.setState({
            hoverSidebarIndex: index,
            instructionText: sidebarInstructionTextArray[index]
        });
    }

    handlePlaygroundLink() {
        this.props.getFilteredLudoList();
        browserHistory.push('/playground');
    }

    handleReadPlaygroundLink() {
        this.props.getFilteredLudoList('category_id=2');
        browserHistory.push('/playground');
    }

    handleSidebarMouseLeave(event) {
        if(this.props.isHoveringSidebar) {
            this.props.handleIsHoveringSidebar(false);
        }
    }

    handleSidebarMouseOver(event) {
        if(!this.props.isHoveringSidebar) {
            this.props.handleIsHoveringSidebar(true);
        }
    }

    handleTemplateFilterLink() {
        this.props.getFilteredLudoList('stage=0');
        browserHistory.push('/playground');
    }

    render() {
        const {getFilteredLudoList, hoverSidebarIndex, instructionText } = this.state;
        return (
            /* layout/_right-sidebar.scss */
            <div
                className="right-sidebar-hover-area"
                onMouseLeave={this.handleSidebarMouseLeave}
                onMouseOver={this.handleSidebarMouseOver}
            >
                    <div className={`right-sidebar${this.props.isHoveringSidebar ? ` sidebar-flip` : ``}`}>
                        {/*UserID*/}
                        <div
                            className="right-sidebar-item color-sidebar1"
                            id="0"
                            onMouseLeave={this.handleMouseLeave}
                            onMouseOver={this.handleMouseOver}
                        >
                            <Link to={`/profile/${this.props.currentUserId}`}>
                                {
                                    hoverSidebarIndex == 0 ?
                                        <div className="right-sidebar-item__instruction">
                                            {instructionText}
                                        </div>
                                    : null
                                }
                                <SidebarProfile {...this.props} />
                            </Link>
                        </div>
                        {/*playground*/}
                        <div
                            className="right-sidebar-item color-sidebar2"
                            id="1"
                            onMouseLeave={this.handleMouseLeave}
                            onMouseOver={this.handleMouseOver}
                        >
                            <span onTouchTap={this.handlePlaygroundLink}>
                                {
                                    hoverSidebarIndex == 1 ?
                                        <div className="right-sidebar-item__instruction">
                                            {instructionText}
                                        </div>
                                    : null
                                }
                                <SidebarPlayground />
                            </span>
                        </div>
                        {/*Template*/}
                        <div
                            className="right-sidebar-item color-sidebar3"
                            id="2"
                            onMouseLeave={this.handleMouseLeave}
                            onMouseOver={this.handleMouseOver}
                        >
                            <span onTouchTap={this.handleTemplateFilterLink}>
                                {
                                    hoverSidebarIndex == 2 ?
                                        <div className="right-sidebar-item__instruction">
                                            {instructionText}
                                        </div>
                                    : null
                                }
                                <SidebarTemplate />
                            </span>
                        </div>
                        {/* Create */}
                        <div
                            className="right-sidebar-item color-sidebar4"
                            id="3"
                            onMouseLeave={this.handleMouseLeave}
                            onMouseOver={this.handleMouseOver}
                        >
                            <Link to="/create">
                                {
                                    hoverSidebarIndex == 3 ?
                                        <div className="right-sidebar-item__instruction">
                                            {instructionText}
                                        </div>
                                    : null
                                }
                                <SidebarCreate {...this.props} />
                            </Link>
                        </div>
                        {/*friend*/}
                        <div
                            className="right-sidebar-item color-sidebar5"
                            id="4"
                            onMouseLeave={this.handleMouseLeave}
                            onMouseOver={this.handleMouseOver}
                        >
                            <Link to="/friend">
                                {
                                    hoverSidebarIndex == 4 ?
                                        <div className="right-sidebar-item__instruction">
                                            {instructionText}
                                        </div>
                                    : null
                                }
                                <SidebarFriend />
                            </Link>
                        </div>
                        {/*read*/}
                        <div
                            className="right-sidebar-item color-sidebar6"
                            id="5"
                            onMouseLeave={this.handleMouseLeave}
                            onMouseOver={this.handleMouseOver}
                        >
                            <span onTouchTap={this.handleReadPlaygroundLink}>
                                {
                                    hoverSidebarIndex == 5 ?
                                        <div className="right-sidebar-item__instruction">
                                            {instructionText}
                                        </div>
                                    : null
                                }
                                <SidebarReadPlayground />
                            </span>
                        </div>
                    </div>
                    <div className={`right-sidebar-arrow-container${this.props.isHoveringSidebar ? '' : ' sidebar-flip'}`}>
                        <img src={arrowIcon} />
                    </div>
            </div>
        );
    }
};

Sidebar.propTypes = {
    getFilteredLudoList: PropTypes.func
};
