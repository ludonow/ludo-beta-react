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
                marbles: 1,
                duration: 3,
                checkpoint: [3],
                title: '',
                introduction: '',
                tags: ''
            }
        };
        this.handleLudoListUpdate = this.handleLudoListUpdate.bind(this);
        this.updateCurrentFormValue = this.updateCurrentFormValue.bind(this);
    }

    componentDidMount() {
        this.handleLudoListUpdate();
    }

    handleLudoListUpdate() {
        const state = this.state;
        const _this = this;
        const nextState = (response) => {
            return (
                Object.assign(_this.state, {
                    rawData: response.data.ludoList.Items
                })
            );
        };

        axios.get('/apis/ludo?stage=1')
        .then(function (response) {
            if(response.data.status != 'err') {
                _this.setState(nextState(response));
            } else {
                console.log(response.data.status);
            }
        })
        .catch(function(error) {
            console.log('error', error);
            console.log(response.data.status);
        });
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
        const { currentFormValue, rawData } = this.state;
        return (
            <div>
                <Header isProfile={isProfile} />
                <Sidebar />
                <div className="main-container">
                    {React.cloneElement(this.props.children, {
                        currentFormValue,
                        handleLudoListUpdate: this.handleLudoListUpdate,
                        rawData,
                        updateCurrentFormValue: this.updateCurrentFormValue
                    })}
                </div>
            </div>
        );
    }
};