import React from 'react';
import { browserHistory } from 'react-router';
import MediaQuery from 'react-responsive';

import axios from '../axios-config';
import DenounceBox from './DenounceBox';
import DesktopNavbar from './Navbar/Desktop';
import Header from './Header';
import Main from './Main';
import MobileNavbar from './Navbar/Mobile';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const desktopNavbarUrlList = [
    'cardList',
    'cardList?stage=0',
    'create',
    'myCardList?stage=1',
    'myCardList?stage=2',
    'myCardList?stage=3',
    'myCardList?stage=0',
    'tutorial',
];

const mobileNavbarUrlList = [
    'cardList',
    'cardList?stage=0',
    'create',
    'myCardList',
    'logout',
    'tutorial',
];

const getSelectedIndex = (subDomain, navbarUrlList) => {
    let selectedIndex = navbarUrlList.findIndex((navbarUrl) => (subDomain === navbarUrl));
    if (selectedIndex === -1) {
        selectedIndex = navbarUrlList.findIndex((navbarUrl) => (subDomain.includes(navbarUrl)));
        return selectedIndex;
    } else {
        return selectedIndex;
    }
};

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentAuth: null,
            currentLudoId: '',
            currentLudoReportData: [],
            currentTargetCommentId: '',
            currentTargetLudoId: '',
            currentTargetReportId: '',
            currentUserId: '',
            denounceType: 100,
            email: '',
            hasGotNewReport: false,
            isCardListFetched: false,
            isDenounceBoxOpen: false,
            isInfiniteLoading: false,
            isLoadingCardList: false,
            isNavbarVisible: false,
            isOpeningReportPage: false,
            isOpeningCreateFormPage: false,
            isOpeningLudoListPage: false,
            isPersonalCardListVisible: false,
            lastEvaluatedKey: {},
            ludoList: [],
            navbarSelectedIndex: 0,
            shouldLudoListUpdate: false,
            shouldReportUpdate: false,
            shouldUserBasicDataUpdate: false,
            userBasicData: {},
        };
        this.clearCurrentFormValue = this.clearCurrentFormValue.bind(this);
        this.getCurrentLudoData = this.getCurrentLudoData.bind(this);
        this.getFilteredLudoList = this.getFilteredLudoList.bind(this);
        this.getNavbarSelectedIndex = this.getNavbarSelectedIndex.bind(this);
        this.getReportOfCurrentLudo = this.getReportOfCurrentLudo.bind(this);
        this.getUpComingLudoList = this.getUpComingLudoList.bind(this);
        this.getUserBasicData = this.getUserBasicData.bind(this);
        this.handleDenounceBoxRequestClose = this.handleDenounceBoxRequestClose.bind(this);
        this.handleDenounceBoxOpen = this.handleDenounceBoxOpen.bind(this);
        this.handleHasGotNewReport = this.handleHasGotNewReport.bind(this);
        this.handleIsOpeningCreateFormPage = this.handleIsOpeningCreateFormPage.bind(this);
        this.handleIsOpeningLudoListPage = this.handleIsOpeningLudoListPage.bind(this);
        this.handleIsOpeningReportPage = this.handleIsOpeningReportPage.bind(this);
        this.handleNavbarClose = this.handleNavbarClose.bind(this);
        this.handleNavbarToggle = this.handleNavbarToggle.bind(this);
        this.handlePersonalCardListClose = this.handlePersonalCardListClose.bind(this);
        this.handlePersonalCardListToggle = this.handlePersonalCardListToggle.bind(this);
        this.handleScrollEvent = this.handleScrollEvent.bind(this);
        this.handleShouldLudoListUpdate = this.handleShouldLudoListUpdate.bind(this);
        this.handleShouldReportUpdate = this.handleShouldReportUpdate.bind(this);
        this.handleShouldUserBasicDataUpdate = this.handleShouldUserBasicDataUpdate.bind(this);
        this.updateCurrentFormValue = this.updateCurrentFormValue.bind(this);
    }

    clearCurrentFormValue() {
        this.setState({
            currentAuth: null,
            currentFormValue: {
                category_id: 0,
                checkpoint: [],
                duration: 0,
                introduction: '',
                marbles: 0,
                tags: [],
                title: ''
            }
        });
    }

    componentDidMount() {
        this.getUserBasicData();
        window.addEventListener('scroll', this.handleScrollEvent);
        const { location } = this.props;
        this.getNavbarSelectedIndex(location);
    }

    componentDidUpdate() {
        const {
            currentUserId,
            isOpeningLudoListPage,
            shouldLudoListUpdate,
            shouldUserBasicDataUpdate
        } = this.state;

        const { isOpeningReportPage, shouldReportUpdate } = this.state;
        if (isOpeningReportPage && shouldReportUpdate) {
            this.getReportOfCurrentLudo(this.props.params.ludo_id);
            this.handleShouldReportUpdate(false);
        }

        if (shouldUserBasicDataUpdate) {
            this.getUserBasicData();
            this.handleShouldUserBasicDataUpdate(false);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location !== nextProps.location) {
            this.getNavbarSelectedIndex(nextProps.location);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScrollEvent);
    }

    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }

    getCurrentLudoData(ludo_id) {
        axios.get(`/apis/ludo/${ludo_id}`)
        .then((response) => {
            if (response.data.status === '200') {
                this.setState({
                    currentAuth: response.data.auth,
                    currentFormValue: response.data.ludo,
                    currentLudoId: ludo_id
                });
            } else {
                console.error('app getCurrentLudoData else response from server: ', response);
                console.error('app getCurrentLudoData else message from server: ', response.data.message);
            }
        })
        .catch((error) => {
            console.error('app getCurrentLudoData error', error);
        });
    }

    getFilteredLudoList(filterCondition) {
        this.setState({
            isLoadingCardList: true,
        });
        let api = '';
        if (filterCondition) {
            api = `/apis/ludo?${filterCondition}`;
        } else {
            api = '/apis/ludo';
        }
        axios.get(api)
        .then((response) => {
            if (response.data.status === '200') {
                this.setState({
                    isCardListFetched: true,
                    isLoadingCardList: false,
                    ludoList: response.data.ludoList.Items,
                });
                if (response.data.ludoList.LastEvaluatedKey) {
                    this.setState({
                        lastEvaluatedKey: response.data.ludoList.LastEvaluatedKey
                    });
                    const lastEvaluatedKeyString = JSON.stringify(response.data.ludoList.LastEvaluatedKey);
                    this.getUpComingLudoList(filterCondition, lastEvaluatedKeyString);
                }
            } else {
                if (window.confirm('取得卡片列表資訊時伺服器未回傳正確資訊，請點擊「確定」回報此問題給開發團隊')) {
                    window.open("https://www.facebook.com/messages/t/ludonow");
                }
            }
        })
        .catch((error) => {
            if (window.confirm('取得卡片列表資訊時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                window.open("https://www.facebook.com/messages/t/ludonow");
            }
        });
    }

    getNavbarSelectedIndex(location) {
        let navbarUrlList = [];
        const width = window.innerWidth || document.body.clientWidth;
        if (width >= 768) {
            navbarUrlList = desktopNavbarUrlList;
        } else {
            navbarUrlList = mobileNavbarUrlList;
        }
        this.setState({
            navbarSelectedIndex: getSelectedIndex(location.pathname.substring(1) + location.search, navbarUrlList)
        });
    }

    getReportOfCurrentLudo(ludo_id) {
        axios.get(`/apis/report?ludo_id=${ludo_id}`)
        .then((response) => {
            if (response.data.status === '200') {
                this.setState({
                    currentLudoReportData: response.data.reportList,
                    hasGotNewReport: true
                });
            } else {
                console.error('app getReportOfCurrentLudo else response from server: ', response);
                console.error('app getReportOfCurrentLudo else message from server: ', response.data.message);
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }

    getUpComingLudoList(filterCondition, lastEvaluatedKeyString) {
        axios.get(`/apis/ludo?${filterCondition}&startkey=${lastEvaluatedKeyString}`)
        .then((response) => {
            if (response.data.status === '200') {
                const newLudoList = [];
                newLudoList.push.apply(newLudoList, this.state.ludoList);
                newLudoList.push.apply(newLudoList, response.data.ludoList.Items);
                this.setState({
                    isInfiniteLoading: false,
                    lastEvaluatedKey: response.data.ludoList.LastEvaluatedKey,
                    ludoList: newLudoList
                });
            } else {
                this.setState({
                    isInfiniteLoading: false
                });
                if (window.confirm('取得其他卡片列表資訊時伺服器未回傳正確資訊，請點擊「確定」回報此問題給開發團隊')) {
                    window.open("https://www.facebook.com/messages/t/ludonow");
                }
            }
        })
        .catch((error) => {
            this.setState({
                isInfiniteLoading: false
            });
            if (window.confirm('取得其他卡片列表資訊時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                window.open("https://www.facebook.com/messages/t/ludonow");
            }
        });
    }

    getUserBasicData() {
        axios.get('/apis/user')
        .then((response) => {
            if (response.data.status === '200') {
                const { user } = response.data;
                const {
                    email,
                    user_id,
                } = user;
                this.setState({
                    currentUserId: user_id,
                    email,
                    userBasicData: user,
                });
            }
        })
        .catch((error) => {
            if (window.confirm('取得使用者資訊時發生錯誤，請點擊「確定」回報此問題給開發團隊')) {
                window.open("https://www.facebook.com/messages/t/ludonow");
            }
        });
    }

    handleDenounceBoxRequestClose() {
        this.setState({
            isDenounceBoxOpen: false
        });
    }

    handleDenounceBoxOpen(currentTargetObject) {
        const { currentTargetCommentId, currentTargetLudoId, currentTargetReportId } = currentTargetObject;
        if (currentTargetLudoId) {
            this.setState({
                currentTargetLudoId,
                denounceType: 0,
                isDenounceBoxOpen: true
            });
        } else if (currentTargetReportId && !currentTargetCommentId) {
            this.setState({
                currentTargetReportId,
                denounceType: 1,
                isDenounceBoxOpen: true
            });
        } else if (currentTargetReportId && currentTargetCommentId) {
            this.setState({
                currentTargetCommentId,
                currentTargetReportId,
                denounceType: 2,
                isDenounceBoxOpen: true
            });
        } else {
            console.error('handleDenounceBoxOpen id error');
        }
    }

    handleDenounceComment(event) {
        this.setState({
            currentTargetCommentId
        });
    }

    handleDenounceLudo(event) {
        this.setState({
            currentTargetLudoId
        });
    }

    handleDenounceReport(event) {
        this.setState({
            currentTargetReportId
        });
    }

    handleHasGotNewReport(boolean) {
        this.setState({
            hasGotNewReport: boolean
        });
    }

    handleIsOpeningReportPage(boolean) {
        this.setState({
            isOpeningReportPage: boolean
        });
    }

    handleIsOpeningCreateFormPage(boolean) {
        this.setState({
            isOpeningCreateFormPage: boolean
        });
    }

    handleIsOpeningLudoListPage(boolean) {
        this.setState({
            isOpeningLudoListPage: boolean
        });
    }

    handleNavbarClose() {
        this.setState({
            isNavbarVisible: false
        });
    }

    handleNavbarToggle(boolean) {
        this.setState({
            isNavbarVisible: boolean
        });
    }

    handlePersonalCardListClose() {
        this.setState({
            isPersonalCardListVisible: false
        });
    }

    handlePersonalCardListToggle(boolean) {
        this.setState({
            isPersonalCardListVisible: boolean
        });
    }

    handleScrollEvent(event) {
        const edgeOffsetY = 250;
        const {
            isInfiniteLoading,
            isOpeningLudoListPage,
            lastEvaluatedKey,
            ludoList,
        } = this.state;
        
        const lastEvaluatedKeyString = JSON.stringify(lastEvaluatedKey);
        /* ref: http://blog.xuite.net/vexed/tech/27786189-document.body.scrollTop+%E6%B0%B8%E9%81%A0%E6%98%AF+0 */
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight || 0;
        if (
            isOpeningLudoListPage &&
            !isInfiniteLoading &&
            lastEvaluatedKeyString &&
            scrollTop + edgeOffsetY >= scrollHeight - window.innerHeight
        ) {
            this.setState({
                isInfiniteLoading: true
            });
            const filterCondition = this.props.location.search.replace('?', '');
            this.getUpComingLudoList(filterCondition, lastEvaluatedKeyString);
        }
    }

    handleShouldLudoListUpdate(boolean) {
        this.setState({
            shouldLudoListUpdate: boolean
        });
    }

    handleShouldReportUpdate(boolean) {
        this.setState({
            shouldReportUpdate: boolean
        });
    }

    handleShouldUserBasicDataUpdate(boolean) {
        this.setState({
            shouldUserBasicDataUpdate: boolean
        });
    }

    updateCurrentFormValue(ludoForm) {
        this.setState({
            currentFormValue: ludoForm
        });
    }

    render() {
        const {
            currentUserId,
            isCardListFetched,
            isNavbarVisible,
            isOpeningCreateFormPage,
            isOpeningLudoListPage,
            isPersonalCardListVisible,
            navbarSelectedIndex,
            userBasicData,
        } = this.state;
        const {
            location,
            params,
            route,
            router_currentFormValue,
        } = this.props;

        const { path } = route;

        return (
            <div>
                <Header
                    getFilteredLudoList={this.getFilteredLudoList}
                    handleNavbarToggle={this.handleNavbarToggle}
                    handlePersonalCardListToggle={this.handlePersonalCardListToggle}
                    isNavbarVisible={isNavbarVisible}
                    isOpeningLudoListPage={isOpeningLudoListPage}
                    isPersonalCardListVisible={isPersonalCardListVisible}
                    userBasicData={userBasicData}
                />
                <MediaQuery minWidth={769}>
                    <DesktopNavbar
                        chatFuelId={userBasicData.chatfuel_id ? userBasicData.chatfuel_id : ''}
                        currentUserId={currentUserId}
                        handleNavbarClose={this.handleNavbarClose}
                        handleNavbarToggle={this.handleNavbarToggle}
                        isNavbarVisible={isNavbarVisible}
                        selectedIndex={navbarSelectedIndex}
                    />
                </MediaQuery>
                <MediaQuery maxWidth={768}>
                    <MobileNavbar
                        chatFuelId={userBasicData.chatfuel_id ? userBasicData.chatfuel_id : ''}
                        currentUserId={currentUserId}
                        handleNavbarClose={this.handleNavbarClose}
                        handleNavbarToggle={this.handleNavbarToggle}
                        isNavbarVisible={isNavbarVisible}
                        selectedIndex={navbarSelectedIndex}
                        userPhotoUrl={userBasicData.photo ? userBasicData.photo : ''}
                    />
                </MediaQuery>
                <Main handleScrollEvent={this.handleScrollEvent}>
                    {
                        React.cloneElement(this.props.children,
                            {
                                ...this.state,
                                currentTab: params.currentTab ? params.currentTab : '',
                                search: location.search,
                                router_currentFormValue,
                                clearCurrentFormValue: this.clearCurrentFormValue,
                                getCurrentLudoData: this.getCurrentLudoData,
                                getFilteredLudoList: this.getFilteredLudoList,
                                getReportOfCurrentLudo: this.getReportOfCurrentLudo,
                                getUserBasicData: this.getUserBasicData,
                                handleDenounceBoxOpen: this.handleDenounceBoxOpen,
                                handleHasGotNewReport: this.handleHasGotNewReport,
                                handleIsOpeningCreateFormPage: this.handleIsOpeningCreateFormPage,
                                handleIsOpeningLudoListPage: this.handleIsOpeningLudoListPage,
                                handleIsOpeningReportPage: this.handleIsOpeningReportPage,
                                handlePersonalCardListClose: this.handlePersonalCardListClose,
                                handleShouldLudoListUpdate: this.handleShouldLudoListUpdate,
                                handleShouldReportUpdate: this.handleShouldReportUpdate,
                                handleShouldUserBasicDataUpdate: this.handleShouldUserBasicDataUpdate,
                                updateCurrentFormValue: this.updateCurrentFormValue
                            }
                        )
                    }
                </Main>
                <DenounceBox
                    currentTargetCommentId={this.state.currentTargetCommentId}
                    currentTargetLudoId={this.state.currentTargetLudoId}
                    currentTargetReportId={this.state.currentTargetReportId}
                    denounceType={this.state.denounceType}
                    isDenounceBoxOpen={this.state.isDenounceBoxOpen}
                    onRequestClose={this.handleDenounceBoxRequestClose}
                />
            </div>
        );
    }
}

App.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};
