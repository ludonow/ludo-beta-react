import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import { browserHistory } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styled from 'styled-components';
import axios from '../../axios-config';

import ActivePlayerForm from './ActivePlayerForm';
import ActiveCardContent from './ActiveCardContent';
import ActiveReports from '../ActiveReports';
import DesktopReportPost from '../desktop-report-post/DesktopReportPost';
import MobileReports from '../MobileReports';
import MobileOpenedLudo from '../../opened/MobileOpenedLudo.js'
import DesktopSubmitButton from './DesktopSubmitButton';

const panel_width = window.innerWidth * 0.7;

const CardDetailContainer = styled.div`
    .container {
        display: flex;
        justify-content: center;
        margin-bottom: 100px;   
        width:${panel_width}px; 
    }
`;

const ReportTabs = styled.div`
    .tabs {
        align-items: center;
        display: block;
        justify-content: center;
        padding-top: 23px;
        width:${panel_width}px; 
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
        cursor: pointer;
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
        this.state = {
            isDeleteButtonDisabled: false,
            isJoinButtonDisabled: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.props.handleIsOpeningActivePage(true);
    }

    componentWillUnmount() {
        this.props.handleIsOpeningActivePage(false);
    }

    handleSubmit(event) {
        const { router_ludoPageIndex } = this.props;
        event.preventDefault();
        /* TODO: Use notification confirming join */
        if (router_ludoPageIndex === 0 || router_ludoPageIndex === 2) {
            if (!this.props.currentUserId) {
                if (window.confirm('登入後即可加入此卡片！點選「確定」後進入登入頁面。')) {
                    browserHistory.push('/login');
                }
            } else {
                const isSureToJoin = window.confirm('你確定要加入此Ludo嗎？');
                if (isSureToJoin) {
                    this.setState({
                        isJoinButtonDisabled: true,
                    });
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
                        isJoinButtonDisabled: false,
                    });
                }
            }
        } else if (router_ludoPageIndex === 1) {
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
                        browserHistory.push('/cardList');
                    } else {
                        if (window.confirm('刪除Ludo時伺服器未回傳正確資訊，，請點擊「確定」回報此問題給開發團隊')) {
                            window.open("https://www.facebook.com/messages/t/ludonow");
                        }
                        this.setState({
                            isDeleteButtonDisabled: false,
                        });
                    }
                })
                .catch(error => {
                    if (window.confirm('刪除Ludo時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                        window.open("https://www.facebook.com/messages/t/ludonow");
                    }
                    // console.log(error);
                    this.setState({
                        isDeleteButtonDisabled: false,
                    });
                });
            } else {
                this.setState({
                    isDeleteButtonDisabled: false,
                });
            }
        }
    }

    /* components/_report-form.scss */
    render() {
        const {
            currentUserId,
            params,
            router_currentFormValue,
            router_ludoPageIndex
        } = this.props;
        const {
            isDeleteButtonDisabled,
            isJoinButtonDisabled,
        } = this.state;
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
                                    {
                                        router_ludoPageIndex === 3 || router_ludoPageIndex === 4 || router_ludoPageIndex === 5 || router_ludoPageIndex === 6 ?
                                            <ActiveReports {...this.props} />    
                                        : null
                                    }
                                </TabPanel>
                            </div>
                        </Tabs>
                    </ReportTabs>
                    {
                        router_ludoPageIndex === 3 || router_ludoPageIndex === 4 || router_ludoPageIndex === 6 ?
                            <DesktopReportPost
                                currentUserId={currentUserId}
                                handleShouldProfileUpdate={this.props.handleShouldProfileUpdate}
                                handleShouldReportUpdate={this.props.handleShouldReportUpdate}
                                ludoId={params.ludo_id}
                                router_currentFormValue={router_currentFormValue}
                            />
                        : null
                    }
                    {
                        router_ludoPageIndex === 0 || router_ludoPageIndex === 2 ?
                            <DesktopSubmitButton
                                disabled={isJoinButtonDisabled}
                                label="加入戰局"
                                onClick={this.handleSubmit}
                            />
                        :null
                    }
                    {
                        router_ludoPageIndex === 1 ?
                            <DesktopSubmitButton
                                disabled={isDeleteButtonDisabled}
                                label="刪除戰局"
                                onClick={this.handleSubmit}
                            />
                        :null
                    }
                </MediaQuery>
                <MediaQuery maxWidth={768}>
                    {
                        router_ludoPageIndex < 3 ?
                            <MobileOpenedLudo {...this.props} />
                        :
                            <MobileReports {...this.props} />
                    }
                </MediaQuery>
            </CardDetailContainer>
        );
    }
}

