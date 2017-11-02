import React from 'react';
import Textarea from 'react-textarea-autosize';

import ReportButton from './ReportButton';

export default class MobileReportForm extends React.Component {
    constructor(props) {
        super(props);
    }

    /* components/report-from.scss */
    render() {
        return (
            <div>
                <div className="mobile-report-form">
                    <Textarea
                        className=""
                        minRows={2}
                        onKeyDown={this.handleSubmit}
                        placeholder="let us know your tips"
                    />
                    <div>
                        take photo
                    </div>
                    <div>
                        select from album image button
                    </div>
                    <div>
                        preview
                    </div>
                </div>
                <ReportButton />
            </div>
        );
    }
}