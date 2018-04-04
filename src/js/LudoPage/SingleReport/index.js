import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CommentBox from './CommentBox';
import IconButton from './IconButton';
import ReportInfo from './ReportInfo';

const SingleReportWrapper = styled.div`
    background: white;
    display: flex;
    flex-direction: column;
    margin: 0 0px 28px 0px;
    width: 100%;
`;

const SingleReport = ({
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
    pathName,
    reportId,
    userPhotoUrl,
    video,
}) => (
    <SingleReportWrapper>
        <IconButton
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
        <CommentBox
            commentListFromDatabase={comments}
            commentsNick={commentsNick}
            currentLudoId={currentLudoId}
            currentUserId={currentUserId}
            handleDenounceBoxOpen={handleDenounceBoxOpen}
            handleShouldReportUpdate={handleShouldReportUpdate}
            isMyReport={isMyReport}
            pathName={pathName}
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
    pathName: PropTypes.string.isRequired,
    reportId: PropTypes.string.isRequired,
    userPhotoUrl: PropTypes.string.isRequired,
    video: PropTypes.string,
};

export default SingleReport;
