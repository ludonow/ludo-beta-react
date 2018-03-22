import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import DesktopCardContent from './DesktopCardContent';
import DesktopReportPage from './DesktopReportPage';

const getIsStageOfCardReady = (playerId) => (
    playerId === '0'
);

const panel_width = window.innerWidth * 0.7;

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
        display: flex;
        justify-content: center;
        width: 100%;
    }
    .tab {
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
        justify-content: center;
        margin-top: 29px;
        width: 100%;
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

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 100px;
    width:${panel_width}px;
`;

const DesktopLudoPage = ({
    currentUserId,
    editingForm,
    handleDenounceBoxOpen,
    handleImageLightboxOpen,
    handleReportDialogOpen,
    handleReportDialogOpenWithData,
    handleReportEditButtonTouchTap,
    handleReportExpandMoreButtonTouchTap,
    handleShouldProfileUpdate,
    handleShouldReportUpdate,
    ludoId,
    reportList,
    router_currentFormValue,
    router_ludoPageIndex,
    userBasicData,
}) => (
    <Wrapper>
        <ReportTabs>
            <Tabs
                className="tabs"
                defaultIndex={0}
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
                        <DesktopCardContent router_currentFormValue={router_currentFormValue} />
                    </TabPanel>
                    <TabPanel
                        className="panel panel_report"
                        selectedClassName="selected_panel"
                    >
                        <DesktopReportPage
                            currentUserId={currentUserId}
                            handleDenounceBoxOpen={handleDenounceBoxOpen}
                            handleImageLightboxOpen={handleImageLightboxOpen}
                            handleReportDialogOpenWithData={handleReportDialogOpenWithData}
                            handleReportEditButtonTouchTap={handleReportEditButtonTouchTap}
                            handleReportExpandMoreButtonTouchTap={handleReportExpandMoreButtonTouchTap}
                            handleShouldReportUpdate={handleShouldReportUpdate}
                            isStageOfCardReady={getIsStageOfCardReady(router_currentFormValue.player_id)}
                            ludoId={ludoId}
                            playerReportList={reportList.player}
                            router_currentFormValue={router_currentFormValue}
                            starterReportList={reportList.starter}
                            userPhotoUrl={userBasicData ? userBasicData.photo : ''}
                        />
                    </TabPanel>
                </div>
            </Tabs>
        </ReportTabs>
    </Wrapper>
);

DesktopLudoPage.propTypes = {
    currentUserId: PropTypes.string.isRequired,
    editingForm: PropTypes.object,
    handleDenounceBoxOpen: PropTypes.func.isRequired,
    handleImageLightboxOpen: PropTypes.func.isRequired,
    handleReportDialogOpen: PropTypes.func.isRequired,
    handleReportDialogOpenWithData: PropTypes.func.isRequired,
    handleReportEditButtonTouchTap: PropTypes.func.isRequired,
    handleReportExpandMoreButtonTouchTap: PropTypes.func.isRequired,
    handleShouldProfileUpdate: PropTypes.func.isRequired,
    handleShouldReportUpdate: PropTypes.func.isRequired,
    ludoId: PropTypes.string.isRequired,
    reportList: PropTypes.object,
    router_currentFormValue: PropTypes.object.isRequired,
    router_ludoPageIndex: PropTypes.number.isRequired,
    userBasicData: PropTypes.object.isRequired,
};

export default DesktopLudoPage;
