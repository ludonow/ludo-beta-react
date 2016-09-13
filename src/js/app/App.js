import React from 'react';
import axios from 'axios';

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
            isCreatingNewLudo: false,
            userBasicData: {}
        };
        this.getBasicUserData = this.getBasicUserData.bind(this);
        this.getCurrentLudoData = this.getCurrentLudoData.bind(this);
        this.handleIsCreatingNewLudo = this.handleIsCreatingNewLudo.bind(this);
        this.handleLudoListUpdate = this.handleLudoListUpdate.bind(this);
        this.updateCurrentFormValue = this.updateCurrentFormValue.bind(this);
    }

    componentDidMount() {
        this.getBasicUserData();
        this.handleLudoListUpdate();
    }

    getBasicUserData() {
        const _this = this;

        axios.get('/apis/user')
        .then(function (response) {
            if(response.data.status === '200') {
                _this.setState(
                    Object.assign(_this.state, {
                        userBasicData: response.data.user,
                        currentUserId: response.data.user.user_id
                    })
                );
            } else {
                console.log('message from server: ', response.data.message);
            }
        })
        .catch(function(error) {
            console.log('user error', error);
            console.log('message from server: ', response.data.message);
        });
    }

    getCurrentLudoData(ludo_id) {
        const _this = this;
        axios.get(`/apis/ludo/${ludo_id}`)
        .then((response) => {
            if(response.data.status === '200') {
                _this.setState(
                    Object.assign(_this.state, {
                        currentFormValue: response.data.ludo
                    })
                );
                _this.setState(
                    Object.assign(_this.state, {
                        currentLudoId: ludo_id
                    })
                );
            } else {
                console.log('app else message from server: ', response.data.message);
            }
        })
        .catch((error) => {
            console.log('app getCurrentLudoData error', error);
        });
    }

    handleIsCreatingNewLudo(boolean) {
        const { isCreatingNewLudo } = this.state;
        this.setState(
            Object.assign(this.state, {
                isCreatingNewLudo: boolean
            })
        );
        console.log('handleIsCreatingNewLudo', boolean);
    }

    handleLudoListUpdate() {
        const _this = this;
        axios.get('/apis/ludo?stage=1')
        .then(function (response) {
            if(response.data.status === '200') {
                _this.setState(
                    Object.assign(_this.state, {
                        rawData: response.data.ludoList.Items
                    })
                );
            } else {
                console.log('get ludo list');
                console.log('message from server: ', response.data.message);
            }
        })
        .catch(function(error) {
            console.log('ludo list error', error);
            console.log(response.data.message);
        });

        // axios.get('/apis/ludo?stage=1')
        // .then(function (response) {
        //     if(response.data.status === '200') {
        //         this.setState(
        //             Object.assign(this.state, {
        //                 rawData: response.data.ludoList.Items
        //             })
        //         );
        //     } else {
        //         console.log(response.data.message);
        //     }
        // })
        // .catch(function(error) {
        //     console.log('ludo list error', error);
        //     console.log(response.data.message);
        // });

        /* example data */
        // config.get('data/LudoData.json')
        // .then(function (response) {
        //     _this.setState({
        //         rawCardContent: response.data
        //     });
        // })
        // .catch(function(error) {
        //     console.log(error);
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
        const { currentFormValue, currentLudoId, currentUserId, isCreatingNewLudo, rawData, userBasicData } = this.state;
        return (
            <div>
                <Header isProfile={isProfile} userBasicData={userBasicData}/>
                <Sidebar currentUserId={currentUserId} />
                <div className="main-container">
                {React.cloneElement(this.props.children, {
                    currentFormValue,
                    currentUserId,
                    getBasicUserData: this.getBasicUserData,
                    getCurrentLudoData: this.getCurrentLudoData,
                    getCurrentLudoId: this.getCurrentLudoId,
                    handleIsCreatingNewLudo: this.handleIsCreatingNewLudo,
                    handleLudoListUpdate: this.handleLudoListUpdate,
                    isCreatingNewLudo,
                    rawData,
                    updateCurrentFormValue: this.updateCurrentFormValue,
                    userBasicData
                })}
                </div>
            </div>
        );
    }
};