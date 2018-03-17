import React from 'react';
import PropTypes from 'prop-types';
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
    currentLudoId,
    currentUserId,
    handleDenounceBoxOpen,
    handleImageLightboxOpen,
    handleReportDelete,
    handleReportDenounce,
    handleReportDialogOpenWithData,
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
                    currentLudoId={currentLudoId}
                    currentUserId={currentUserId}
                    handleDenounceBoxOpen={handleDenounceBoxOpen}
                    handleImageLightboxOpen={handleImageLightboxOpen}
                    handleReportDelete={handleReportDelete}
                    handleReportDialogOpenWithData={handleReportDialogOpenWithData}
                    handleReportDenounce={handleReportDenounce}
                    handleReportEditButtonTouchTap={handleReportEditButtonTouchTap}
                    handleReportExpandMoreButtonTouchTap={handleReportExpandMoreButtonTouchTap}
                    handleRequestClose={handleRequestClose}
                    handleShouldReportUpdate={handleShouldReportUpdate}
                    imageLocation={reportObject.image_location}
                    index={index}
                    isEditingWhichReportIndex={isEditingWhichReportIndex}
                    isMyReport={isMyReport}
                    isPopOverOfEditOpen={isPopOverOfEditOpen}
                    isPopOverOfExpandMoreOpen={isPopOverOfExpandMoreOpen}
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
    anchorEl: PropTypes.object,
    commentsNick: PropTypes.object.isRequired,
    currentLudoId: PropTypes.string.isRequired,
    currentUserId: PropTypes.string.isRequired,
    handleDenounceBoxOpen: PropTypes.func.isRequired,
    handleImageLightboxOpen: PropTypes.func.isRequired,
    handleReportDelete: PropTypes.func.isRequired,
    handleReportDenounce: PropTypes.func.isRequired,
    handleReportDialogOpenWithData: PropTypes.func.isRequired,
    handleReportEditButtonTouchTap: PropTypes.func.isRequired,
    handleReportExpandMoreButtonTouchTap: PropTypes.func.isRequired,
    handleRequestClose: PropTypes.func.isRequired,
    handleShouldReportUpdate: PropTypes.func.isRequired,
    isEditingWhichReportIndex: PropTypes.number.isRequired,
    isMyReport: PropTypes.bool.isRequired,
    isPopOverOfEditOpen: PropTypes.bool.isRequired,
    isPopOverOfExpandMoreOpen: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    panelWidth: PropTypes.number.isRequired,
    reportList: PropTypes.array.isRequired,
    reportUserId: PropTypes.string.isRequired,
    userPhotoUrl: PropTypes.string.isRequired,
};

export default ReportList;
