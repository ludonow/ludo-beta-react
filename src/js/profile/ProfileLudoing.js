import React from 'react';
import axios from 'axios';

export default class ProfileLudoing extends React.Component {
    constructor() {
        super();
        this.state = { 
            rawData: [],
            DataWithClass: []
        };
    }

    componentDidMount() {
        this.getLudoingData();
    }

    getLudoingData() {
        const _this = this;

        this.serverRequest = axios.get('data/LudoingData.json')
            .then(function (response) {
                _this.setState({
                    rawData: response.data
                });
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    addClass() {
        this.state.DataWithClass = this.state.rawData.map( (data, index) => {
            return (
                <div className="profile-ludoing__element" key={index}>
                    <img className="profile-ludoing__icon" src={data.value} />
                </div>
            );
        });
    }

    render() {
        this.addClass();
        return (
            <div className="profile-element">
                <div className="profile-element__title">Ludoing</div>
                {this.state.DataWithClass}
            </div>
        );
    }
}