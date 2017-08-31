import React from 'react';

import ReportCard from './ReportCard';
import MobileCommentBox from './MobileCommentBox';

const ReportList = ({ 
    handleDenounceBoxOpen,
    handleShouldReportUpdate,
    isThisBelongToCurrentUser,
    reportList
}) => (
    <div>
        { 
            reportList && reportList.map((reportObject, index) => 
                <div>
                    <ReportCard
                        handleDenounceBoxOpen={handleDenounceBoxOpen}
                        handleShouldReportUpdate={handleShouldReportUpdate}
                        isThisBelongToCurrentUser={isThisBelongToCurrentUser}
                        key={index}
                        reportId={reportObject.report_id}
                        reportObject={reportObject}
                    />
                    <MobileCommentBox
                        commentListFromDatabase={reportObject.comments}
                        reportId={reportObject.report_id}
                    />
                </div>
            ) 
        }
    </div>
);

export default ReportList;