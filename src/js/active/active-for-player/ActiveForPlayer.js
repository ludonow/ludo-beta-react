import React, { Component } from 'react';
import MediaQuery from 'react-responsive';

import ActivePlayerForm from './ActivePlayerForm';
import ActiveReports from '../ActiveReports';
import DesktopReportPost from '../desktop-report-post/DesktopReportPost';
import MobileReports from '../MobileReports';

export default class ActiveForPlayer extends Component {
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
        const {
            currentUserId,
            params,
            router_currentFormValue
        } = this.props;
        return (
            <div>
                <MediaQuery minDeviceWidth={768} className="form-and-report">
                    <ActivePlayerForm  {...this.props} />
                    <ActiveReports {...this.props} />
                    <DesktopReportPost
                        currentUserId={currentUserId}
                        ludoId={params.ludo_id}
                        router_currentFormValue={router_currentFormValue}
                    />
                </MediaQuery>
                <MediaQuery maxDeviceWidth={768}>
                    <MobileReports {...this.props} />
                </MediaQuery>
            </div>
        );
    }
}

