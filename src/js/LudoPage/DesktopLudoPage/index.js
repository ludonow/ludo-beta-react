import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { withTab } from './TabList';
import DesktopCardContent from './DesktopCardContent';
import DesktopReportPage from './DesktopReportPage';

const getIsStageOfCardReady = (playerId) => (
    playerId === '0'
);

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 100px;
    width: 70vw;
`;

const DesktopCardContentWithTab = withTab(DesktopCardContent);
const DesktopReportPageWithTab = withTab(DesktopReportPage);

const DesktopLudoPage = ({
    baseUrlWithSubDomain,
    currentTab,
    currentUserId,
    editingForm,
    handleDenounceBoxOpen,
    handleImageLightboxOpen,
    handleReportDialogOpen,
    handleReportDialogOpenWithData,
    handleReportEditButtonTouchTap,
    handleReportExpandMoreButtonTouchTap,
    handleShouldReportUpdate,
    ludoId,
    reportList,
    router_currentFormValue,
    router_ludoPageIndex,
    userBasicData,
}) => {
    switch(currentTab) {
        case 'card-content':
            return (
                <Wrapper>
                    <DesktopCardContentWithTab
                        currentTab={currentTab}
                        baseUrlWithSubDomain={baseUrlWithSubDomain}
                        router_currentFormValue={router_currentFormValue}
                    />
                </Wrapper>
            )
        case 'report-list':
            return (
                <Wrapper>
                    <DesktopReportPageWithTab
                        currentTab={currentTab}
                        currentUserId={currentUserId}
                        handleDenounceBoxOpen={handleDenounceBoxOpen}
                        handleImageLightboxOpen={handleImageLightboxOpen}
                        handleReportDialogOpenWithData={handleReportDialogOpenWithData}
                        handleReportEditButtonTouchTap={handleReportEditButtonTouchTap}
                        handleReportExpandMoreButtonTouchTap={handleReportExpandMoreButtonTouchTap}
                        handleShouldReportUpdate={handleShouldReportUpdate}
                        isStageOfCardReady={getIsStageOfCardReady(router_currentFormValue.player_id)}
                        ludoId={ludoId}
                        baseUrlWithSubDomain={baseUrlWithSubDomain}
                        playerReportList={reportList.player}
                        router_currentFormValue={router_currentFormValue}
                        starterReportList={reportList.starter}
                        userPhotoUrl={userBasicData ? userBasicData.photo : ''}
                    />
                </Wrapper>
            )
    }
};

DesktopLudoPage.propTypes = {
    currentUserId: PropTypes.string.isRequired,
    editingForm: PropTypes.object,
    handleDenounceBoxOpen: PropTypes.func.isRequired,
    handleImageLightboxOpen: PropTypes.func.isRequired,
    handleReportDialogOpen: PropTypes.func.isRequired,
    handleReportDialogOpenWithData: PropTypes.func.isRequired,
    handleReportEditButtonTouchTap: PropTypes.func.isRequired,
    handleReportExpandMoreButtonTouchTap: PropTypes.func.isRequired,
    handleShouldReportUpdate: PropTypes.func.isRequired,
    ludoId: PropTypes.string.isRequired,
    reportList: PropTypes.object,
    router_currentFormValue: PropTypes.object.isRequired,
    router_ludoPageIndex: PropTypes.number.isRequired,
    userBasicData: PropTypes.object.isRequired,
};

export default DesktopLudoPage;
