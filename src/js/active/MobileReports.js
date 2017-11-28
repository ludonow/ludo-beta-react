import React, { Component, PropTypes } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styled from 'styled-components';
import { cyan800, deepOrange200, grey800 } from 'material-ui/styles/colors';

import Avatar from './Avatar';
import ReportButton from './ReportButton';
import ReportList from './ReportList';
import ReportText from './ReportText';

const userPhotoUrl = '../../images/animals/bat.png';

const RoundRadiusTag = styled.span`
    border-radius: 20px;
    padding: 8px 20px;
    background-color: ${cyan800};
    color: white;
    font-size: 0.8rem;
`

const CardContentTab = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 0.8rem;
`;

const CardContentWrapper = styled.div`
    padding: 0 30px;
    color: white;
`;

const CardInterval = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    margin: 30px 0;
    text-align: center;
`;

const CardIntroduction = styled.div`
    white-space: pre-line;
    color: white;
    font-size: 0.8rem;
    font-weight: bold;
    line-height: 1.3;
`;

const CardTitle = styled.div`
    margin: 30px 0;
    text-align: center;
    font-size: 22px;
    font-weight: bold;
`;

const CardTags = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    margin: 15px 0;
    text-align: center;
`;

const CardTag = RoundRadiusTag.extend`
    display: flex;
    align-items: center;
    margin: 5px;
`;

const DarkBackGround = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, .3);
    z-index: -1;
    visibility: ${props => props.display ? 'visible' : 'hidden'};
`;

const IntervalTag = RoundRadiusTag.extend`
    display: flex;
    align-items: center;
    margin: 5px;
    background-color: ${deepOrange200};
`;

const CardContent = ({
    interval,
    introduction,
    tags,
    title
}) => (
    <CardContentWrapper>
        <CardTitle>
            {title}
        </CardTitle>
        <CardTags>
            {
                tags.map((tag, index) => (
                    <CardTag
                        key={`introducton-${index}`}
                    >
                        #{tag}
                    </CardTag>
                ))
            }
        </CardTags>
        <CardInterval>
            <IntervalTag>每{interval}天回報</IntervalTag>
        </CardInterval>
        <CardIntroduction>
            {introduction}
        </CardIntroduction>
    </CardContentWrapper>
);

export default class MobileReports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowingDarkBackGround: false
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
                <Tabs>
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
                        {router_currentFormValue.starter_id == currentUserId
                            ?
                                <ReportButton
                                    label="我要回報！"
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
                        {router_currentFormValue.player_id == currentUserId
                            ?
                                <ReportButton
                                    label="我要回報！"
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
