import React from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import ReportAvatar from './ReportAvatar';

const userPhotoUrl = '../../images/animals/bat.png';

export default class MobileReports extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { router_currentFormValue } = this.props;
        return (
            <Tabs>
                <TabList>
                    <Tab>
                        <ReportAvatar
                            renderWhoseAvatar='starter'
                            router_currentFormValue={router_currentFormValue}
                            userPhotoUrl={userPhotoUrl}
                            whoIsUser='bystander'
                        />  
                    </Tab>
                    <Tab>
                         <ReportAvatar
                            renderWhoseAvatar='player'
                            router_currentFormValue={router_currentFormValue}
                            userPhotoUrl={userPhotoUrl}
                            whoIsUser='bystander'
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