import React from 'react';
import axios from 'axios';

export default class ProfileStatistic extends React.Component {
    constructor() {
        super();
        this.state = { 
            rawData: [],
            DataWithClass: [] 
        }
    }

    componentDidMount() {
        this.getStatisticData();
    }

    getStatisticData() {
        const _this = this;

        this.serverRequest = axios.get('data/StatisticData.json')
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
                <div className="profile-statistic__element" key={index}>
                    <img className="profile-statistic__icon" src={data.value} />
                </div>
            );
        });
    }

    render() {
        this.addClass();
        return (
            <div className="profile-element">
                <div className="profile-element__title">Statistic</div>
                {this.state.DataWithClass}
            </div>
        );
    }
}