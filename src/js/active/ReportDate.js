import React, { Component } from 'react';

export default class ReportDate extends Component {
    constructor(props) {
        super(props);
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const formatYear = date.getFullYear();
        const formatMonth = date.getMonth();
        const formatDate = date.getDate();
        const formatHours = date.getHours();
        const formatMinutes = date.getMinutes();
        return `${formatYear}/${formatMonth}/${formatDate} ${formatHours}:${formatMinutes}`;
    }

    render() {
        const { index, reportList } = this.props;
        /* components/_single-report.scss */
        return (
            <div className="report-date">
                {this.formatDate(reportList[index].CreatedAt)}
            </div>
        );
    }
}
