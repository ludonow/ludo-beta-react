import React, { Component } from 'react';
import styled from 'styled-components';
import axios from '../axios-config';
import ReactPlayer from 'react-player';

import CommentBox from './CommentBox';
import MobileReportEditButton from './MobileReportEditButton';
import MobileReportExpandMoreButton from './MobileReportExpandMoreButton';
import ReportImage from './ReportImage';
import ReportTags from './ReportTags';
import ReportText from './ReportText';

const Report = styled.div`
    margin: 0;
`;

export default class ReportCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: {},
            isEditingImage: false,
            isEditingText: false,
            isEditReportButtonClickable: false,
            isPopOverOfEditOpen: false,
            isPopOverOfExpandMoreOpen: false
        };
        this.handleIsEditingImage = this.handleIsEditingImage.bind(this);
        this.handleIsEditingText = this.handleIsEditingText.bind(this);
        this.handleIsDenounceReport = this.handleIsDenounceReport.bind(this);
        this.handleReportEditButtonTouchTap = this.handleReportEditButtonTouchTap.bind(this);
        this.handleReportExpandMoreButtonTouchTap = this.handleReportExpandMoreButtonTouchTap.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.handleReportDelete = this.handleReportDelete.bind(this);
    }

    handleIsDenounceReport(boolean) {
        this.props.handleDenounceBoxOpen({
            currentTargetReportId: this.props.reportId,
        });

        this.setState({
            isPopOverOfExpandMoreOpen: false
        });
    }

    handleIsEditingImage(boolean) {
        this.setState({
            isEditingImage: boolean,
            isPopOverOfEditOpen: false
        });
    }

    handleIsEditingText(boolean) {
        this.setState({
            isEditingText: boolean,
            isPopOverOfEditOpen: false
        });
    }

    handleReportDelete(event) {
        const isSureToDelelteReport = window.confirm('你確定要刪除這則回報嗎？(刪除後不可復原)');
        if (isSureToDelelteReport) {

            this.setState({
                isPopOverOfEditOpen: false
            });

            const { reportObject ,reportId } = this.props;
            axios.delete(`apis/report/${reportId}/${reportObject.ludo_id}`)
            .then(response => {
                if(response.data.status === '200'){
                    this.props.handleShouldReportUpdate(true);
                } else {
                    window.alert(`刪除回報時發生錯誤，請再次一次；若問題仍然發生，請聯絡開發團隊`);
                    console.error(' handleReportDelete else response: ', response);
                    console.error(' handleReportDelete else message: ', response.data.message);
                }
            })
            .catch(error => {
                window.alert(`刪除回報時發生錯誤，請再次一次；若問題仍然發生，請聯絡開發團隊`);
                console.error(' handleReportDelete error: ', error);
            });
        }
    }

    handleReportEditButtonTouchTap(event) {
        /* This prevents ghost click. */
        event.preventDefault();
        this.setState({
            anchorEl: event.currentTarget,
            isPopOverOfEditOpen: true
        });
    }

    handleReportExpandMoreButtonTouchTap(event) {
        /* This prevents ghost click. */
        event.preventDefault();
        this.setState({
            anchorEl: event.currentTarget,
            isPopOverOfExpandMoreOpen: true
        });
    }

    handleRequestClose() {
        this.setState({
            isPopOverOfEditOpen: false,
            isPopOverOfExpandMoreOpen: false
        });
    }

    render() {
        /* components/_single-report.scss */
        const { 
            handleShouldReportUpdate,
            isThisBelongToCurrentUser,
            reportId,
            reportObject
        } = this.props;
        return (
            <Report className="player-report-container">
                {
                    isThisBelongToCurrentUser ?
                        <MobileReportEditButton
                            anchorEl={this.state.anchorEl}
                            handleIsEditingText={this.handleIsEditingText}
                            handleIsEditingImage={this.handleIsEditingImage}
                            handleReportDelete={this.handleReportDelete}
                            handleReportEditButtonTouchTap={this.handleReportEditButtonTouchTap}
                            isPopOverOfEditOpen={this.state.isPopOverOfEditOpen}
                            onRequestClose={this.handleRequestClose}
                            reportObject={reportObject}
                        />
                    :
                        <MobileReportExpandMoreButton
                            anchorEl={this.state.anchorEl}
                            handleIsDenounceReport={this.handleIsDenounceReport}
                            handleReportExpandMoreButtonTouchTap={this.handleReportExpandMoreButtonTouchTap}
                            isPopOverOfExpandMoreOpen={this.state.isPopOverOfExpandMoreOpen}
                            onRequestClose={this.handleRequestClose}
                        />
                }
                <ReportImage
                    handleIsEditingImage={this.handleIsEditingImage}
                    isEditingImage={this.state.isEditingImage}
                    reportId={reportId}
                    reportObject={reportObject}
                />
                { reportObject.video ? 
                    <ReactPlayer url={reportObject.video} 
                        width = "100%"  
                        controls = "true"
                        />
                    : null
                }
                <ReportText
                    handleIsEditingText={this.handleIsEditingText}
                    handleShouldReportUpdate={handleShouldReportUpdate}
                    isEditingText={this.state.isEditingText}
                    reportId={reportId}
                    reportObject={reportObject}
                />
                <ReportTags reportObject={reportObject} />
            </Report>
        );
    }
}