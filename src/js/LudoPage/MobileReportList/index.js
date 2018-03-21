import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SingleReport from '../SingleReport';

const MobileReportListWrapper = styled.div`
    margin-bottom: 80px;
    padding: 20px 30px 0 30px;
`;

const MobileReportList = ({
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
    <MobileReportListWrapper>
        {
            reportList && reportList.map((reportObject, index) => (
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
    </MobileReportListWrapper>
);

MobileReportList.propTypes = {
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

export default MobileReportList;