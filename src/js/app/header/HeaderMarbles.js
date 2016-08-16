import React from "react";

import marblesIcon from '../../../images/header/marbles.png';

export default class HeaderMarbles extends React.Component {
    constructor() {
        super();
        this.state = { marblesNumber: 1000 }
    }

    getMarblesNumber() {

    }

    render() {
        return (
            <div className="header-marbles">
                <img src={marblesIcon} />
                <div>{this.state.marblesNumber}</div>
            </div>
        );
    }
}