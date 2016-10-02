import React from 'react';
import axios from '../axios-config';

import Header from './header/Header';
import Search from './search/Search';
import Sidebar from './sidebar/Sidebar';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentFormValue: {
                category_id: 0,
                checkpoint: [3],
                duration: 3,
                introduction: '',
                marbles: 1,
                tags: '',
                title: ''
            },
            currentAuth: null,
            currentLudoId: '',
            currentLudoReportData: [],
            currentUserId: '',
            hasGotNewReport: false,
            isHoveringSidebar: false,
            isLoggedIn: false,
            isOpeningActivePage: false,
            isOpeningLudoListPage: false,
            isOpeningProfilePage: false,
            shouldLudoListUpdate: false,
            shouldProfileUpdate: false,
            shouldReportUpdate: false,
            ludoList: [],
            profileWillLudoData: [],
            profileLudoingData: [],
            profileDidLudoData: [],
            userBasicData: {},
            userProfileData: {}
        };
        this.clearCurrentFormValue = this.clearCurrentFormValue.bind(this);
        this.getBasicUserData = this.getBasicUserData.bind(this);
        this.getCurrentLudoData = this.getCurrentLudoData.bind(this);
        this.getLatestLudoList = this.getLatestLudoList.bind(this);
        this.getProfileData = this.getProfileData.bind(this);
        this.getProfileWillLudoData = this.getProfileWillLudoData.bind(this);
        this.getProfileLudoingData = this.getProfileLudoingData.bind(this);
        this.getProfileDidLudoData = this.getProfileDidLudoData.bind(this);
        this.getReportOfCurrentLudo = this.getReportOfCurrentLudo.bind(this);
        this.handleHasGotNewReport = this.handleHasGotNewReport.bind(this);
        this.handleIsHoveringSidebar = this.handleIsHoveringSidebar.bind(this);
        this.handleIsOpeningActivePage = this.handleIsOpeningActivePage.bind(this);
        this.handleIsOpeningLudoListPage = this.handleIsOpeningLudoListPage.bind(this);
        this.handleIsOpeningProfilePage = this.handleIsOpeningProfilePage.bind(this);
        this.handleShouldLudoListUpdate = this.handleShouldLudoListUpdate.bind(this);
        this.handleShouldProfileUpdate = this.handleShouldProfileUpdate.bind(this);
        this.handleShouldReportUpdate = this.handleShouldReportUpdate.bind(this);
        this.updateCurrentFormValue = this.updateCurrentFormValue.bind(this);
    }

    componentDidMount() {
        // console.log('app componentDidMount handleShouldProfileUpdate');  // debug
        this.handleShouldProfileUpdate(true);
        // console.log('app componentDidMount getBasicUserData');  // debug
        this.getBasicUserData();
    }

    componentDidUpdate() {
        // console.log('app componentDidUpdate state', this.state);  // debug
        const { currentUserId, isLoggedIn, isOpeningLudoListPage, isOpeningProfilePage, 
            shouldLudoListUpdate, shouldProfileUpdate } = this.state;
            // console.log('app componentDidUpdate shouldProfileUpdate true');  // debug
        if (isOpeningLudoListPage && shouldLudoListUpdate) {
            // console.log('app componentDidUpdate getLatestLudoList');  // debug
            this.getLatestLudoList();
            this.handleShouldLudoListUpdate(false);
        }
        if (currentUserId && isLoggedIn && shouldProfileUpdate) {
            /* 
             * Update profile data after the user did some ludo action and is going to open profile page 
             */
            if (isOpeningProfilePage) {
                // console.log('app componentDidUpdate update profile');   // debug
                this.getProfileData();
                this.getProfileWillLudoData(currentUserId);
                this.getProfileLudoingData(currentUserId);
                this.getProfileDidLudoData(currentUserId);
                this.handleShouldProfileUpdate(false);
            }
        }

        const { isOpeningActivePage, shouldReportUpdate } = this.state;
        if (isOpeningActivePage && shouldReportUpdate) {
            // console.log('app componentDidUpdate getReportOfCurrentLudo');   // debug
            this.getReportOfCurrentLudo(this.props.params.ludo_id);
            this.handleShouldReportUpdate(false);
        }
    }

    clearCurrentFormValue() {
        // console.log('app clearCurrentFormValue');   // debug
        // console.log('-------------------------');   // debug
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

    getBasicUserData() {
        // console.log('app before getBasicUserData');  // debug
        axios.get('/apis/user')
        .then(response => {
            if(response.data.status === '200') {
                this.setState({
                    userBasicData: response.data.user,
                    currentUserId: response.data.user.user_id,
                    isLoggedIn: true
                });
            } else {
                console.log('app getBasicUserData else message from server: ', response.data.message);
            }
        })
        .catch(error => {
            console.log('user error', error);
        });
    }

    getCurrentLudoData(ludo_id) {
        console.log('app before getCurrentLudoData');  // debug
        axios.get(`/apis/ludo/${ludo_id}`)
        .then(response => {
            if(response.data.status === '200') {
                // console.log('app getCurrentLudoData -- response: ', response);  // debug
                this.setState({
                    currentAuth: response.data.auth,
                    currentFormValue: response.data.ludo,
                    currentLudoId: ludo_id
                });
            } else {
                // console.log('app getCurrentLudoData else response from server: ', response);
                console.log('app getCurrentLudoData else message from server: ', response.data.message);
                console.log('app getCurrentLudoData else error from server: ', response.data.err);
            }
        })
        .catch(error => {
            console.log('app getCurrentLudoData error', error);
        });
    }

    getLatestLudoList() {
        // console.log('app getLatestLudoList before get');  // debug
        axios.get('/apis/ludo')
        .then(response => {
            if(response.data.status === '200') {
                this.setState({
                    ludoList: response.data.ludoList.Items
                });
            } else {
                console.log('app getLatestLudoList else message from server: ', response.data.message);
                console.log('app getLatestLudoList else error from server: ', response.data.err);
            }
        })
        .catch(error => {
            console.log('app getLatestLudoList error', error);
        });
    }

    getProfileData() {
        // console.log('app before getProfileData');  // debug
        axios.get('/apis/profile')
        .then(response => {
            if(response.data.status === '200') {
                this.setState({
                    userProfileData: response.data.user
                });
            } else {
                console.log('app getProfileData else message from server: ', response.data.message);
            }
        })
        .catch(error => {
            console.log('app getProfileData error', error);
        });
    }

    getProfileWillLudoData(user_id) {
        // console.log('app before getProfileWillLudoData');
        axios.get(`apis/ludo?stage=1&user_id=${user_id}`)
        .then(response => {
            if(response.data.status === '200') {
                this.setState({
                    profileWillLudoData: response.data.ludoList.Items
                });
                // console.log('app after getProfileWillLudoData', response.data.ludoList.Items);  // debug
            } else {
                console.log('app getProfileWillLudoData else message from server: ', response.data.message);
            }
        })
        .catch(error => {
            console.log('app getProfileWillLudoData error', error);
        });
    }

    getProfileLudoingData(user_id) {
        // console.log('app before getProfileLudoingData');  // debug
        axios.get(`apis/ludo?stage=2&user_id=${user_id}`)
        .then(response => {
            if(response.data.status === '200') {
                this.setState({
                    profileLudoingData: response.data.ludoList.Items
                });
                // console.log('app after profileLudoingData', response.data.ludoList.Items);  // debug
            } else {
                console.log('app getProfileLudoingData else message from server: ', response.data.message);
            }
        })
        .catch(error => {
            console.log('app getProfileLudoingData error', error);
        });
    }

    getProfileDidLudoData(user_id) {
        // console.log('app before getProfileDidLudoData');  // debug
        axios.get(`apis/ludo?stage=3&user_id=${user_id}`)
        .then(response => {
            if(response.data.status === '200') {
                this.setState({
                    profileDidLudoData: response.data.ludoList.Items
                });
            } else {
                console.log('app getProfileDidLudoData else message from server: ', response.data.message);
                console.log('app getProfileDidLudoData else error from server: ', response.data.err);
            }
        })
        .catch(error => {
            console.log('app getProfileDidLudoData error', error);
        });
    }

    getReportOfCurrentLudo(ludo_id) {
        // console.log('app before getReportOfCurrentLudo -- ludo_id: ', ludo_id);  // debug
        axios.get(`/apis/report?ludo_id=${ludo_id}`)
        .then(response => {
            if(response.data.status === '200') {
                console.log('app after getReportOfCurrentLudo before setState');  // debug
                this.setState({
                    currentLudoReportData: response.data.reportList
                });
                console.log('app after getReportOfCurrentLudo response', response);  // debug
                this.handleHasGotNewReport(false);
            } else {
                console.log('app getReportOfCurrentLudo else message from server: ', response.data.message);
                console.log('app getReportOfCurrentLudo else error from server: ', response.data.err);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    handleHasGotNewReport(boolean) {
        console.log('app handleHasGotNewReport', boolean);  // debug
        this.setState({
            hasGotNewReport: boolean
        });
    }

    handleIsHoveringSidebar(boolean) {
        // console.log('app handleIsHoveringSidebar', boolean);  // debug
        this.setState({
            isHoveringSidebar: boolean
        });
    }

    handleIsOpeningActivePage(boolean) {
        // console.log('app handleIsOpeningActivePage', boolean);  // debug
        this.setState({
            isOpeningActivePage: boolean
        });
    }

    handleIsOpeningLudoListPage(boolean) {
        // console.log('app handleIsOpeningLudoListPage', boolean);  // debug
        this.setState({
            isOpeningLudoListPage: boolean
        });
    }

    handleIsOpeningProfilePage(boolean) {
        // console.log('app handleIsOpeningProfilePage', boolean);  // debug
        this.setState({
            isOpeningProfilePage: boolean
        });
    }

    handleShouldLudoListUpdate(boolean) {
        // console.log('app handleShouldLudoListUpdate', boolean);  // debug
        this.setState({
            shouldLudoListUpdate: boolean
        });
    }

    handleShouldProfileUpdate(boolean) {
        // console.log('app handleShouldProfileUpdate', boolean);  // debug
        this.setState({
            shouldProfileUpdate: boolean
        });
    }

    handleShouldReportUpdate(boolean) {
        console.log('app handleShouldReportUpdate', boolean);  // debug
        this.setState({
            shouldReportUpdate: boolean
        });
    }

    updateCurrentFormValue(ludoForm) {
        // console.log('app updateCurrentFormValue');   // debug
        this.setState({
            currentFormValue: ludoForm
        });
    }

    render() {
        const { isHoveringSidebar } = this.state;
        const { router_currentFormValue } = this.props;
        return (
            <div>
                <Header isProfile={this.state.isOpeningProfilePage} userBasicData={this.state.userBasicData}/>
                <Sidebar currentUserId={this.state.currentUserId} 
                    handleIsHoveringSidebar={this.handleIsHoveringSidebar} 
                    isHoveringSidebar={isHoveringSidebar}
                />
                <div className={isHoveringSidebar ? `main-container hoveringSidebar` : `main-container`}>
                {
                    React.cloneElement(this.props.children,
                        Object.assign(this.state, {
                            router_currentFormValue,
                            clearCurrentFormValue: this.clearCurrentFormValue,
                            getBasicUserData: this.getBasicUserData,
                            getCurrentLudoData: this.getCurrentLudoData,
                            getLatestLudoList: this.getLatestLudoList,
                            getProfileData: this.getProfileData,
                            getProfileWillLudoData: this.getProfileWillLudoData,
                            getProfileLudoingData: this.getProfileLudoingData,
                            getProfileDidLudoData: this.getProfileDidLudoData,
                            getReportOfCurrentLudo: this.getReportOfCurrentLudo,
                            handleHasGotNewReport: this.handleHasGotNewReport,
                            handleIsHoveringSidebar: this.handleIsHoveringSidebar,
                            handleIsOpeningActivePage: this.handleIsOpeningActivePage,
                            handleIsOpeningLudoListPage: this.handleIsOpeningLudoListPage,
                            handleIsOpeningProfilePage: this.handleIsOpeningProfilePage,
                            handleShouldLudoListUpdate: this.handleShouldLudoListUpdate,
                            handleShouldProfileUpdate: this.handleShouldProfileUpdate,
                            handleShouldReportUpdate: this.handleShouldReportUpdate,
                            updateCurrentFormValue: this.updateCurrentFormValue
                        })
                    )
                }
                </div>
            </div>
        );
    }
};