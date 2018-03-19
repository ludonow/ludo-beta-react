import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import styled from 'styled-components';

import { withEither, withMaybe } from '../components/higher-order-components/index';
import DesktopLudoPage from './DesktopLudoPage';
import MobilePlayingLudo from './MobilePlayingLudo';
import MobileReadyLudo from './MobileReadyLudo';

// rendering condition function
const isUserAuthToViewMobileReadyLudo = (props) => {
    const authToViewMobileReadyLudo = [ 0, 1, 2 ];
    return authToViewMobileReadyLudo.includes(props.router_ludoPageIndex);
};

// child components
const MobileLudoPage = withEither(isUserAuthToViewMobileReadyLudo, MobileReadyLudo)(MobilePlayingLudo);

class LudoPage extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.handleIsOpeningReportPage(true);
    }

    componentWillUnmount() {
        this.props.handleIsOpeningReportPage(false);
    }

    /* components/_report-form.scss */
    render() {
        const {
            currentLudoReportData,
            currentUserId,
            getUserBasicData,
            handleDenounceBoxOpen,
            handleHasGotNewReport,
            handleShouldProfileUpdate,
            handleShouldReportUpdate,
            hasGotNewReport,
            params,
            router_currentFormValue,
            router_ludoPageIndex,
            userBasicData,
        } = this.props;

        return (
            <div>
                <MediaQuery minWidth={769}>
                    <DesktopLudoPage
                        currentLudoReportData={currentLudoReportData}
                        currentUserId={currentUserId}
                        getUserBasicData={getUserBasicData}
                        handleDenounceBoxOpen={handleDenounceBoxOpen}
                        handleHasGotNewReport={handleHasGotNewReport}
                        handleShouldProfileUpdate={handleShouldProfileUpdate}
                        handleShouldReportUpdate={handleShouldReportUpdate}
                        hasGotNewReport={hasGotNewReport}
                        ludoId={params.ludo_id}
                        router_currentFormValue={router_currentFormValue}
                        router_ludoPageIndex={router_ludoPageIndex}
                        userBasicData={userBasicData}
                    />
                </MediaQuery>
                <MediaQuery maxWidth={768}>
                    <MobileLudoPage
                        {...this.props}
                    />
                </MediaQuery>
            </div>
        );
    }
}

export default LudoPage;
