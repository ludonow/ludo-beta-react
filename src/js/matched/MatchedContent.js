import React from 'react';

import ludo_read_icon from '../../images/matched/matched-content/ludo_read_icon.png';

export default class MatchedContent extends React.Component {
    render() {
        return (
            <div className="grid-item grid-item--half">
                <div className="matched-content">
                    <div className="matched-content-information">
                        <div className="matched-content-information-icon">
                            <img className="matched-content-information-icon__icon" src={ludo_read_icon} />
                        </div>
                        <div className="matched-content-information-tag">
                            <div className="matched-content-information-tag__element">Type</div>
                            <div className="matched-content-information-tag__element">Date</div>
                            <div className="matched-content-information-tag__element">Report</div>
                            <div className="matched-content-information-tag__element">#tag</div>
                        </div>
                        </div>
                    <div className="matched-content-invitation">invitation</div>
                    <div className="matched-content-calendar"></div>
                </div>
            </div>
        );
    }
}