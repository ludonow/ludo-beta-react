import React from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import ReportAvatar from './ReportAvatar';
import ReportList from './ReportList';
import ReportText from './ReportText';

const userPhotoUrl = '../../images/animals/bat.png';

export default class MobileReports extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.handleIsOpeningActivePage(true);
        this.props.handleShouldReportUpdate(true);
    }

    componentWillUnmount() {
        this.props.handleIsOpeningActivePage(false);
    }

    render() {
        const { 
            currentLudoReportData,
            currentUserId,
            handleShouldReportUpdate,
            router_currentFormValue
        } = this.props;
        const { comments_nick, player_id, starter_id } = router_currentFormValue;
        return (
            <Tabs>
                <TabList className="react-tabs__tab-list mobile-avatar">
                    <Tab 
                        className="react-tabs__tab mobile-avatar"
                        selectedClassName="react-tabs__tab--selected mobile-avatar"
                    >
                        <ReportAvatar
                            avatarBackgroundColorIndex={comments_nick[starter_id][1]}
                            avatarImageIndex={comments_nick[starter_id][0]}
                            isThisBelongToCurrentUser={router_currentFormValue.starter_id == currentUserId}
                            userPhotoUrl={userPhotoUrl}
                        />
                    </Tab>
                    <Tab 
                        className="react-tabs__tab mobile-avatar"
                        selectedClassName="react-tabs__tab--selected mobile-avatar"
                    >
                         <ReportAvatar
                            avatarBackgroundColorIndex={comments_nick[player_id][1]}
                            avatarImageIndex={comments_nick[player_id][0]}
                            isThisBelongToCurrentUser={router_currentFormValue.player_id == currentUserId}
                            userPhotoUrl={userPhotoUrl}
                        /> 
                    </Tab>
                </TabList>

                <TabPanel>
                    <ReportList
                        handleShouldReportUpdate={handleShouldReportUpdate}
                        isThisBelongToCurrentUser={router_currentFormValue.starter_id == currentUserId}
                        reportList={currentLudoReportData.filter(reportObject => reportObject.user_id == router_currentFormValue.starter_id)}
                    />
                    {router_currentFormValue.starter_id == currentUserId
                        ? <div>reportButton</div>
                        : null
                    }
                </TabPanel>
                <TabPanel>
                    <ReportList
                        handleShouldReportUpdate={handleShouldReportUpdate}
                        isThisBelongToCurrentUser={router_currentFormValue.player_id == currentUserId}
                        reportList={currentLudoReportData.filter(reportObject => reportObject.user_id == router_currentFormValue.player_id)}
                    />
                    {router_currentFormValue.player_id == currentUserId
                        ? <div>reportButton</div>
                        : null
                    }
                </TabPanel>
            </Tabs>
        );
    }
}

MobileReports.defaultProps = {
    'router_currentFormValue': {
        'comments_nick': {
            'a': [0, 0],
            'b': [0, 0]
        },
        'player_id': 'a',
        'starter_id': 'b'
    }
}