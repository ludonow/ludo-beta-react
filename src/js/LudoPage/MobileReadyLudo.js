import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styled from 'styled-components';

import axios from '../axios-config';
import Avatar from '../components/Avatar';
import MobileCardContent from '../components/MobileCardContent';

const CardContentTab = styled.div`
    align-items: center;
    display: flex;
    font-size: 0.8rem;
    height: 100%;
    justify-content: center;
`;

const DarkBackGround = styled.div`
    background: rgba(0, 0, 0, .3);
    height: 100vh;
    position: fixed;
    visibility: ${props => props.display ? 'visible' : 'hidden'};
    width: 100vw;
    z-index: -1;
`;

const StyledSubmitButton = styled.button`
    align-items: center;
    background: #ff6060;
    background-size: cover;
    border-left: none;
    border-right: none;
    border-radius: 50px;
    border-top: none;
    border-width: 2px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    color: white;
    cursor: pointer;
    display: flex;
    font-family: "Exo", "Microsoft JhengHei";
    font-size: 20px;
    height: 41px;
    justify-content: center;
    margin: 0 auto;
    width: 136px;

    &:disabled {
        background-color: rgb(240, 240, 240);
        border: none;
        cursor: not-allowed;
    }

    & > a {
        color: white;
        font-size: 20px;
        text-decoration: none;
    }
`;

const SubmitButtonWrapper = styled.div`
    bottom: 0;
    padding: 0.8rem 0;
    position: fixed;
    text-align: center;
    width: 100%;
    z-index: 2;
`;

const TextCenter = styled.div`
    color: white;
    text-align: center;
`;

// child components
const SubmitButton = ({
    handleDeleteClick,
    handleJoinClick,
    isCurrentUserLudoCreator,
    isDeleteButtonDisabled,
    isJoinButtonDisabled
}) => (
    <SubmitButtonWrapper>
        {
            isCurrentUserLudoCreator ?
                <StyledSubmitButton
                    disabled={isDeleteButtonDisabled}
                    onClick={handleDeleteClick}
                >
                    刪除戰局
                </StyledSubmitButton>
            :
                <StyledSubmitButton
                    disabled={isJoinButtonDisabled}
                    onClick={handleJoinClick}
                >
                    加入戰局
                </StyledSubmitButton>
        }
    </SubmitButtonWrapper>
);

