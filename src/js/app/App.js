import React from 'react';
import axios from '../axios-config';

import Header from './header/Header';
import Search from './search/Search';
import Sidebar from './sidebar/Sidebar';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rawData: [],
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
            userBasicData: {}
        };
        this.getBasicUserData = this.getBasicUserData.bind(this);
        this.getCurrentLudoData = this.getCurrentLudoData.bind(this);
        this.handleIsgettingLatestData = this.handleIsgettingLatestData.bind(this);
        this.handleLudoListUpdate = this.handleLudoListUpdate.bind(this);
        this.updateCurrentFormValue = this.updateCurrentFormValue.bind(this);
    }

    componentDidMount() {
        this.getBasicUserData();
        this.handleLudoListUpdate();
    }

    getBasicUserData() {
        axios.get('/apis/user')
        .then(response => {
            if(response.data.status === '200') {
                this.setState(
                    Object.assign(this.state, {
                        userBasicData: response.data.user,
                        currentUserId: response.data.user.user_id
                    })
                );
            } else {
                console.log('app getBasicUserData else message from server: ', response.data);
                // console.log('app getBasicUserData else message from server: ', response.data.message);
            }
        })
        .catch(error => {
            console.log('user error', error);
            console.log('message from server: ', response.data.message);
        });
    }

    getCurrentLudoData(ludo_id) {
        axios.get(`/apis/ludo/${ludo_id}`)
        .then(response => {
            if(response.data.status === '200') {
                this.setState(
                    Object.assign(this.state, {
                        currentFormValue: response.data.ludo
                    })
                );
                this.setState(
                    Object.assign(this.state, {
                        currentLudoId: ludo_id
                    })
                );
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

    handleIsgettingLatestData(boolean) {
        const { isgettingLatestData } = this.state;
        this.setState(
            Object.assign(this.state, {
                isgettingLatestData: boolean
            })
        );
        console.log('handleIsgettingLatestData', boolean);
    }

    handleLudoListUpdate() {
        axios.get('/apis/ludo?stage=2')
        .then(response => {
            if(response.data.status === '200') {
                this.setState(
                    Object.assign(this.state, {
                        rawData: response.data.ludoList.Items
                    })
                );
            } else {
                console.log(response.data.message);
            }
        })
        .catch(error => {
            console.log('ludo list error', error);
            console.log(response.data.message);
        });

        /* example data */
        // config.get('data/LudoData.json')
        // .then(response => {
        //     this.setState({
        //         rawData: response.data
        //     });
        // })
        // .catch(error => {
        //     console.log('ludo list error', error);
        // });
    }

    updateCurrentFormValue(ludoForm) {
        this.setState(
            Object.assign(this.state, {
                currentFormValue: ludoForm
            })
        );
        console.log('updateCurrentFormValue');
    }

    render() {
        const isProfile = this.props.routes[1].path === "profile";
        const { currentFormValue, currentLudoId, currentUserId, isgettingLatestData, rawData, userBasicData } = this.state;
        return (
            <div>
                <Header isProfile={isProfile} userBasicData={userBasicData}/>
                <Sidebar currentUserId={currentUserId} />
                {React.cloneElement(this.props.children, {
                    currentFormValue,
                    currentUserId,
                    getBasicUserData: this.getBasicUserData,
                    getCurrentLudoData: this.getCurrentLudoData,
                    getCurrentLudoId: this.getCurrentLudoId,
                    handleIsgettingLatestData: this.handleIsgettingLatestData,
                    handleLudoListUpdate: this.handleLudoListUpdate,
                    isgettingLatestData,
                    rawData,
                    updateCurrentFormValue: this.updateCurrentFormValue,
                    userBasicData
                })}
            </div>
        );
    }
};