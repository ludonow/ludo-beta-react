import React, { Component } from 'react';
import Textarea from 'react-textarea-autosize';

/* components/mobile-report-form.scss */
const MobileReportText = ({
    content,
    onChange,
}) => (
    <div className="mobile-report-form-text-container">
        <Textarea
            className="mobile-report-form-textarea"
            maxLength="300"
            minRows={6}
            onChange={onChange}
            placeholder="輸入要回報的內容"
            value={content}
        />
        <div className="mobile-report-form-status">
            {
                content ?
                    <i
                        aria-hidden="true"
                        className="fa fa-check"
                    />
                : null
            }
        </div>
    </div>
);

export default MobileReportText;
