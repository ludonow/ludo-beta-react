import React from 'react';

import CommentBox from './CommentBox';
import MobileReportEditButton from './MobileReportEditButton';
import MobileReportExpandMoreButton from './MobileReportExpandMoreButton';
import ReportAvatar from './ReportAvatar';
import ReportImage from './ReportImage';
import ReportTags from './ReportTags';
import ReportText from './ReportText';

export default class ReportCard extends React.Component {
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
            // const SPIndex = (event.currentTarget.id).slice(0, 1);
            const SPIndex = (this.state.anchorEl.id).slice(0, 1);
            const arrayIndex = Number(event.currentTarget.id.slice(-1));
            let report_id = null;
            if (SPIndex == 's') {
                report_id = this.state.starterReportList[arrayIndex].report_id;
            } else if (SPIndex == 'p') {
                report_id = this.state.playerReportList[arrayIndex].report_id;
            }
            this.setState({
                isPopOverOfEditOpen: false
            });
            if (report_id) {
              const { router_currentFormValue } = this.props;
              const { ludo_id } = router_currentFormValue;
              axios.delete(`apis/report/${report_id}/${ludo_id}`)
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
            <div className="player-report-container">
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
                <ReportText
                    handleIsEditingText={this.handleIsEditingText}
                    handleShouldReportUpdate={handleShouldReportUpdate}
                    isEditingText={this.state.isEditingText}
                    reportId={reportId}
                    reportObject={reportObject}
                />
                <ReportTags reportObject={reportObject} />
            </div>
        );
    }
}