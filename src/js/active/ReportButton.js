import React from 'react';
import { Link } from 'react-router';

export default class ReportButton extends React.Component {
    constructor(props) {
        super(props);
    }

    /* components/report-from.scss */
    render() {
        return (
            <div className="report-button-bar">
                <div className="report-button">
                    <Link to={`/ludo/${this.props.ludoId}/mobile-report-form`}>report button</Link>
                </div>
            </div>
        );
    }
}