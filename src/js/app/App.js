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
                category_id: 1,
                checkpoint: [3],
                duration: 3,
                introduction: '',
                marbles: 1,
                tags: '',
                title: ''
            },
            currentLudoId: '',
            currentUserId: '',
            userBasicData: {}
        };
        this.getBasicUserData = this.getBasicUserData.bind(this);
        this.getCurrentLudoId = this.getCurrentLudoId.bind(this);
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
            if(response.data.status === 'success') {
                _this.setState(
                    Object.assign(_this.state, {
                        userBasicData: response.data.user,
                        currentUserId: response.data.user.user_id
                    })
                )
            } else {
                console.log('user status', response.data.message);
            }
        })
        .catch(function(error) {
            console.log('user error', error);
            console.log(response.data.message);
        });

        // axios.get('/apis/profile')
        // .then(function (response) {
        //     if(response.data.status === 'success') {
        //         console.log('profile', response.data);
        //     } else {
        //         console.log('profile status', response.data.message);
        //     }
        // })
        // .catch(function(error) {
        //     console.log('profile error', error);
        //     console.log(response.data.message);
        // });
    }

    getCurrentLudoId(ludo_id) {
        // this.setState(
        //     Object.assign(this.state, {
        //         currentLudoId: ludo_id
        //     })
        // );

        const _this = this;
        _this.setState(
            Object.assign(_this.state, {
                currentLudoId: ludo_id
            })
        );
        console.log('ludo id', ludo_id);
        console.log('getCurrentLudoId');
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
                console.log(response.data.message);
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
        const { currentFormValue, currentLudoId, currentUserId, rawData, userBasicData } = this.state;
        return (
            <div>
                <Header isProfile={isProfile} userBasicData={userBasicData}/>
                <Sidebar />
                <div className="main-container">
                    {React.cloneElement(this.props.children, {
                        currentFormValue,
                        currentLudoId,
                        currentUserId,
                        getCurrentLudoId: this.getCurrentLudoId,
                        handleLudoListUpdate: this.handleLudoListUpdate,
                        rawData,
                        updateCurrentFormValue: this.updateCurrentFormValue,
                        userBasicData
                    })}
                </div>
            </div>
        );
    }
};