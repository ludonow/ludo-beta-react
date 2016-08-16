import React from 'react';

export default class ProfilePrize extends React.Component {
    constructor() {
        super();
        this.state = { prize:[] }
    }

    getPrizeData() {
        this.state.prize = this.props.data.map( (data, index) => {
            return (
                <div className="profile-prize__element" key={index}>
                    <img className="profile-prize__icon" src={data.value} />
                </div>
            );
        });
    }

    render() {
        this.getPrizeData();
        return (
            <div className="profile-element">
                <div className="profile-element__title">Prize</div>
                {this.state.prize}
            </div>
        );
    }
}