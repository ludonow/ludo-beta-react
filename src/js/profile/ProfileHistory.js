import React from 'react';

export default class ProfileHistory extends React.Component {
    constructor() {
        super();
        this.state = { history:[] }
    }

    getHistoryData() {
        this.state.history = this.props.data.map( (data, index) => {
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
        this.getHistoryData();
        return (
            <div className="profile-element">
                <div className="profile-element__title">History</div>
                {this.state.history}
            </div>
        );
    }
}