import React from 'react';
import styled from 'styled-components';
import ReportCard from './ReportCard';
import MobileCommentBox from './MobileCommentBox';

const MobileReportList = styled.div`
    margin-bottom: 65px;
    padding: 0 30px;
`;

const ReportWithComments = styled.div`
    margin: 20px 0;
`;

const ReportList = ({
    currentUserId,
    handleDenounceBoxOpen,
    handleShouldReportUpdate,
    isThisBelongToCurrentUser,
    reportList,
    router_currentFormValue,
    userBasicData
}) => (
    <MobileReportList>
        {
            reportList && reportList.map(
                (reportObject, index) =>
                <ReportWithComments
                    key={`report-${index}`}
                >
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
                        currentUserId={currentUserId}
                        handleDenounceBoxOpen={handleDenounceBoxOpen}
                        handleShouldReportUpdate={handleShouldReportUpdate}
                        reportId={reportObject.report_id}
                        router_currentFormValue={router_currentFormValue}
                        userBasicData={userBasicData}
                    />
                </ReportWithComments>
            )
        }
    </MobileReportList>
);

export default ReportList;