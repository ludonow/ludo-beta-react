import React from 'react';
import PropTypes from 'prop-types';
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
    label,
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
            handleRequestClose={handleRequestClose}
            index={index}
            isEditingWhichReportIndex={isEditingWhichReportIndex}
            isMyReport={isMyReport}
            isPopOverOfEditOpen={isPopOverOfEditOpen}
            isPopOverOfExpandMoreOpen={isPopOverOfExpandMoreOpen}
            label={label}
            reportList={reportList}
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

SingleReport.propTypes = {
    anchorEl: PropTypes.object,
    createDate: PropTypes.string.isRequired,
    commentsNick: PropTypes.object.isRequired,
    comments: PropTypes.array,
    content: PropTypes.string.isRequired,
    currentLudoId: PropTypes.string.isRequired,
    currentUserId: PropTypes.string.isRequired,
    handleDenounceBoxOpen: PropTypes.func.isRequired,
    handleEditTextReportClick: PropTypes.func.isRequired,
    handleEditImageReportClick: PropTypes.func.isRequired,
    handleImageLightboxOpen: PropTypes.func.isRequired,
    handleReportDelete: PropTypes.func.isRequired,
    handleReportDenounce: PropTypes.func.isRequired,
    handleReportEditButtonTouchTap: PropTypes.func.isRequired,
    handleReportExpandMoreButtonTouchTap: PropTypes.func.isRequired,
    handleRequestClose: PropTypes.func.isRequired,
    handleShouldReportUpdate: PropTypes.func.isRequired,
    imageLocation: PropTypes.string,
    index: PropTypes.number.isRequired,
    isEditingWhichReportIndex: PropTypes.number.isRequired,
    isMyReport: PropTypes.bool.isRequired,
    isPopOverOfEditOpen: PropTypes.bool.isRequired,
    isPopOverOfExpandMoreOpen: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    reportId: PropTypes.string.isRequired,
    reportList: PropTypes.array.isRequired,
    userPhotoUrl: PropTypes.string.isRequired,
    video: PropTypes.string,
};

export default SingleReport;
