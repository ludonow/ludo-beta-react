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
            isgettingLatestData: false,
            ludoList: [],
            userBasicData: {},
            userLudoData: {},
            userProfileData: {}
        };
        this.getBasicUserData = this.getBasicUserData.bind(this);
        this.getCurrentLudoData = this.getCurrentLudoData.bind(this);
        this.getLatestLudoList = this.getLatestLudoList.bind(this);
        this.getProfileData = this.getProfileData.bind(this);
        this.getUserLudoData = this.getUserLudoData.bind(this);
        this.handleIsgettingLatestData = this.handleIsgettingLatestData.bind(this);
        this.updateCurrentFormValue = this.updateCurrentFormValue.bind(this);
    }

    componentDidMount() {
        this.getBasicUserData();
        this.getLatestLudoList();
    }

    getBasicUserData() {
        axios.get('/apis/user')
        .then(response => {
            if(response.data.status === '200') {
                this.setState({
                    userBasicData: response.data.user,
                    currentUserId: response.data.user.user_id
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
        axios.get('/apis/ludo')
        .then(response => {
            if(response.data.status === '200') {
                this.setState({
                    ludoList: response.data.ludoList.Items,
                    isgettingLatestData: false
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
        console.log('app getProfileData');
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

    getUserLudoData(user_id) {
        console.log('app getUserLudoData');
        axios.get(`apis/ludo?user_id=${user_id}`)
        .then(response => {
            if(response.data.status === '200') {
                this.setState({
                    userLudoData: response.data.ludoList.Items
                });
            } else {
                console.log('app getUserLudoData else message from server: ', response.data.message);
            }
        })
        .catch(error => {
            console.log('app getUserLudoData error', error);
        });
    }

    handleIsgettingLatestData(boolean) {
        const { isgettingLatestData } = this.state;
        this.setState({
            isgettingLatestData: boolean
        });
        // console.log('handleIsgettingLatestData', boolean);
    }

    updateCurrentFormValue(ludoForm) {
        this.setState({
            currentFormValue: ludoForm
        });
        console.log('updateCurrentFormValue');
    }

    render() {
        const isProfile = this.props.routes[1].path === "profile";
        const { 
            currentFormValue, currentLudoId, currentUserId, isgettingLatestData, ludoList, 
            userBasicData, userLudoData, userProfileData 
        } = this.state;
        return (
            <div>
                <Header isProfile={isProfile} userBasicData={userBasicData}/>
                <Sidebar currentUserId={currentUserId} />
                {React.cloneElement(this.props.children, {
                    currentFormValue,
                    currentUserId,
                    isgettingLatestData,
                    ludoList,
                    userBasicData,
                    userLudoData,
                    userProfileData,
                    getBasicUserData: this.getBasicUserData,
                    getCurrentLudoData: this.getCurrentLudoData,
                    getLatestLudoList: this.getLatestLudoList,
                    getProfileData: this.getProfileData,
                    getUserLudoData: this.getUserLudoData,
                    handleIsgettingLatestData: this.handleIsgettingLatestData,
                    updateCurrentFormValue: this.updateCurrentFormValue
                })}
            </div>
        );
    }
};