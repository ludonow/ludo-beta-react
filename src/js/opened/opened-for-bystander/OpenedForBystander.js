import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import MediaQuery from 'react-responsive';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styled from 'styled-components';

import axios from '../../axios-config';
import ActiveCardContent from '../../active/active-for-player/ActiveCardContent';
import DesktopSubmitButton from '../DesktopSubmitButton';
import MobileOpenedLudo from '../MobileOpenedLudo';
import OpenedBystanderForm from './OpenedBystanderForm';

const panel_width = 609;

const CardDetailContainer = styled.div`
    .container {
        display:flex;
        justify-content: center;
        margin-bottom:100px;
    }
`;

const ReportTabs = styled.div`
    .tabs {
        align-items: center;
        justify-content: center;
        width: 609px;
        display: block;
        padding-top:23px;
    }

    .tab_list {
        display:flex;
        width :100%;
        align-items: center;
        justify-content: center;
    }
    .tab {
        /*border-bottom: 3px solid #727272;*/
        width: 85px;
        font-size: 15px;
        text-align: center;
        display: block;
        padding-bottom: 4px;
        color: #FFFFFF;
        margin:0 55px;
    }

    .selected_tab {
        border-bottom: 1.5px solid #727272;
        color: #727272;
    }

    .panel_container{
        /* display:flex; */
        width :100%;
        align-items: center;
        justify-content: center;
        /* background-color: #ffffff; */
        margin-top:29px;
    }

    .panel {
        padding-top:29px;
        width:100%;
        background-color: #ffffff;
        display:none;
        align-items: center;
        justify-content: center;
    }

    .selected_panel {
        display: flex;
    }

    .panel_report {
        background-color: transparent;
    }
`;

class OpenedForBystander extends Component {
    constructor() {
        super();
        this.state = {
            isJoinButtonDisabled: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        /* TODO: Use notification confirming join */
        this.setState({
            isJoinButtonDisabled: true
        });
        const isSureToJoin = window.confirm('你確定要加入此Ludo嗎？');
        if (isSureToJoin) {
            const { ludo_id } = this.props.params;
            const currentFormValue = this.props.router_currentFormValue;
            const joinLudoPutbody = {
                'duration': currentFormValue.duration,
                'marbles': currentFormValue.marbles,
                'stage': currentFormValue.stage,
                'type': 'match'
            };
            browserHistory.push({
                pathname: `/loading/${ludo_id}`,
                state: joinLudoPutbody,
            });
        } else {
            this.setState({
                isJoinButtonDisabled: false
            });
        }
    }

    /* components/_form.scss */
    render() {
        const { isJoinButtonDisabled } = this.state;
        return (
            <CardDetailContainer>
                <MediaQuery
                    className="container"
                    minWidth={769}
                >
                    <ReportTabs>
                        <Tabs
                            className="tabs"
                            defaultIndex={0}
                            onSelect={index => console.log(index)}
                        >
                            <TabList className="tab_list">
                                <Tab 
                                    className="tab" 
                                    selectedClassName="selected_tab"
                                >
                                    卡片內容
                                </Tab>
                                <Tab
                                    className="tab" 
                                    selectedClassName="selected_tab"
                                >
                                    雙人對戰
                                </Tab>
                            </TabList>
                            <div className="panel_container">
                                <TabPanel 
                                    className="panel" 
                                    selectedClassName="selected_panel"
                                >
                                    <ActiveCardContent {...this.props} />
                                </TabPanel>
                                <TabPanel 
                                    className="panel panel_report" 
                                    selectedClassName="selected_panel"
                                >
                                </TabPanel>
                            </div>
                        </Tabs>
                    </ReportTabs>
                    <DesktopSubmitButton
                        disabled={isJoinButtonDisabled}
                        label="加入戰局"
                        onClick={this.handleSubmit}
                    />
                </MediaQuery>
                <MediaQuery maxWidth={768}>
                    <MobileOpenedLudo {...this.props} />
                </MediaQuery>
            </CardDetailContainer>
        );
    }
}

export default OpenedForBystander;
