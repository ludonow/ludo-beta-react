import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styled from 'styled-components';

import ActivePlayerForm from './ActivePlayerForm';
import ActiveCardContent from './ActiveCardContent';
import ActiveReports from '../ActiveReports';
import DesktopReportPost from '../desktop-report-post/DesktopReportPost';
import MobileReports from '../MobileReports';

const panel_width = 609;

const CardDetailContainer = styled.div`
    .container {
        display: flex;
        justify-content: center;
        margin-bottom: 100px;
                
    }
`;

const ReportTabs = styled.div`
    .tabs {
        align-items: center;
        display: block;
        justify-content: center;
        padding-top: 23px;
        width: 609px;
    }

    .tab_list {
        align-items: center;
        display:flex;
        justify-content: center;
        width: 100%;
    }
    .tab {
        /*border-bottom: 3px solid #727272;*/
        color: #FFFFFF;
        display: block;
        font-size: 15px;
        margin: 0 55px;
        padding-bottom: 4px;
        text-align: center;
        width: 85px;
    }

    .selected_tab {
        border-bottom: 1.5px solid #727272;
        color: #727272;
    }

    .panel_container {
        align-items: center;
        /* background-color: #ffffff; */
        /* display:flex; */
        justify-content: center;
        margin-top:29px;
        width :100%;
    }

    .panel {
        align-items: center;
        background-color: #ffffff;
        display: none;
        justify-content: center;
        padding-top:29px;
        width: 100%;
    }

    .selected_panel {
        display: flex;
    }

    .panel_report {
        background-color: transparent;
    }
`;

export default class ActiveForPlayer extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.handleIsOpeningActivePage(true);
    }

    componentWillUnmount() {
        this.props.handleIsOpeningActivePage(false);
    }

    /* components/_report-form.scss */
    render() {
        const {
            currentUserId,
            params,
            router_currentFormValue
        } = this.props;
        return (
            <CardDetailContainer>
                <MediaQuery minWidth={768} className="container">
                    <ReportTabs>
                        <Tabs defaultIndex={0} onSelect={index => console.log(index)} className="tabs">
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
                                    {/* <ActivePlayerForm  {...this.props} /> */}
                                </TabPanel>
                                <TabPanel 
                                    className="panel panel_report" 
                                    selectedClassName="selected_panel"
                                >   
                                    <ActiveReports {...this.props} />
                                </TabPanel>
                            </div>
                        </Tabs>
                    </ReportTabs>
                    {
                        router_currentFormValue.stage === 1 || router_currentFormValue.stage === 2 ?
                            <DesktopReportPost
                                currentUserId={currentUserId}
                                handleShouldProfileUpdate={this.props.handleShouldProfileUpdate}
                                handleShouldReportUpdate={this.props.handleShouldReportUpdate}
                                ludoId={params.ludo_id}
                                router_currentFormValue={router_currentFormValue}
                            />
                        : null
                    }
                </MediaQuery>
                <MediaQuery maxWidth={768}>
                    <MobileReports {...this.props} />
                </MediaQuery>
            </CardDetailContainer>
        );
    }
}

