import React from 'react';
import axios from '../axios-config';

export default class ProfileStatistic extends React.Component {
    constructor() {
        super();
        this.state = { 
            rawData: []
        };
        this.getStatisticData = this.getStatisticData.bind(this);
    }

    // componentDidMount() {
    //     this.getStatisticData();
    // }

    getStatisticData() {
        axios.get('data/StatisticData.json')
        .then(response => {
            this.setState({
                rawData: response.data
            });
        })
        .catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <div className="profile-element">
                <div className="profile-element__title">Statistic</div>
                {
                    this.state.DataWithClass = this.state.rawData.map( (data, index) => {
                        return (
                            <div className="profile-statistic__element" key={index}>
                                <img className="profile-statistic__icon" src={data.value} />
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}