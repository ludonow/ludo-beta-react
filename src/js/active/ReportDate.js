import React, { Component } from 'react';

export default class ReportDate extends Component {
    constructor(props) {
        super(props);
    }

    formatDate(dateString) {
        const dateArray = dateString.split('-');
        const formatYear = dateArray[0];
        const formatMonth = dateArray[1];
        const dateAndTimeArray = dateArray[2].split(', ');
        const formatDate = dateAndTimeArray[0];
        const timeArray = dateAndTimeArray[1].split(':');
        const formatHours = timeArray[0];
        const minutesAndPeriod = timeArray[1].split(' ');
        const formatMinutes = minutesAndPeriod[0];
        const period = minutesAndPeriod[1];
        return `${formatYear}/${formatMonth}/${formatDate} ${formatHours}:${formatMinutes} ${period}`;
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
