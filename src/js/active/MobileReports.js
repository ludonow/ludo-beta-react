import React, { Component, PropTypes } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styled from 'styled-components';

import Avatar from '../components/Avatar';
import CardContent from '../components/CardContent';
import ReportButton from './ReportButton';
import ReportList from './ReportList';
import ReportText from './ReportText';

const userPhotoUrl = '../../images/animals/bat.png';

const CardContentTab = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 0.8rem;
`;

const DarkBackGround = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, .3);
    z-index: -1;
    visibility: ${props => props.display ? 'visible' : 'hidden'};
`;

export default class MobileReports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowingDarkBackGround: true
        };
        this.handleCardContentTabClick = this.handleCardContentTabClick.bind(this);
        this.handlePlayerTabClick = this.handlePlayerTabClick.bind(this);
    }

    componentWillMount() {
        this.props.handleIsOpeningActivePage(true);
        this.props.handleShouldReportUpdate(true);
    }

    componentWillUnmount() {
        this.props.handleIsOpeningActivePage(false);
    }

    handleCardContentTabClick() {
        this.setState({
            isShowingDarkBackGround: true
        });
    }

    handlePlayerTabClick() {
        this.setState({
            isShowingDarkBackGround: false
        });
    }

    render() {
        const { 
            currentLudoReportData,
            currentUserId,
            handleDenounceBoxOpen,
            handleShouldReportUpdate,
            params,
            router_currentFormValue,
            userBasicData
        } = this.props;
        const {
            comments_nick,
            introduction,
            player_id,
            starter_id,
            tags,
            title
        } = router_currentFormValue;
        return (
            <div>
                <DarkBackGround
                    display={this.state.isShowingDarkBackGround}
                />
                <Tabs defaultIndex={1}>
                    <TabList className="react-tabs__tab-list mobile-avatar">
                        <Tab 
                            className="react-tabs__tab mobile-avatar"
                            onClick={this.handlePlayerTabClick}
                            selectedClassName="react-tabs__tab--selected mobile-avatar"
                        >
                            <Avatar
                                avatarBackgroundColorIndex={comments_nick[starter_id][1]}
                                avatarImageIndex={comments_nick[starter_id][0]}
                                isThisBelongToCurrentUser={router_currentFormValue.starter_id == currentUserId}
                                userPhotoUrl={userPhotoUrl}
                            />
                        </Tab>
                        <Tab 
                            className="react-tabs__tab mobile-avatar"
                            onClick={this.handleCardContentTabClick}
                            selectedClassName="react-tabs__tab--selected mobile-avatar"
                        >
                            <CardContentTab>
                                卡片內容
                            </CardContentTab>
                        </Tab>
                        <Tab 
                            className="react-tabs__tab mobile-avatar"
                            onClick={this.handlePlayerTabClick}
                            selectedClassName="react-tabs__tab--selected mobile-avatar"
                        >
                            <Avatar
                                avatarBackgroundColorIndex={comments_nick[player_id][1]}
                                avatarImageIndex={comments_nick[player_id][0]}
                                isThisBelongToCurrentUser={router_currentFormValue.player_id == currentUserId}
                                userPhotoUrl={userPhotoUrl}
                            /> 
                        </Tab>
                    </TabList>

                    <TabPanel>
                        <ReportList
                            currentUserId={currentUserId}
                            handleDenounceBoxOpen={handleDenounceBoxOpen}
                            handleShouldReportUpdate={handleShouldReportUpdate}
                            isThisBelongToCurrentUser={router_currentFormValue.starter_id == currentUserId}
                            reportList={currentLudoReportData.filter(reportObject => reportObject.user_id == router_currentFormValue.starter_id)}
                            router_currentFormValue={router_currentFormValue}
                            userBasicData={userBasicData}
                        />
                        {router_currentFormValue.starter_id == currentUserId || router_currentFormValue.player_id == currentUserId
                            ?
                                <ReportButton
                                    label="我要回報"
                                    url={`/ludo/${params.ludo_id}/mobile-report-form`}
                                />
                            : null
                        }
                    </TabPanel>
                    <TabPanel>
                        <CardContent
                            introduction={introduction}
                            interval={router_currentFormValue.interval ? router_currentFormValue.interval : 1}
                            tags={tags}
                            title={title}
                        />
                        {router_currentFormValue.starter_id == currentUserId ||router_currentFormValue.player_id == currentUserId
                            ?
                                <ReportButton
                                    label="我要回報"
                                    url={`/ludo/${params.ludo_id}/mobile-report-form`}
                                />
                            : null
                        }
                    </TabPanel>
                    <TabPanel>
                        <ReportList
                            currentUserId={currentUserId}
                            handleDenounceBoxOpen={handleDenounceBoxOpen}
                            handleShouldReportUpdate={handleShouldReportUpdate}
                            isThisBelongToCurrentUser={router_currentFormValue.player_id == currentUserId}
                            reportList={currentLudoReportData.filter(reportObject => reportObject.user_id == router_currentFormValue.player_id)}
                            router_currentFormValue={router_currentFormValue}
                            userBasicData={userBasicData}
                        />
                        {router_currentFormValue.starter_id == currentUserId ||router_currentFormValue.player_id == currentUserId
                            ?
                                <ReportButton
                                    label="我要回報"
                                    url={`/ludo/${params.ludo_id}/mobile-report-form`}
                                />
                            : null
                        }
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}

MobileReports.propTypes = {
    currentLudoReportData: PropTypes.arrayOf(
        PropTypes.shape({
            CreatedAt: PropTypes.string.isRequired,
            UpdatedAt: PropTypes.string.isRequired,
            image_location: PropTypes.string,
            ludo_id: PropTypes.string.isRequired,
            report_id: PropTypes.string.isRequired,
            tags: PropTypes.arrayOf(PropTypes.string),
            user_id: PropTypes.string.isRequired
        })
    ).isRequired,
    currentUserId: PropTypes.string.isRequired,
    handleDenounceBoxOpen: PropTypes.func.isRequired,
    handleIsOpeningActivePage: PropTypes.func.isRequired,
    handleShouldReportUpdate: PropTypes.func.isRequired,
    params: PropTypes.shape({
        ludo_id: PropTypes.string
    }).isRequired,
    router_currentFormValue: PropTypes.object.isRequired,
    userBasicData: PropTypes.object.isRequired
};

MobileReports.defaultProps = {
    'router_currentFormValue': {
        'comments_nick': {
            'a': [0, 0],
            'b': [0, 0]
        },
        'player_id': 'a',
        'starter_id': 'b'
    }
};
