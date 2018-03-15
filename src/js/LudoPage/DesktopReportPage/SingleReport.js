import React from 'react';
import styled from 'styled-components';

import DesktopCommentBox from './DesktopCommentBox/index';
import ReportInfo from './ReportInfo';
import ReportIconButton from './ReportIconButton/index';

const SingleReportWrapper = styled.div`
    background: white;
    display: flex;
    flex-direction: column;
    margin: 0 0px 28px 0px;
    width: 100%;
`;

const SingleReport = ({
    anchorEl,
    createDate,
    commentsNick,
    comments,
    content,
    currentLudoId,
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
    imageLocation,
    index,
    isEditingWhichReportIndex,
    isMyReport,
    isPopOverOfEditOpen,
    isPopOverOfExpandMoreOpen,
    reportId,
    reportList,
    userPhotoUrl,
    video,
}) => (
    <SingleReportWrapper key={`player-report-${index}`}>
        <ReportIconButton
            anchorEl={anchorEl}
            createDate={createDate}
            handleEditTextReportClick={handleEditTextReportClick}
            handleEditImageReportClick={handleEditImageReportClick}
            handleReportDelete={handleReportDelete}
            handleReportDenounce={handleReportDenounce}
            handleReportEditButtonTouchTap={handleReportEditButtonTouchTap}
            handleReportExpandMoreButtonTouchTap={handleReportExpandMoreButtonTouchTap}
            index={index}
            isEditingWhichReportIndex={isEditingWhichReportIndex}
            isMyReport={isMyReport}
            isPopOverOfEditOpen={isPopOverOfEditOpen}
            isPopOverOfExpandMoreOpen={isPopOverOfExpandMoreOpen}
            onRequestClose={handleRequestClose}
            reportList={reportList}
            whichList="player"
        />
        <ReportInfo
            content={content}
            handleImageLightboxOpen={handleImageLightboxOpen}
            imageLocation={imageLocation}
            video={video}
        />
        <DesktopCommentBox
            commentListFromDatabase={comments}
            commentsNick={commentsNick}
            currentLudoId={currentLudoId}
            currentUserId={currentUserId}
            handleDenounceBoxOpen={handleDenounceBoxOpen}
            handleShouldReportUpdate={handleShouldReportUpdate}
            isMyReport={isMyReport}
            reportId={reportId}
            userPhotoUrl={userPhotoUrl}
        />
    </SingleReportWrapper>
);

export default SingleReport;
