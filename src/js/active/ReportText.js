import React from 'react';
import axios from '../axios-config';

import Textarea from 'react-textarea-autosize';

export default class ReportText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reportTextContent: ''
        };
        this.handleFinishReportEditText = this.handleFinishReportEditText.bind(this);
        this.handleReportTextChange = this.handleReportTextChange.bind(this);
    }

    handleFinishReportEditText(event) {
        if (event.keyCode == 13 && !event.shiftKey) {
            event.preventDefault();
            const { handleIsEditingText, handleShouldReportUpdate, reportId } = this.props;
            /* send put request to server to modify text report content */
            if (reportId && this.state.reportTextContent) {
                const reportPutBody = {
                    content: this.state.reportTextContent,
                    image_location: ''
                };
                axios.put(`/apis/report/${reportId}`, reportPutBody)
                .then((response) => {
                    if (response.data.status === '200') {
                        handleShouldReportUpdate(true);
                    } else {
                        console.error('ReportText handleFinishReportEditText put fail response from server: ', response);
                        window.alert('文字回報修改時伺服器回傳失敗訊息，請重試一次；若問題依然發生，請通知開發人員');
                    }
                })
                .catch((error) => {
                    console.error('ReportText handleFinishReportEditText report put error: ', error);
                    window.alert('文字回報修改時發生錯誤，請重試一次；若問題依然發生，請通知開發人員');
                });
            }
            /* reset the flag to show render component */
            handleIsEditingText(false);
        }
    }

    handleReportTextChange(event) {
        this.setState({reportTextContent: event.currentTarget.value});
    }

    render() {
        const { isEditingText, reportObject } = this.props;
        return (
            <div>
                {
                    isEditingText ?
                        <Textarea
                            className="report-content__text-edit"
                            defaultValue={reportObject.content}
                            minRows={2}
                            onChange={this.handleReportTextChange}
                            onKeyDown={this.handleFinishReportEditText}
                        />
                    :
                        <div className="report-content-container">
                            <div className="report-content report-content__text">
                                {reportObject.content}
                            </div>
                        </div>
                }
            </div>
        );
    }
}