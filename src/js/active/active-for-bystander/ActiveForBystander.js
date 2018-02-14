import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styled from 'styled-components';

import ActiveCardContent from '../active-for-player/ActiveCardContent';
import ActiveBystanderForm from './ActiveBystanderForm';
import ActiveReports from '../ActiveReports';
import MobileReports from '../MobileReports';

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

export default class ActiveForBystander extends Component {
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
                    
                </MediaQuery>
                <MediaQuery maxWidth={768}>
                    <MobileReports {...this.props} />
                </MediaQuery>
            </CardDetailContainer>
        );
    }
}

