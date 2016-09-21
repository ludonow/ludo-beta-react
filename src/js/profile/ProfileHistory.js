import React from 'react';
import axios from '../axios-config';

export default class ProfileHistory extends React.Component {
    constructor() {
        super();
        this.state = { 
            rawData: []
        };
        this.getHistoryData = this.getHistoryData.bind(this);
    }

    // componentDidMount() {
    //     this.getHistoryData();
    // }

    getHistoryData() {
        axios.get('data/HistoryData.json')
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
                <div className="profile-element__title">History</div>
                {
                    this.state.rawData.map( (data, index) => {
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
                                )
                            })
                }
            </div>
        );
    }
}