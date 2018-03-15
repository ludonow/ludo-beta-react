import React from 'react';
import styled from 'styled-components';

import Avatar from '../../components/Avatar';
import DesktopCommentBox from './DesktopCommentBox/index';
import ReportInfo from './ReportInfo';
import ReportIconButton from './ReportIconButton/index';
import SingleReport from './SingleReport';

export const ReportListWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 7px;
    width: ${props => props.width}px;
`;

const ReportList = ({
    anchorEl,
    commentsNick,
    currentUserId,
    handleDenounceBoxOpen,
    handleEditTextReportClick,
    handleEditImageReportClick,
    handleImageLightboxOpen,
    handleReportDelete,
    handleReportDenounce,
    handleReportEditButtonTouchTap,
    handleReportExpandMoreButtonTouchTap,
    handleRequestClose,
    handleShouldReportUpdate,
    isEditingWhichReportIndex,
    isMyReport,
    isPopOverOfEditOpen,
    isPopOverOfExpandMoreOpen,
    label,
    panelWidth,
    reportList,
    reportUserId,
    router_currentLudoId,
    userPhotoUrl,
}) => (
    <ReportListWrapper width={panelWidth/2}>
        <Avatar
            avatarBackgroundColorIndex={commentsNick[reportUserId][1]}
            avatarImageIndex={commentsNick[reportUserId][0]}
            isThisBelongToCurrentUser={isMyReport}
            userPhotoUrl={userPhotoUrl}
            usedInReport={true}
        />
        {
            reportList.length !== 0 && reportList.map((reportObject, index) => (
                <SingleReport
                    anchorEl={anchorEl}
                    createDate={reportObject.CreatedAt}
                    commentsNick={commentsNick}
                    comments={reportObject.comments}
                    content={reportObject.content}
                    currentLudoId={router_currentLudoId}
                    currentUserId={currentUserId}
                    handleDenounceBoxOpen={handleDenounceBoxOpen}
                    handleEditTextReportClick={handleEditTextReportClick}
                    handleEditImageReportClick={handleEditImageReportClick}
                    handleReportDelete={handleReportDelete}
                    handleReportDenounce={handleReportDenounce}
                    handleReportEditButtonTouchTap={handleReportEditButtonTouchTap}
                    handleReportExpandMoreButtonTouchTap={handleReportExpandMoreButtonTouchTap}
                    handleShouldReportUpdate={handleShouldReportUpdate}
                    imageLocation={reportObject.image_location}
                    index={index}
                    isEditingWhichReportIndex={isEditingWhichReportIndex}
                    isMyReport={isMyReport}
                    isPopOverOfEditOpen={isPopOverOfEditOpen}
                    isPopOverOfExpandMoreOpen={isPopOverOfExpandMoreOpen}
                    key={`${label}-report-${index}`}
                    onRequestClose={handleRequestClose}
                    reportId={reportObject.report_id}
                    reportList={reportList}
                    userPhotoUrl={userPhotoUrl}
                    video={reportObject.video}
                />
            ))
        }
    </ReportListWrapper>
);

export default ReportList;
