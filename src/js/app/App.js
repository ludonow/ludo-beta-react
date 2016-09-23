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
            currentLudoId: '',
            currentLudoReportData: {},
            currentUserId: '',
            isLoggedIn: false,
            isOpeningProfilePage: false,
            isOpeningActivePage: false,
            shouldProfileUpdate: false,
            ludoList: [],
            profileWillLudoData: [],
            profileLudoingData: [],
            profileDidLudoData: [],
            userBasicData: {},
            userProfileData: {}
        };
        this.getBasicUserData = this.getBasicUserData.bind(this);
        this.getCurrentLudoData = this.getCurrentLudoData.bind(this);
        this.getLatestLudoList = this.getLatestLudoList.bind(this);
        this.getProfileData = this.getProfileData.bind(this);
        this.getProfileWillLudoData = this.getProfileWillLudoData.bind(this);
        this.getProfileLudoingData = this.getProfileLudoingData.bind(this);
        this.getProfileDidLudoData = this.getProfileDidLudoData.bind(this);
        this.getReportOfCurrentLudo = this.getReportOfCurrentLudo.bind(this);
        this.handleIsOpeningProfilePage = this.handleIsOpeningProfilePage.bind(this);
        this.handleShouldProfileUpdate = this.handleShouldProfileUpdate.bind(this);
        this.updateCurrentFormValue = this.updateCurrentFormValue.bind(this);
    }

    componentDidMount() {
        this.getBasicUserData();
        this.getLatestLudoList();
    }

    componentDidUpdate() {
        // console.log('app componentDidUpdate state', this.state);  // debug
        const { currentUserId, isOpeningProfilePage, isLoggedIn, shouldProfileUpdate } = this.state;
        /* 
         * Update profile data after the user did some ludo action and is going to open profile page 
         */
        if (currentUserId && isLoggedIn && isOpeningProfilePage && shouldProfileUpdate) { 
            // console.log('app componentDidUpdate shouldProfileUpdate');   // debug
            this.getProfileData();
            this.getProfileWillLudoData(currentUserId);
            this.getProfileLudoingData(currentUserId);
            // this.getProfileDidLudoData(currentUserId);
            this.handleShouldProfileUpdate(false);
        }

        const { currentLudoId, isOpeningActivePage } = this.state;
        if (currentLudoId && isOpeningActivePage) {
            console.log('app componentDidUpdate getReportOfCurrentLudo');
        }
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
        // console.log('app before getCurrentLudoData');  // debug
        axios.get(`/apis/ludo/${ludo_id}`)
        .then(response => {
            if(response.data.status === '200') {
                this.setState({
                    currentFormValue: response.data.ludo,
                    currentLudoId: ludo_id
                });
            } else {
                console.log('app else message from server: ', response.data.message);
            }
        })
        .catch(error => {
            console.log('app getCurrentLudoData error', error);
        });
    }

    getLatestLudoList() {
        // console.log('app before getLatestLudoList');  // debug
        axios.get('/apis/ludo')
        .then(response => {
            if(response.data.status === '200') {
                this.setState({
                    ludoList: response.data.ludoList.Items,
                    shouldProfileUpdate: false
                });
            } else {
                console.log('app getLatestLudoList else message from server: ', response.data.message);
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
        console.log('app before getReportOfCurrentLudo');  // debug
        axios.get(`/apis/report?ludo_id=${ludo_id}`)
        .then(response => {
            if(response.data.status === '200') {
                console.log('app getReportOfCurrentLudo response data', response.data);
                // this.setState({
                //     currentLudoReportData: response.data.ludoList.Items
                // });
            } else {
                console.log('app getReportOfCurrentLudo else message from server: ', response.data.message);
                console.log('app getReportOfCurrentLudo else error from server: ', response.data.err);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    handleShouldProfileUpdate(boolean) {
        // console.log('app handleShouldProfileUpdate', boolean);  // debug
        this.setState({
            shouldProfileUpdate: boolean
        });
    }

    handleIsOpeningProfilePage(boolean) {
        // console.log('app handleIsOpeningProfilePage', boolean);  // debug
        this.setState({
            isOpeningProfilePage: boolean
        });
    }

    updateCurrentFormValue(ludoForm) {
        this.setState({
            currentFormValue: ludoForm
        });
        console.log('app updateCurrentFormValue');
    }

    render() {
        return (
            <div>
                <Header isProfile={this.state.isOpeningProfilePage} userBasicData={this.state.userBasicData}/>
                <Sidebar currentUserId={this.state.currentUserId} />
                {
                    React.cloneElement(this.props.children,
                        Object.assign(this.state, {
                            getBasicUserData: this.getBasicUserData,
                            getCurrentLudoData: this.getCurrentLudoData,
                            getLatestLudoList: this.getLatestLudoList,
                            getProfileData: this.getProfileData,
                            getProfileWillLudoData: this.getProfileWillLudoData,
                            getProfileLudoingData: this.getProfileLudoingData,
                            getProfileDidLudoData: this.getProfileDidLudoData,
                            handleIsOpeningProfilePage: this.handleIsOpeningProfilePage,
                            handleShouldProfileUpdate: this.handleShouldProfileUpdate,
                            updateCurrentFormValue: this.updateCurrentFormValue
                        })

                        // {
                        //     currentFormValue,
                        //     currentUserId,
                        //     isOpeningProfilePage,
                        //     isLoggedIn,
                        //     ludoList,
                        //     profileWillLudoData,
                        //     profileLudoingData,
                        //     profileDidLudoData,
                        //     shouldProfileUpdate,
                        //     userBasicData,
                        //     userProfileData,
                        //     getBasicUserData: this.getBasicUserData,
                        //     getCurrentLudoData: this.getCurrentLudoData,
                        //     getLatestLudoList: this.getLatestLudoList,
                        //     getProfileData: this.getProfileData,
                        //     getProfileWillLudoData: this.getProfileWillLudoData,
                        //     getProfileLudoingData: this.getProfileLudoingData,
                        //     getProfileDidLudoData: this.getProfileDidLudoData,
                        //     handleIsOpeningProfilePage: this.handleIsOpeningProfilePage,
                        //     handleShouldProfileUpdate: this.handleShouldProfileUpdate,
                        //     updateCurrentFormValue: this.updateCurrentFormValue
                        // }
                    )
                }
            </div>
        );
    }
};