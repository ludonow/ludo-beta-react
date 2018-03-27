import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Avatar from '../../../components/Avatar';
import SingleReport from '../../SingleReport';

export const ReportListWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 7px;
    width: 35vw;
`;

const ReportList = ({
    commentsNick,
    currentLudoId,
    currentUserId,
    handleDenounceBoxOpen,
    handleImageLightboxOpen,
    handleReportEditButtonTouchTap,
    handleReportExpandMoreButtonTouchTap,
    handleShouldReportUpdate,
    isMyReport,
    label,
    reportList,
    reportUserId,
    userPhotoUrl,
}) => (
    <ReportListWrapper>
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
                    createDate={reportObject.CreatedAt}
                    commentsNick={commentsNick}
                    comments={reportObject.comments}
                    content={reportObject.content}
                    currentLudoId={currentLudoId}
                    currentUserId={currentUserId}
                    handleDenounceBoxOpen={handleDenounceBoxOpen}
                    handleImageLightboxOpen={handleImageLightboxOpen}
                    handleReportEditButtonTouchTap={handleReportEditButtonTouchTap}
                    handleReportExpandMoreButtonTouchTap={handleReportExpandMoreButtonTouchTap}
                    handleShouldReportUpdate={handleShouldReportUpdate}
                    imageLocation={reportObject.image_location}
                    index={index}
                    isMyReport={isMyReport}
                    key={`${label}-report-${index}`}
                    label={label}
                    reportId={reportObject.report_id}
                    userPhotoUrl={userPhotoUrl}
                    video={reportObject.video}
                />
            ))
        }
    </ReportListWrapper>
);

ReportList.propTypes = {
    commentsNick: PropTypes.object.isRequired,
    currentLudoId: PropTypes.string.isRequired,
    currentUserId: PropTypes.string.isRequired,
    handleDenounceBoxOpen: PropTypes.func.isRequired,
    handleImageLightboxOpen: PropTypes.func.isRequired,
    handleReportEditButtonTouchTap: PropTypes.func.isRequired,
    handleReportExpandMoreButtonTouchTap: PropTypes.func.isRequired,
    handleShouldReportUpdate: PropTypes.func.isRequired,
    isMyReport: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    reportList: PropTypes.array.isRequired,
    reportUserId: PropTypes.string.isRequired,
    userPhotoUrl: PropTypes.string,
};

export default ReportList;
