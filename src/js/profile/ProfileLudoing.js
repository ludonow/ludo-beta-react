import React from 'react';

export default class ProfileLudoing extends React.Component {
    constructor() {
        super();
        this.state = { ludoing:[] };
    }

    getLudoingData() {
        this.state.ludoing = this.props.data.map( (data, index) => {
            return (
                <div className="profile-ludoing__element" key={index}>
                    <img className="profile-ludoing__icon" src={data.value} />
                </div>
            );
        });
    }

    render() {
        this.getLudoingData();
        return (
            <div className="profile-element">
                <div className="profile-element__title">Ludoing</div>
                {this.state.ludoing}
            </div>
        );
    }
}