import React, { Component } from 'react';
import Textarea from 'react-textarea-autosize';

export default class MobileReportText extends Component {
    constructor(props) {
        super(props);
    }

    /* components/mobile-report-form.scss */
    render() {
        return (
            <div className="mobile-report-form-text-container">
                <Textarea
                    className="mobile-report-form-textarea"
                    maxLength="300"
                    minRows={6}
                    onChange={this.props.onChange}
                    placeholder="輸入要回報的內容"
                    value={this.props.content}
                />
                <div className="mobile-report-form-status">
                    {this.props.content ?
                        <i className="fa fa-check" aria-hidden="true"></i>
                    :
                        null
                    }
                </div>
            </div>
        );
    }
}