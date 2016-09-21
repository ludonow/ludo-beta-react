import React from 'react';
import axios from '../axios-config';

export default class ProfilePrize extends React.Component {
    constructor() {
        super();
        this.state = { 
            rawData: []
        };
        this.getPrizeData = this.getPrizeData.bind(this);
    }

    // componentDidMount() {
    //     this.getPrizeData();
    // }

    getPrizeData() {
        axios.get('data/PrizeData.json')
        .then(function (response) {
            this.setState({
                rawData: response.data
            });
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    render() {
        return (
            <div className="profile-element">
                <div className="profile-element__title">Prize</div>
                {
                    this.state.rawData.map( (data, index) => {
                        return (
                            <div className="profile-prize__element" key={index}>
                                <img className="profile-prize__icon" src={data.value} />
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}