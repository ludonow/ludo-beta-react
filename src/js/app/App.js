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
            currentUserId: '',
            isLoggedIn: false,
            isOpeningProfile: false,
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
        this.handleIsOpeningProfile = this.handleIsOpeningProfile.bind(this);
        this.handleShouldProfileUpdate = this.handleShouldProfileUpdate.bind(this);
        this.updateCurrentFormValue = this.updateCurrentFormValue.bind(this);
    }

    componentDidMount() {
        this.getBasicUserData();
        this.getLatestLudoList();
    }

    componentDidUpdate() {
        // console.log('app componentDidUpdate state', this.state);  // debug
        const { 
            currentUserId,
            isOpeningProfile, isLoggedIn, shouldProfileUpdate 
        } = this.state;
        /* 
         * Update profile data after the user did some ludo action and is going to open profile page 
         */
        if (currentUserId && isLoggedIn && isOpeningProfile && shouldProfileUpdate) { 
            // console.log('app componentDidUpdate shouldProfileUpdate');   // debug
            this.getProfileData();
            this.getProfileWillLudoData(currentUserId);
            this.getProfileLudoingData(currentUserId);
            // this.getProfileDidLudoData(currentUserId);
            this.handleShouldProfileUpdate(false);
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

        /* example data */
        // this.setState(
        //     Object.assign(this.state, {
        //         currentFormValue: {
        //             category_id: 3,
        //             checkpoint: [1,2,3],
        //             duration: 3,
        //             introduction: 'jog 30 min',
        //             marbles: 5,
        //             tags: '#jog #exercise',
        //             title: 'Jog Everyday'
        //         }
        //     })
        // );
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

        /* example data */
        // config.get('data/LudoData.json')
        // .then(response => {
        //     this.setState({
        //         ludoList: response.data
        //     });
        // })
        // .catch(error => {
        //     console.log('ludo list error', error);
        // });
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
        // console.log('app getProfileLudoingData');  // debug
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
        // console.log('app getProfileDidLudoData');  // debug
        axios.get(`apis/ludo?stage=3&user_id=${user_id}`)
        .then(response => {
            if(response.data.status === '200') {
                this.setState({
                    profileDidLudoData: response.data.ludoList.Items
                });
            } else {
                console.log('app getProfileDidLudoData else message from server: ', response.data.message);
            }
        })
        .catch(error => {
            console.log('app getProfileDidLudoData error', error);
        });
    }

    handleShouldProfileUpdate(boolean) {
        // console.log('app handleShouldProfileUpdate', boolean);  // debug
        this.setState({
            shouldProfileUpdate: boolean
        });
    }

    handleIsOpeningProfile(boolean) {
        // console.log('app handleIsOpeningProfile', boolean);  // debug
        this.setState({
            isOpeningProfile: boolean
        });
    }

    updateCurrentFormValue(ludoForm) {
        this.setState({
            currentFormValue: ludoForm
        });
        console.log('app updateCurrentFormValue');
    }

    render() {
        const isProfile = this.props.routes[1].path === "profile";
        const { 
            currentFormValue, currentLudoId, currentUserId, isLoggedIn, isOpeningProfile, ludoList,
            profileWillLudoData, profileLudoingData, profileDidLudoData, shouldProfileUpdate, userBasicData,  userProfileData
        } = this.state;
        return (
            <div>
                <Header isProfile={isProfile} userBasicData={userBasicData}/>
                <Sidebar currentUserId={currentUserId} />
                {
                    React.cloneElement(this.props.children, {
                        currentFormValue,
                        currentUserId,
                        isOpeningProfile,
                        isLoggedIn,
                        ludoList,
                        profileWillLudoData,
                        profileLudoingData,
                        profileDidLudoData,
                        shouldProfileUpdate,
                        userBasicData,
                        userProfileData,
                        getBasicUserData: this.getBasicUserData,
                        getCurrentLudoData: this.getCurrentLudoData,
                        getLatestLudoList: this.getLatestLudoList,
                        getProfileData: this.getProfileData,
                        getProfileWillLudoData: this.getProfileWillLudoData,
                        getProfileLudoingData: this.getProfileLudoingData,
                        getProfileDidLudoData: this.getProfileDidLudoData,
                        handleIsOpeningProfile: this.handleIsOpeningProfile,
                        handleShouldProfileUpdate: this.handleShouldProfileUpdate,
                        updateCurrentFormValue: this.updateCurrentFormValue
                    })
                }
            </div>
        );
    }
};