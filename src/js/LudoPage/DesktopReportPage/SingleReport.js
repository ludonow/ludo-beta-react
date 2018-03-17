import React, { Component } from 'react';
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

class SingleReport extends Component {
    constructor(props) {
        super(props);
        this.handleReportEditing = this.handleReportEditing.bind(this);
    }

    handleReportEditing(event) {
        const fields = event.currentTarget.id.split('-');
        const characterOfUser = String(fields[0]);
        const arrayIndex =  Number(fields[fields.length - 1]);
        const targetReportObject = {
            arrayIndex,
            characterOfUser,
        };

        const {
            handleReportDialogOpenWithData,
            handleRequestClose,
        } = this.props;

        handleReportDialogOpenWithData(targetReportObject);
        handleRequestClose();
    }

    render() {
        const {
            anchorEl,
            createDate,
            commentsNick,
            comments,
            content,
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
            imageLocation,
            index,
            isEditingWhichReportIndex,
            isMyReport,
            isPopOverOfEditOpen,
            isPopOverOfExpandMoreOpen,
            label,
            reportId,
            userPhotoUrl,
            video,
        } = this.props;

        return (
            <SingleReportWrapper>
                <ReportIconButton
                    anchorEl={anchorEl}
                    createDate={createDate}
                    handleReportDelete={handleReportDelete}
                    handleReportDenounce={handleReportDenounce}
                    handleReportDialogOpenWithData={handleReportDialogOpenWithData}
                    handleReportEditButtonTouchTap={handleReportEditButtonTouchTap}
                    handleReportEditing={this.handleReportEditing}
                    handleReportExpandMoreButtonTouchTap={handleReportExpandMoreButtonTouchTap}
                    handleRequestClose={handleRequestClose}
                    index={index}
                    isEditingWhichReportIndex={isEditingWhichReportIndex}
                    isMyReport={isMyReport}
                    isPopOverOfEditOpen={isPopOverOfEditOpen}
                    isPopOverOfExpandMoreOpen={isPopOverOfExpandMoreOpen}
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
    }
}

SingleReport.propTypes = {
    anchorEl: PropTypes.object,
    createDate: PropTypes.string.isRequired,
    commentsNick: PropTypes.object.isRequired,
    comments: PropTypes.array,
    content: PropTypes.string,
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
    imageLocation: PropTypes.string,
    index: PropTypes.number.isRequired,
    isEditingWhichReportIndex: PropTypes.number.isRequired,
    isMyReport: PropTypes.bool.isRequired,
    isPopOverOfEditOpen: PropTypes.bool.isRequired,
    isPopOverOfExpandMoreOpen: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    reportId: PropTypes.string.isRequired,
    userPhotoUrl: PropTypes.string.isRequired,
    video: PropTypes.string,
};

export default SingleReport;
