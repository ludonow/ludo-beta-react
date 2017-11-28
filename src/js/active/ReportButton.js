import React from 'react';
import { Link } from 'react-router';

/* components/report-form.scss */
const ReportButton = ({
    disabled,
    label,
    url
}) => (
    <div className="report-button-bar">
        <div
            className="report-button"
            disabled={disabled}
        >
            <Link to={url}>{label}</Link>
        </div>
    </div>
);

export default ReportButton;
