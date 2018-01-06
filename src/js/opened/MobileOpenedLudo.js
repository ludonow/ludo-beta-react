import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styled from 'styled-components';

import axios from '../axios-config';

import Avatar from '../components/Avatar';
import CardContent from '../components/CardContent';

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

const JoinButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 136px;
    height: 41px;
    background: #ff6060;
    background-size: cover;
    margin: 0 auto;
    border-top: none;
    border-right: none;
    border-left: none;
    border-radius: 50px;
    border-width: 2px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    cursor: pointer;
    color: white;

    &:disabled {
        cursor: not-allowed;
        background-color: rgb(240, 240, 240);
        border: none;
    }

    & > a {
        text-decoration: none;
        font-size: 20px;
        color: white;
    }
`;

const JoinButtonContainer = styled.div`
    position: fixed;
    bottom: 0;
    z-index: 2;
    width: 100%;
    text-align: center;
    padding: 0.8rem 0;
`;

const TextCenter = styled.div`
    text-align: center;
    color: white;
`;

export default class MobileOpenedLudo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowingDarkBackGround: true
        };
        this.handleCardContentTabClick = this.handleCardContentTabClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleJoinClick = this.handleJoinClick.bind(this);
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

    handleDeleteClick(event) {
        event.preventDefault();
        // const isSureToDelete = window.confirm('Are you sure to join?');
        const isSureToDelete = window.confirm('你確定要刪除這個Ludo嗎？');
        if (isSureToDelete) {
            axios.delete(`/apis/ludo/${this.props.params.ludo_id}`)
            .then(response => {
                if(response.data.status == '200') {
                    const { getUserBasicData, handleShouldProfileUpdate } = this.props;
                    getUserBasicData();
                    handleShouldProfileUpdate(true);
                    browserHistory.push('/playground');
                } else {
                    window.alert('刪除Ludo發生錯誤，請重試一次；若問題還是發生，請聯絡開發團隊');
                    console.error('OpenedStarterForm delete else response from server: ', response);
                    console.error('OpenedStarterForm delete else message from server: ', response.data.message);
                    this.setState({
                        isDeleteButtonClickable: true
                    });
                }
            })
            .catch(error => {
                window.alert('刪除Ludo發生錯誤，請重試一次；若問題還是發生，請聯絡開發團隊');
                console.error('OpenedStarterForm delete error', error);
                this.setState({
                    isDeleteButtonClickable: true
                });
            });
        } else {
            this.setState({
                isDeleteButtonClickable: true
            });
        }
    }

    handleJoinClick(event) {
        event.preventDefault();
        /* TODO: Use notification confirming join */
        // const isSureToJoin = window.confirm('Are you sure to join?');
        const isSureToJoin = window.confirm('你確定要加入此Ludo嗎？');
        if (isSureToJoin) {
            const { ludo_id } = this.props.params;
            const currentFormValue = this.props.router_currentFormValue;
            const joinLudoPutbody = {
                'duration': currentFormValue.duration,
                'marbles': currentFormValue.marbles,
                'stage': currentFormValue.stage,
                'type': 'match'
            };
            axios.put(`/apis/ludo/${ludo_id}`, joinLudoPutbody)
            .then(response => {
                if (response.data.status === '200') {
                    const { getUserBasicData, handleShouldProfileUpdate } = this.props;
                    getUserBasicData();
                    handleShouldProfileUpdate(true);
                    /* TODO: Figure out how to use same url redirect to other component */
                    browserHistory.push('/playground');
                    browserHistory.push(`/ludo/${ludo_id}`);
                } else if (response.data.status === '400' && response.data.message === 'Your Fuel is out.') {
                    window.alert('你的燃料用完囉！');
                } else {
                    window.alert('加入Ludo發生錯誤，請重試一次；若問題還是發生，請聯絡開發團隊');
                    console.error('MobileOpenedLudo join else response from server: ', response);
                    console.error('MobileOpenedLudo join else message from server: ', response.data.message);
                }
            })
            .catch(error => {
                window.alert('加入Ludo發生錯誤，請重試一次；若問題還是發生，請聯絡開發團隊');
                console.error('MobileOpenedLudo join put error', error);
            });
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
            starter,
            userBasicData
        } = this.props;
        const {
            comments_nick,
            introduction,
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
                            onClick={this.handleCardContentTabClick}
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
                        {
                            starter ?
                                <JoinButtonContainer>
                                    <JoinButton onClick={this.handleDeleteClick}>
                                        刪除戰局
                                    </JoinButton>
                                </JoinButtonContainer>
                            :
                                <JoinButtonContainer>
                                    <JoinButton onClick={this.handleJoinClick}>
                                        加入戰局
                                    </JoinButton>
                                </JoinButtonContainer>
                        }
                    </TabPanel>
                    <TabPanel>
                        <CardContent
                            introduction={introduction}
                            interval={router_currentFormValue.interval ? router_currentFormValue.interval : 1}
                            tags={tags}
                            title={title}
                        />
                        {
                            starter ?
                                <JoinButtonContainer>
                                    <JoinButton onClick={this.handleDeleteClick}>
                                        刪除戰局
                                    </JoinButton>
                                </JoinButtonContainer>
                            :
                                <JoinButtonContainer>
                                    <JoinButton onClick={this.handleJoinClick}>
                                        加入戰局
                                    </JoinButton>
                                </JoinButtonContainer>
                        }
                    </TabPanel>
                    <TabPanel>
                        <TextCenter>
                            尚未開始遊戲
                        </TextCenter>
                        {
                            starter ?
                                <JoinButtonContainer>
                                    <JoinButton onClick={this.handleDeleteClick}>
                                        刪除戰局
                                    </JoinButton>
                                </JoinButtonContainer>
                            :
                                <JoinButtonContainer>
                                    <JoinButton onClick={this.handleJoinClick}>
                                        加入戰局
                                    </JoinButton>
                                </JoinButtonContainer>
                        }
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}

MobileOpenedLudo.propTypes = {
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

MobileOpenedLudo.defaultProps = {
    'router_currentFormValue': {
        'comments_nick': {
            'a': [0, 0],
            'b': [0, 0]
        },
        'starter_id': 'b'
    }
};
