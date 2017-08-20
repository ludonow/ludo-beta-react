import React from 'react';

import ReportCard from './ReportCard';

const ReportList = ({ handleShouldReportUpdate, isThisBelongToCurrentUser, reportList }) => (
    <div>
        { 
            reportList && reportList.map((reportObject, index) => 
                <ReportCard
                    handleShouldReportUpdate={handleShouldReportUpdate}
                    isThisBelongToCurrentUser={isThisBelongToCurrentUser}
                    key={index}
                    reportId={reportObject.report_id}
                    reportObject={reportObject}
                />
            ) 
        }
    </div>
);

export default ReportList;