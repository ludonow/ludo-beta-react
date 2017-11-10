import React from 'react';

const ReportTags = ({ reportObject }) => (
    <div className="report-tags-container">
        {
            reportObject.tags && reportObject.tags.map((tagString, index) => (
                <span
                    className="react-tagsinput-tag report-tag"
                    key={`report-tag-${index}`}
                >
                    #{tagString}
                </span>
            ))
        }
    </div>
);

export default ReportTags;