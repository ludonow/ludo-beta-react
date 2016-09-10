import React from 'react';
import axios from 'axios';

import Header from './header/Header';
import Search from './search/Search';
import Sidebar from './sidebar/Sidebar';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            rawData: [],
            isLudoListUpdated: true
        };
        this.handleLudoListUpdate = this.handleLudoListUpdate.bind(this);
    }

    componentDidMount() {
        this.getCardContent();
    }

    getCardContent() {
        const _this = this;

        this.serverRequest = axios.get('/apis/ludo?stage=1')
            .then(function (response) {
                if(response.data.status != 'err') {
                    _this.setState({
                        rawData: response.data.ludoList.Items
                    });
                } else {
                    console.log(response.data.message);
                }

            })
            .catch(function(error) {
                console.log(error);
                console.log(response.data.message);
            });
        /* example data */
        // this.serverRequest = axios.get('data/LudoData.json')
        //     .then(function (response) {
        //         _this.setState({
        //             rawCardContent: response.data
        //         });
        //     })
        //     .catch(function(error) {
        //         console.log(error);
        //     });
    }

    handleLudoListUpdate() {
        const state = this.state;
        this.setState(
            Object.assign(state, {
                isLudoListUpdated: true
            })
        );
        this.getCardContent();
        this.setState(
            Object.assign(state, {
                isLudoListUpdated: false
            })
        );
    }

    render() {
        const isProfile = this.props.routes[1].path === "profile";
        const { rawData } = this.state;
        return (
            <div>
                <Header isProfile={isProfile} />
                <Sidebar />
                <div className="main-container">
                    {React.cloneElement(this.props.children, {
                        rawData: rawData,
                        handleLudoListUpdate: this.handleLudoListUpdate
                    })}
                </div>
            </div>
        );
    }
};