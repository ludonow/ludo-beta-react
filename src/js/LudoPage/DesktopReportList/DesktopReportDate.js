import React from 'react';

function formatDate (dateString) {
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

/* components/_single-report.scss */
const DesktopReportDate = ({
    index,
    reportList,
}) => (
    <div className="report-date">
        {formatDate(reportList[index].CreatedAt)}
    </div>
);

export default DesktopReportDate;
