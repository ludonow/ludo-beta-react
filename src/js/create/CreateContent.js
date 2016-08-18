import React from 'react';

import quick_start from '../../images/create/create-content/quick_start_icon.png';

export default class CreateContent extends React.Component {
    render() {
        return (
            <div className="grid-item grid-item--half">
                <div className="create-content">
                    <div className="create-content-information">
                        <div className="create-content-information-icon">
                            <div className="create-content-information-icon__icon">
                                <img src={quick_start} />
                            </div>
                        </div>
                        <div className="create-content-information-tag">
                            <div className="create-content-information-tag__element">Type</div>
                            <div className="create-content-information-tag__element">Date</div>
                            <div className="create-content-information-tag__element">Report</div>
                            <div className="create-content-information-tag__element">#tag</div>
                        </div>
                    </div>
                    <div className="create-content-invitation">invitation</div>
                    <div className="create-content-calendar"></div>
                </div>
            </div>
        );
    }
}