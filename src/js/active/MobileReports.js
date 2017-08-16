import React from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import ReportAvatar from './ReportAvatar';

const userPhotoUrl = '../../images/animals/bat.png';

export default class MobileReports extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { currentUserId, router_currentFormValue } = this.props;
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
                            isThisBelongToCurrentUser={(router_currentFormValue.starter_id == currentUserId)}
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
                            isThisBelongToCurrentUser={(router_currentFormValue.player_id == currentUserId)}
                            userPhotoUrl={userPhotoUrl}
                        /> 
                    </Tab>
                </TabList>

                <TabPanel>
                    <h2>Any content 1</h2>
                </TabPanel>
                <TabPanel>
                    <h2>Any content 2</h2>
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