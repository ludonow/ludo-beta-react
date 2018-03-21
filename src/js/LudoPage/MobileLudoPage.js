import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styled from 'styled-components';

import { withEither, withMaybe } from '../components/higher-order-components';
import Avatar from '../components/Avatar';
import MobileCardContent from './MobileCardContent';
import MobileReportList from './MobileReportList';
import MobileReportButton from './MobileReportButton';

const DarkBackGround = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, .3);
    z-index: -1;
    visibility: ${props => props.display ? 'visible' : 'hidden'};
`;

const MobileCardContentTab = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 0.8rem;
`;

const NoOpponentDescription = styled.div`
    color: white;
    text-align: center;
`;

const NoOpponentTabWrapper = styled.div`
    align-items: center;
    display: flex;
    font-size: 0.8rem;
    height: 100%;
    justify-content: center;
`;

// rendering condition function
const isStageReady = (props) => props.stage === 1;
const withNoOpponent = (props) => !props.reportUserId;
const unAuthToReport = (props) => {
    const {
        currentUserId,
        playerId,
        stage,
        starterId,
    } = props;

    if (currentUserId === playerId && stage === 2) {
        return false;
    } else if (currentUserId === starterId) {
        if (stage === 1 || stage === 2) {
            return false;
        } else {
            return true;
        }
    } else {
        return true;
    }
}

// child comopnents
const NoOpponent = () => (
    <NoOpponentDescription>
        對手尋找中！
    </NoOpponentDescription>
);
const NoOpponentTab = () => (
    <NoOpponentTabWrapper>
        尚無對手
    </NoOpponentTabWrapper>
);

const PlayerTab = withEither(isStageReady, NoOpponentTab)(Avatar);
const PlayerReportList = withEither(withNoOpponent, NoOpponent)(MobileReportList);
const ReportButtonWithNull = withMaybe(unAuthToReport)(MobileReportButton);

class MobileLudoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowingDarkBackGround: true,
        };
        this.handleCardContentTabClick = this.handleCardContentTabClick.bind(this);
        this.handlePlayerTabClick = this.handlePlayerTabClick.bind(this);
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
            handleImageLightboxOpen,
            handleReportEditButtonTouchTap,
            handleReportExpandMoreButtonTouchTap,
            handleShouldReportUpdate,
            ludoId,
            reportList,
            router_currentFormValue,
            userPhotoUrl,
        } = this.props;
        const {
            comments_nick,
            image_location,
            introduction,
            player_id,
            stage,
            starter_id,
            tags,
            title,
            video,
        } = router_currentFormValue;

        const playerId = player_id === '0' ? '' : player_id;

        return (
            <div>
                <DarkBackGround display={this.state.isShowingDarkBackGround} />
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
                                isThisBelongToCurrentUser={starter_id == currentUserId}
                                userPhotoUrl={userPhotoUrl}
                            />
                        </Tab>
                        <Tab 
                            className="react-tabs__tab mobile-avatar"
                            onClick={this.handleCardContentTabClick}
                            selectedClassName="react-tabs__tab--selected mobile-avatar"
                        >
                            <MobileCardContentTab>
                                卡片內容
                            </MobileCardContentTab>
                        </Tab>
                        <Tab 
                            className="react-tabs__tab mobile-avatar"
                            onClick={this.handlePlayerTabClick}
                            selectedClassName="react-tabs__tab--selected mobile-avatar"
                        >
                            <PlayerTab
                                avatarBackgroundColorIndex={stage === 1 ? 0 : comments_nick[player_id][1]}
                                avatarImageIndex={stage === 1 ? 0 : comments_nick[player_id][0]}
                                isThisBelongToCurrentUser={player_id === currentUserId}
                                stage={stage}
                                userPhotoUrl={userPhotoUrl}
                            />
                        </Tab>
                    </TabList>

                    <TabPanel>
                        <MobileReportList
                            commentsNick={comments_nick}
                            currentLudoId={ludoId}
                            currentUserId={currentUserId}
                            handleDenounceBoxOpen={handleDenounceBoxOpen}
                            handleImageLightboxOpen={handleImageLightboxOpen}
                            handleReportEditButtonTouchTap={handleReportEditButtonTouchTap}
                            handleReportExpandMoreButtonTouchTap={handleReportExpandMoreButtonTouchTap}
                            handleShouldReportUpdate={handleShouldReportUpdate}
                            isMyReport={starter_id === currentUserId}
                            label="starter"
                            reportList={reportList.starter}
                            reportUserId={starter_id}
                            userPhotoUrl={userPhotoUrl}
                        />
                    </TabPanel>
                    <TabPanel>
                        <MobileCardContent
                            handleImageLightboxOpen={handleImageLightboxOpen}
                            interval={router_currentFormValue.interval ? router_currentFormValue.interval : 1}
                            image_location={image_location}
                            introduction={introduction}
                            tags={tags}
                            title={title}
                            video={video}
                        />
                    </TabPanel>
                    <TabPanel>
                        <PlayerReportList
                            commentsNick={comments_nick}
                            currentLudoId={ludoId}
                            currentUserId={currentUserId}
                            handleDenounceBoxOpen={handleDenounceBoxOpen}
                            handleImageLightboxOpen={handleImageLightboxOpen}
                            handleReportEditButtonTouchTap={handleReportEditButtonTouchTap}
                            handleReportExpandMoreButtonTouchTap={handleReportExpandMoreButtonTouchTap}
                            handleShouldReportUpdate={handleShouldReportUpdate}
                            isMyReport={player_id === currentUserId}
                            label="player"
                            reportList={reportList.player}
                            reportUserId={playerId}
                            userPhotoUrl={userPhotoUrl}
                        />
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}

MobileLudoPage.propTypes = {
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
    editingForm: PropTypes.object.isRequired,
    getUserBasicData: PropTypes.func.isRequired,
    handleDenounceBoxOpen: PropTypes.func.isRequired,
    handleImageLightboxOpen: PropTypes.func.isRequired,
    handleReportEditButtonTouchTap: PropTypes.func.isRequired,
    handleReportExpandMoreButtonTouchTap: PropTypes.func.isRequired,
    handleShouldReportUpdate: PropTypes.func.isRequired,
    ludoId: PropTypes.string,
    reportList: PropTypes.object,
    router_currentFormValue: PropTypes.object.isRequired,
    userPhotoUrl: PropTypes.string,
};

MobileLudoPage.defaultProps = {
    'router_currentFormValue': {
        'comments_nick': {
            'a': [0, 0],
            'b': [0, 0]
        },
        'player_id': '',
        'starter_id': 'b'
    }
};

export default MobileLudoPage;
