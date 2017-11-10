import React from 'react';
import { Link } from 'react-router';

/* components/report-from.scss */
const ReportButton = ({
    disabled,
    label,
    url
}) => (
    <div className="report-button-bar">
        <button
            className="report-button"
            disabled={disabled}
        >
            <Link to={url}>{label}</Link>
        </button>
    </div>
);

export default ReportButton;
