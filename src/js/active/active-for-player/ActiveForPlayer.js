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
                    {
                        router_currentFormValue.stage === 1 || router_currentFormValue.stage === 2 ?
                            <DesktopReportPost
                                currentUserId={currentUserId}
                                handleShouldProfileUpdate={this.props.handleShouldProfileUpdate}
                                handleShouldReportUpdate={this.props.handleShouldReportUpdate}
                                ludoId={params.ludo_id}
                                router_currentFormValue={router_currentFormValue}
                            />
                        : null
                    }
                </MediaQuery>
                <MediaQuery maxDeviceWidth={768}>
                    <MobileReports {...this.props} />
                </MediaQuery>
            </div>
        );
    }
}