class MobileReadyLudo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDeleteButtonDisabled: false,
            isJoinButtonDisabled: false,
            isShowingDarkBackGround: true
        };
        this.handleCardContentTabClick = this.handleCardContentTabClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleJoinClick = this.handleJoinClick.bind(this);
        this.handlePlayerTabClick = this.handlePlayerTabClick.bind(this);
    }

    componentWillMount() {
        this.props.handleShouldReportUpdate(true);
    }

    handleCardContentTabClick() {
        this.setState({
            isShowingDarkBackGround: true
        });
    }

    handleDeleteClick(event) {
        event.preventDefault();
        const isSureToDelete = window.confirm('你確定要刪除這個Ludo嗎？');
        if (isSureToDelete) {
            this.setState({
                isDeleteButtonDisabled: true
            });
            axios.delete(`/apis/ludo/${this.props.params.ludo_id}`)
            .then(response => {
                if (response.data.status == '200') {
                    const { getUserBasicData, handleShouldProfileUpdate } = this.props;
                    getUserBasicData();
                    handleShouldProfileUpdate(true);
                    browserHistory.push('/cardList');
                } else {
                    if (window.confirm('刪除Ludo卡片時伺服器未回傳正確資訊，請點擊「確定」回報此問題給開發團隊')) {
                        window.open("https://www.facebook.com/messages/t/ludonow");
                    }
                    this.setState({
                        isDeleteButtonDisabled: false
                    });
                }
            })
            .catch(error => {
                if (window.confirm('刪除Ludo卡片時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                    window.open("https://www.facebook.com/messages/t/ludonow");
                }
                this.setState({
                    isDeleteButtonDisabled: false
                });
            });
        } else {
            this.setState({
                isDeleteButtonDisabled: false
            });
        }
    }

    handleJoinClick(event) {
        event.preventDefault();
        if (!this.props.currentUserId) {
            if (window.confirm('登入後即可加入此卡片！點選「確定」後進入登入頁面。')) {
                browserHistory.push('/login');
            }
        } else {
            /* TODO: Use notification confirming join */
            const isSureToJoin = window.confirm('你確定要加入此Ludo卡片嗎？');
            if (isSureToJoin) {
                this.setState({
                    isJoinButtonDisabled: true
                });
                const { ludo_id } = this.props.params;
                const currentFormValue = this.props.router_currentFormValue;
                const joinLudoPutbody = {
                    'duration': currentFormValue.duration,
                    'marbles': currentFormValue.marbles,
                    'stage': currentFormValue.stage,
                    'type': 'match'
                };
                browserHistory.push({
                    pathname:`/loading/${ludo_id}`,
                    state: joinLudoPutbody,
                });
            }
        }
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
            userBasicData,
        } = this.props;

        const {
            comments_nick,
            image_location,
            introduction,
            starter_id,
            tags,
            title,
            video,
        } = router_currentFormValue;

        const {
            isDeleteButtonDisabled,
            isJoinButtonDisabled,
            isShowingDarkBackGround,
        } = this.state;

        const isCurrentUserLudoCreator = currentUserId === starter_id ? true : false;

        return (
            <div>
                <DarkBackGround display={isShowingDarkBackGround} />
                <Tabs defaultIndex={1}>
                    <TabList className="react-tabs__tab-list mobile-avatar">
                        <Tab 
                            className="react-tabs__tab mobile-avatar"
                            onClick={this.handleCardContentTabClick}
                            selectedClassName="react-tabs__tab--selected mobile-avatar"
                        >
                            <Avatar
                                avatarBackgroundColorIndex={comments_nick[starter_id][1]}
                                avatarImageIndex={comments_nick[starter_id][0]}
                                isThisBelongToCurrentUser={isCurrentUserLudoCreator}
                                userPhotoUrl={userBasicData.photo}
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
                            onClick={this.handleCardContentTabClick}
                            selectedClassName="react-tabs__tab--selected mobile-avatar"
                        >
                            <CardContentTab>
                                尚無對手
                            </CardContentTab>
                        </Tab>
                    </TabList>

                    <TabPanel>
                        <TextCenter>
                            尚未開始遊戲
                        </TextCenter>
                        <SubmitButton
                            handleDeleteClick={this.handleDeleteClick}
                            handleJoinClick={this.handleJoinClick}
                            isDeleteButtonDisabled={isDeleteButtonDisabled}
                            isJoinButtonDisabled={isJoinButtonDisabled}
                            isCurrentUserLudoCreator={isCurrentUserLudoCreator}
                        />
                    </TabPanel>
                    <TabPanel>
                        <MobileCardContent
                            image_location={image_location}
                            introduction={introduction}
                            interval={router_currentFormValue.interval ? Number(router_currentFormValue.interval) : 1}
                            tags={tags}
                            title={title}
                            video={video}
                        />
                        <SubmitButton
                            handleDeleteClick={this.handleDeleteClick}
                            handleJoinClick={this.handleJoinClick}
                            isDeleteButtonDisabled={isDeleteButtonDisabled}
                            isJoinButtonDisabled={isJoinButtonDisabled}
                            isCurrentUserLudoCreator={isCurrentUserLudoCreator}
                        />
                    </TabPanel>
                    <TabPanel>
                        <TextCenter>
                            尚未開始遊戲
                        </TextCenter>
                        <SubmitButton
                            handleDeleteClick={this.handleDeleteClick}
                            handleJoinClick={this.handleJoinClick}
                            isDeleteButtonDisabled={isDeleteButtonDisabled}
                            isJoinButtonDisabled={isJoinButtonDisabled}
                            isCurrentUserLudoCreator={isCurrentUserLudoCreator}
                        />
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}

MobileReadyLudo.propTypes = {
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
    handleShouldReportUpdate: PropTypes.func.isRequired,
    params: PropTypes.shape({
        ludo_id: PropTypes.string
    }).isRequired,
    router_currentFormValue: PropTypes.object.isRequired,
    userBasicData: PropTypes.object.isRequired
};

MobileReadyLudo.defaultProps = {
    'router_currentFormValue': {
        'comments_nick': {
            'a': [0, 0],
            'b': [0, 0]
        },
        'starter_id': 'b'
    }
};

export default MobileReadyLudo;
