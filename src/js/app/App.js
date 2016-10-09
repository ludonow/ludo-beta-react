import React from 'react';
import axios from '../axios-config';

import Header from './header/Header';
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
            shouldUserBasicDataUpdate: false,
            ludoList: [],
            profileWillLudoData: [],
            profileLudoingData: [],
            profileDidLudoData: [],
            userBasicData: {},
            userProfileData: {}
        };
        this.getUserBasicData = this.getUserBasicData.bind(this);
        this.getCurrentLudoData = this.getCurrentLudoData.bind(this);
        this.getLatestLudoList = this.getLatestLudoList.bind(this);
        this.getProfileData = this.getProfileData.bind(this);
        this.getProfileWillLudoData = this.getProfileWillLudoData.bind(this);
        this.getProfileLudoingData = this.getProfileLudoingData.bind(this);
        this.getProfileDidLudoData = this.getProfileDidLudoData.bind(this);
        this.getReportOfCurrentLudo = this.getReportOfCurrentLudo.bind(this);
    }

    componentDidMount() {
        this.handleShouldProfileUpdate(true);
        this.getUserBasicData();
    }

    componentDidUpdate() {
        const { currentUserId, isLoggedIn, isOpeningLudoListPage, isOpeningProfilePage, 
            shouldLudoListUpdate, shouldProfileUpdate, shouldUserBasicDataUpdate
        } = this.state;
        if(isOpeningLudoListPage && shouldLudoListUpdate) {
            this.getLatestLudoList();
            this.handleShouldLudoListUpdate(false);
        }
        if(currentUserId && isLoggedIn && shouldProfileUpdate) {
            /* 
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
        if(isOpeningActivePage && shouldReportUpdate) {
            this.getReportOfCurrentLudo(this.props.params.ludo_id);
            this.handleShouldReportUpdate(false);
        }

        if(shouldUserBasicDataUpdate) {
            this.getUserBasicData();
            this.handleShouldUserBasicDataUpdate(false);
        }
    }

    clearCurrentFormValue = () => {
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

    getUserBasicData() {
        axios.get('/apis/user')
        .then(response => {
            if(response.data.status === '200') {
                this.setState({
                    userBasicData: response.data.user,
                    currentUserId: response.data.user.user_id,
                    isLoggedIn: true
                });
            } else {
                console.error('app getUserBasicData else response from server: ', response);
                console.error('app getUserBasicData else message from server: ', response.data.message);
            }
        })
        .catch(error => {
            console.error('user error', error);
        });
    }

    getCurrentLudoData(ludo_id) {
        axios.get(`/apis/ludo/${ludo_id}`)
        .then(response => {
            if(response.data.status === '200') {
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
        .catch(error => {
            console.error('app getCurrentLudoData error', error);
        });
    }

    getLatestLudoList() {
        axios.get('/apis/ludo')
        .then(response => {
            if(response.data.status === '200') {
                this.setState({
                    ludoList: response.data.ludoList.Items
                });
            } else {
                console.error('app getLatestLudoList else response from server: ', response);
                console.error('app getLatestLudoList else message from server: ', response.data.message);
            }
        })
        .catch(error => {
            console.error('app getLatestLudoList error', error);
        });
    }

    getProfileData() {
        axios.get('/apis/profile')
        .then(response => {
            if(response.data.status === '200') {
                this.setState({
                    userProfileData: response.data.user
                });
            } else {
                console.error('app getProfileData else response from server: ', response);
                console.error('app getProfileData else message from server: ', response.data.message);
            }
        })
        .catch(error => {
            console.error('app getProfileData error', error);
        });
    }

    getProfileWillLudoData(user_id) {
        axios.get(`apis/ludo?stage=1&user_id=${user_id}`)
        .then(response => {
            if(response.data.status === '200') {
                this.setState({
                    profileWillLudoData: response.data.ludoList.Items
                });
            } else {
                console.error('app getProfileWillLudoData else response from server: ', response);
                console.error('app getProfileWillLudoData else message from server: ', response.data.message);
            }
        })
        .catch(error => {
            console.error('app getProfileWillLudoData error', error);
        });
    }

    getProfileLudoingData(user_id) {
        axios.get(`apis/ludo?stage=2&user_id=${user_id}`)
        .then(response => {
            if(response.data.status === '200') {
                this.setState({
                    profileLudoingData: response.data.ludoList.Items
                });
            } else {
                console.error('app getProfileLudoingData else response from server: ', response);
                console.error('app getProfileLudoingData else message from server: ', response.data.message);
            }
        })
        .catch(error => {
            console.error('app getProfileLudoingData error', error);
        });
    }

    getProfileDidLudoData(user_id) {
        axios.get(`apis/ludo?stage=3&user_id=${user_id}`)
        .then(response => {
            if(response.data.status === '200') {
                this.setState({
                    profileDidLudoData: response.data.ludoList.Items
                });
            } else {
                console.error('app getProfileDidLudoData else response from server: ', response);
                console.error('app getProfileDidLudoData else message from server: ', response.data.message);
            }
        })
        .catch(error => {
            console.error('app getProfileDidLudoData error', error);
        });
    }

    getReportOfCurrentLudo(ludo_id) {
        axios.get(`/apis/report?ludo_id=${ludo_id}`)
        .then(response => {
            if(response.data.status === '200') {
                this.setState({
                    currentLudoReportData: response.data.reportList,
                    hasGotNewReport: true
                });
            } else {
                console.error('app getReportOfCurrentLudo else response from server: ', response);
                console.error('app getReportOfCurrentLudo else message from server: ', response.data.message);
            }
        })
        .catch(error => {
            console.error(error);
        });
    }

    handleHasGotNewReport = (boolean) => {
        this.setState({
            hasGotNewReport: boolean
        });
    }

    handleIsHoveringSidebar = (boolean) => {
        this.setState({
            isHoveringSidebar: boolean
        });
    }

    handleIsOpeningActivePage = (boolean) => {
        this.setState({
            isOpeningActivePage: boolean
        });
    }

    handleIsOpeningLudoListPage = (boolean) => {
        this.setState({
            isOpeningLudoListPage: boolean
        });
    }

    handleIsOpeningProfilePage = (boolean)  => {
        this.setState({
            isOpeningProfilePage: boolean
        });
    }

    handleShouldLudoListUpdate = (boolean) => {
        this.setState({
            shouldLudoListUpdate: boolean
        });
    }

    handleShouldProfileUpdate = (boolean) => {
        this.setState({
            shouldProfileUpdate: boolean
        });
    }

    handleShouldReportUpdate = (boolean) => {
        this.setState({
            shouldReportUpdate: boolean
        });
    }

    handleShouldUserBasicDataUpdate = (boolean) => {
        this.setState({
            shouldUserBasicDataUpdate: boolean
        });
    }

    updateCurrentFormValue = (ludoForm) => {
        this.setState({
            currentFormValue: ludoForm
        });
    }

    render() {
        const { isHoveringSidebar } = this.state;
        const { router_currentFormValue } = this.props;
        return (
            <div>
                <Header isProfile={this.state.isOpeningProfilePage} 
                    userBasicData={this.state.userBasicData}
                />
                <Sidebar currentUserId={this.state.currentUserId} 
                    handleIsHoveringSidebar={this.handleIsHoveringSidebar} 
                    isHoveringSidebar={isHoveringSidebar}
                />
                <div className={isHoveringSidebar ? 'main-container hoveringSidebar' : 'main-container'}>
                    {
                        React.cloneElement(this.props.children,
                            {
                                ...this.state, 
                                router_currentFormValue,
                                clearCurrentFormValue: this.clearCurrentFormValue,
                                getUserBasicData: this.getUserBasicData,
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
                                handleShouldUserBasicDataUpdate: this.handleShouldUserBasicDataUpdate,
                                updateCurrentFormValue: this.updateCurrentFormValue
                            }
                        )
                    }
                </div>
            </div>
        );
    }
}