import React from 'react';

export default class ProfileStatistic extends React.Component {
    constructor() {
        super();
        this.state = { statistic:[] }
    }

    getStatisticData() {
        this.state.statistic = this.props.data.map( (data, index) => {
            return (
                <div className="profile-statistic__element" key={index}>
                    <img className="profile-statistic__icon" src={data.value} />
                </div>
            );
        });
    }

    render() {
        this.getStatisticData();
        return (
            <div className="profile-element">
                <div className="profile-element__title">Statistic</div>
                {this.state.statistic}
            </div>
        );
    }
}