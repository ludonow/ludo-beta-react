import React from 'react';
import styled from 'styled-components';

import MobileReportCard from './MobileReportCard/index';
import MobileCommentBox from './MobileCommentBox/index';

const MobileReportListWrapper = styled.div`
    margin-bottom: 65px;
    padding: 20px 30px 0 30px;
`;

const MobileReportList = ({
    currentUserId,
    handleDenounceBoxOpen,
    handleShouldReportUpdate,
    isThisBelongToCurrentUser,
    reportList,
    router_currentFormValue,
    userBasicData,
}) => (
    <MobileReportListWrapper>
        {
            reportList && reportList.map((reportObject, index) => (
                <div
                    key={`report-${index}`}
                >
                    <MobileReportCard
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
                </div>
            ))
        }
    </MobileReportListWrapper>
);

export default MobileReportList;