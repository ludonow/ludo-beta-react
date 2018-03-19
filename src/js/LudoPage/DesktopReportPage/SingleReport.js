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

const SingleReport =  ({
    createDate,
    commentsNick,
    comments,
    content,
    currentLudoId,
    currentUserId,
    handleDenounceBoxOpen,
    handleImageLightboxOpen,
    handleReportEditButtonTouchTap,
    handleReportExpandMoreButtonTouchTap,
    handleShouldReportUpdate,
    imageLocation,
    index,
    isMyReport,
    label,
    reportId,
    userPhotoUrl,
    video,
}) => (
    <SingleReportWrapper>
        <ReportIconButton
            createDate={createDate}
            handleReportEditButtonTouchTap={handleReportEditButtonTouchTap}
            handleReportExpandMoreButtonTouchTap={handleReportExpandMoreButtonTouchTap}
            index={index}
            isMyReport={isMyReport}
            label={label}
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
    createDate: PropTypes.string.isRequired,
    commentsNick: PropTypes.object.isRequired,
    comments: PropTypes.array,
    content: PropTypes.string,
    currentLudoId: PropTypes.string.isRequired,
    currentUserId: PropTypes.string.isRequired,
    handleDenounceBoxOpen: PropTypes.func.isRequired,
    handleImageLightboxOpen: PropTypes.func.isRequired,
    handleReportEditButtonTouchTap: PropTypes.func.isRequired,
    handleReportExpandMoreButtonTouchTap: PropTypes.func.isRequired,
    handleShouldReportUpdate: PropTypes.func.isRequired,
    imageLocation: PropTypes.string,
    index: PropTypes.number.isRequired,
    isMyReport: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    reportId: PropTypes.string.isRequired,
    userPhotoUrl: PropTypes.string.isRequired,
    video: PropTypes.string,
};

export default SingleReport;
