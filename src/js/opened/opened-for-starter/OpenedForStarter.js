import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import MediaQuery from 'react-responsive';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styled from 'styled-components';

import axios from '../../axios-config';
import ActiveCardContent from '../../active/active-for-player/ActiveCardContent';
import DesktopSubmitButton from '../DesktopSubmitButton';
import MobileOpenedLudo from '../MobileOpenedLudo';
import OpenedStarterForm from './OpenedStarterForm';

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
        display: block;
        justify-content: center;
        padding-top: 23px;
        width: 609px;
    }

    .tab_list {
        align-items: center;
        display: flex;
        justify-content: center;
        width: 100%;
    }
    .tab {
        /*border-bottom: 3px solid #727272;*/
        color: #FFFFFF;
        display: block;
        font-size: 15px;
        margin:0 55px;
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
        /* display: flex; */
        justify-content: center;
        margin-top: 29px;
        width: 100%;
    }

    .panel {
        align-items: center;
        background-color: #ffffff;
        display: none;
        justify-content: center;
        padding-top: 29px;
        width: 100%;
    }

    .selected_panel {
        display: flex;
    }

    .panel_report {
        background-color: transparent;
    }
`;

class OpenedForStarter extends Component {
    constructor() {
        super();
        this.state = {
            isDeleteButtonDisabled: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            isDeleteButtonDisabled: true
        });
        /* TODO: Use notification confirming delete ludo */
        const isSureToDelete = window.confirm('你確定要刪除這個Ludo嗎？');
        if (isSureToDelete) {
            axios.delete(`/apis/ludo/${this.props.params.ludo_id}`)
            .then(response => {
                if (response.data.status == '200') {
                    const { getUserBasicData, handleShouldProfileUpdate } = this.props;
                    getUserBasicData();
                    handleShouldProfileUpdate(true);
                    browserHistory.push('/playground');
                } else {
                    if (window.confirm('刪除Ludo時伺服器未回傳正確資訊，，請點擊「確定」回報此問題給開發團隊')) {
                        window.open("https://www.facebook.com/messages/t/ludonow");
                    }
                    this.setState({
                        isDeleteButtonDisabled: false
                    });
                }
            })
            .catch(error => {
                if (window.confirm('刪除Ludo時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                    window.open("https://www.facebook.com/messages/t/ludonow");
                }
                this.setState({
                    isDeleteButtonDisabled: false
                });
            });
        } else {
            this.setState({
                isDeleteButtonDisabled: false
            });
        }
    }

    /* components/_form.scss */
    render() {
        const { isDeleteButtonDisabled } = this.state;
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
                        disabled={isDeleteButtonDisabled}
                        label="刪除戰局"
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

export default OpenedForStarter;
