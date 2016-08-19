import React from 'react';
import axios from 'axios';

export default class ProfileHistory extends React.Component {
    constructor() {
        super();
        this.state = { 
            rawData: [],
            DataWithClass: [] 
        }
    }

    componentDidMount() {
        this.getHistoryData();
    }

    getHistoryData() {
        const _this = this;

        this.serverRequest = axios.get('data/HistoryData.json')
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
            let condition_color = '';
            if (data.condition === 'W') {
                condition_color = 'win';
            } else if (data.condition === 'L') {
                condition_color = 'lose';
            } else {
                condition_color = 'deuce';
            }
            return (
                <div className="profile-history__element" key={index}>
                    <span className={`profile-history__condition ${condition_color}`}>
                        {data.condition}
                    </span>
                    <img className="profile-history__icon" src={data.img} />
                </div>
            );
        });
    }

    render() {
        this.addClass();
        return (
            <div className="profile-element">
                <div className="profile-element__title">History</div>
                {this.state.DataWithClass}
            </div>
        );
    }
}