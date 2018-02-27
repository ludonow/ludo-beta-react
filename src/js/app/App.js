import React from 'react';
import MediaQuery from 'react-responsive';

import axios from '../axios-config';
import DenounceBox from './DenounceBox';
import DesktopNavbar from './Navbar/Desktop';
import Header from './Header';
import Main from './Main';
import MobileNavbar from './Navbar/Mobile';
import Sidebar from './sidebar/Sidebar';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

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
            filterCondition: '',
            hasGotNewReport: false,
            isDenounceBoxOpen: false,
            isInfiniteLoading: false,
            isLoggedIn: false,
            isNavbarVisible: false,
            isOpeningActivePage: false,
            isOpeningCreateFormPage: false,
            isOpeningLudoListPage: false,
            isOpeningProfilePage: false,
            lastEvaluatedKey: {},
            ludoList: [],
            shouldLudoListUpdate: false,
            shouldProfileUpdate: false,
            shouldReportUpdate: false,
            shouldUserBasicDataUpdate: false,
            profileWillLudoData: [],
            profileLudoingData: [],
            profileDidLudoData: [],
            userBasicData: {},
            userProfileData: {}
        };
        this.clearCurrentFormValue = this.clearCurrentFormValue.bind(this);
        this.getCurrentLudoData = this.getCurrentLudoData.bind(this);
        this.getFilteredLudoList = this.getFilteredLudoList.bind(this);
        this.getProfileData = this.getProfileData.bind(this);
        this.getProfileWillLudoData = this.getProfileWillLudoData.bind(this);
        this.getProfileLudoingData = this.getProfileLudoingData.bind(this);
        this.getProfileDidLudoData = this.getProfileDidLudoData.bind(this);
        this.getReportOfCurrentLudo = this.getReportOfCurrentLudo.bind(this);
        this.getUpComingLudoList = this.getUpComingLudoList.bind(this);
        this.getUserBasicData = this.getUserBasicData.bind(this);
        this.handleDenounceBoxRequestClose = this.handleDenounceBoxRequestClose.bind(this);
        this.handleDenounceBoxOpen = this.handleDenounceBoxOpen.bind(this);
        this.handleHasGotNewReport = this.handleHasGotNewReport.bind(this);
        this.handleIsOpeningActivePage = this.handleIsOpeningActivePage.bind(this);
        this.handleIsOpeningCreateFormPage = this.handleIsOpeningCreateFormPage.bind(this);
        this.handleIsOpeningLudoListPage = this.handleIsOpeningLudoListPage.bind(this);
        this.handleIsOpeningProfilePage = this.handleIsOpeningProfilePage.bind(this);
        this.handleNavbarClose = this.handleNavbarClose.bind(this);
        this.handleNavbarToggle = this.handleNavbarToggle.bind(this);
        this.handleScrollEvent = this.handleScrollEvent.bind(this);
        this.handleShouldLudoListUpdate = this.handleShouldLudoListUpdate.bind(this);
        this.handleShouldProfileUpdate = this.handleShouldProfileUpdate.bind(this);
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
        this.handleShouldProfileUpdate(true);
        this.getUserBasicData();
        window.addEventListener('scroll', this.handleScrollEvent);
    }

    componentDidUpdate() {
        const {
            currentUserId,
            isLoggedIn,
            isOpeningLudoListPage,
            isOpeningProfilePage,
            shouldLudoListUpdate,
            shouldProfileUpdate,
            shouldUserBasicDataUpdate
        } = this.state;

        if (currentUserId && isLoggedIn && shouldProfileUpdate) {
            /**
             * Update profile data after the user did some ludo action and is going to open profile page
             */
            if (isOpeningProfilePage) {
                this.getProfileData();
                this.getProfileWillLudoData(currentUserId);
                this.getProfileLudoingData(currentUserId);
                this.getProfileDidLudoData(currentUserId);
                this.handleShouldProfileUpdate(false);
            }
        }

        const { isOpeningActivePage, shouldReportUpdate } = this.state;
        if (isOpeningActivePage && shouldReportUpdate) {
            this.getReportOfCurrentLudo(this.props.params.ludo_id);
            this.handleShouldReportUpdate(false);
        }

        if (shouldUserBasicDataUpdate) {
            this.getUserBasicData();
            this.handleShouldUserBasicDataUpdate(false);
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
                    ludoList: response.data.ludoList.Items
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

    getProfileData() {
        axios.get('/apis/profile')
        .then((response) => {
            if (response.data.status === '200') {
                this.setState({
                    userProfileData: response.data.user
                });
            } else {
                console.error('app getProfileData else response from server: ', response);
                console.error('app getProfileData else message from server: ', response.data.message);
            }
        })
        .catch((error) => {
            console.error('app getProfileData error', error);
        });
    }

    getProfileWillLudoData(user_id) {
        axios.get(`apis/ludo?stage=1&user_id=${user_id}`)
        .then((response) => {
            if (response.data.status === '200') {
                this.setState({
                    profileWillLudoData: response.data.ludoList.Items
                });
            } else {
                console.error('app getProfileWillLudoData else response from server: ', response);
                console.error('app getProfileWillLudoData else message from server: ', response.data.message);
            }
        })
        .catch((error) => {
            console.error('app getProfileWillLudoData error', error);
        });
    }

    getProfileLudoingData(user_id) {
        axios.get(`apis/ludo?stage=2&user_id=${user_id}`)
        .then((response) => {
            if (response.data.status === '200') {
                this.setState({
                    profileLudoingData: response.data.ludoList.Items
                });
            } else {
                console.error('app getProfileLudoingData else response from server: ', response);
                console.error('app getProfileLudoingData else message from server: ', response.data.message);
            }
        })
        .catch((error) => {
            console.error('app getProfileLudoingData error', error);
        });
    }

    getProfileDidLudoData(user_id) {
        axios.get(`apis/ludo?stage=3&user_id=${user_id}`)
        .then((response) => {
            if (response.data.status === '200') {
                this.setState({
                    profileDidLudoData: response.data.ludoList.Items
                });
            } else {
                console.error('app getProfileDidLudoData else response from server: ', response);
                console.error('app getProfileDidLudoData else message from server: ', response.data.message);
            }
        })
        .catch((error) => {
            console.error('app getProfileDidLudoData error', error);
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
                this.setState({
                    userBasicData: response.data.user,
                    currentUserId: response.data.user.user_id,
                    isLoggedIn: true
                });
            } else {
                /* not login */
                // console.error('app getUserBasicData else response from server: ', response);
            }
        })
        .catch((error) => {
            console.error('user error', error);
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

    handleNavbarClose(event) {
        this.setState({
            isNavbarVisible: false
        });
    }

    handleNavbarToggle(boolean) {
        this.setState({
            isNavbarVisible: boolean
        });
    }

    handleIsOpeningActivePage(boolean) {
        this.setState({
            isOpeningActivePage: boolean
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

    handleIsOpeningProfilePage(boolean) {
        this.setState({
            isOpeningProfilePage: boolean
        });
    }

    handleScrollEvent(event) {
        const edgeOffsetY = 250;
        const { isInfiniteLoading, isOpeningLudoListPage, lastEvaluatedKey, ludoList } = this.state;
        const lastEvaluatedKeyString = JSON.stringify(lastEvaluatedKey);
        if (isOpeningLudoListPage &&
            !isInfiniteLoading &&
            lastEvaluatedKeyString &&
            ludoList.length >= 25 &&
            document.body.scrollTop + edgeOffsetY >= document.body.scrollHeight - window.innerHeight) {
            this.setState({
                isInfiniteLoading: true
            });
            this.getUpComingLudoList(this.props.location.search, lastEvaluatedKeyString);
        }
    }

    handleShouldLudoListUpdate(boolean) {
        this.setState({
            shouldLudoListUpdate: boolean
        });
    }

    handleShouldProfileUpdate(boolean) {
        this.setState({
            shouldProfileUpdate: boolean
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
        const { isNavbarVisible } = this.state;
        const {
            route,
            router_currentFormValue
        } = this.props;

        const { path } = route;

        return (
            <div>
                <Header
                    getFilteredLudoList={this.getFilteredLudoList}
                    handleNavbarToggle={this.handleNavbarToggle}
                    isLoggedIn={this.state.isLoggedIn}
                    isOpeningCreateFormPage={this.state.isOpeningCreateFormPage}
                    isOpeningLudoListPage={this.state.isOpeningLudoListPage}
                    isOpeningProfilePage={this.state.isOpeningProfilePage}
                    isNavbarVisible={isNavbarVisible}
                    userBasicData={this.state.userBasicData}
                />
                <MediaQuery minWidth={768}>
                    <DesktopNavbar
                        getFilteredLudoList={this.getFilteredLudoList}
                        handleNavbarClose={this.handleNavbarClose}
                        handleNavbarToggle={this.handleNavbarToggle}
                        isNavbarVisible={isNavbarVisible}
                    />
                </MediaQuery>
                <MediaQuery maxWidth={768}>
                    <MobileNavbar
                        handleNavbarClose={this.handleNavbarClose}
                        handleNavbarToggle={this.handleNavbarToggle}
                        isNavbarVisible={isNavbarVisible}
                    />
                </MediaQuery>
                <Main handleScrollEvent={this.handleScrollEvent}>
                    {
                        React.cloneElement(this.props.children,
                            {
                                ...this.state,
                                router_currentFormValue,
                                clearCurrentFormValue: this.clearCurrentFormValue,
                                getCurrentLudoData: this.getCurrentLudoData,
                                getFilteredLudoList: this.getFilteredLudoList,
                                getProfileData: this.getProfileData,
                                getProfileWillLudoData: this.getProfileWillLudoData,
                                getProfileLudoingData: this.getProfileLudoingData,
                                getProfileDidLudoData: this.getProfileDidLudoData,
                                getReportOfCurrentLudo: this.getReportOfCurrentLudo,
                                getUserBasicData: this.getUserBasicData,
                                handleDenounceBoxOpen: this.handleDenounceBoxOpen,
                                handleHasGotNewReport: this.handleHasGotNewReport,
                                handleNavbarToggle: this.handleNavbarToggle,
                                handleIsOpeningActivePage: this.handleIsOpeningActivePage,
                                handleIsOpeningCreateFormPage: this.handleIsOpeningCreateFormPage,
                                handleIsOpeningLudoListPage: this.handleIsOpeningLudoListPage,
                                handleIsOpeningProfilePage: this.handleIsOpeningProfilePage,
                                handleShouldLudoListUpdate: this.handleShouldLudoListUpdate,
                                handleShouldProfileUpdate: this.handleShouldProfileUpdate,
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
