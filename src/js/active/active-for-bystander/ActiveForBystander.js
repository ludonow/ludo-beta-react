import React, { Component } from 'react';
import MediaQuery from 'react-responsive';

import ActiveBystanderForm from './ActiveBystanderForm';
import ActiveReports from '../ActiveReports';
import MobileReports from '../MobileReports';

export default class ActiveForBystander extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.handleIsOpeningActivePage(true);
    }

    componentWillUnmount() {
        this.props.handleIsOpeningActivePage(false);
    }

    /* components/_report-form.scss */
    render() {
        return (
            <div>
                <MediaQuery minDeviceWidth={768} className="form-and-report">
                    <ActiveBystanderForm  {...this.props} />
                    <ActiveReports {...this.props} />
                </MediaQuery>
                <MediaQuery maxDeviceWidth={768}>
                    <MobileReports {...this.props} />
                </MediaQuery>
            </div>
        );
    }
}

