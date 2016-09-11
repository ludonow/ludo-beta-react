import React from "react";

import marblesIcon from '../../../images/header/marbles.png';

export default class HeaderMarbles extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="header-marbles">
                <img className="header-marbles__icon" src={marblesIcon} />
                <div className="header-marbles__number">{this.props.marbles}</div>
            </div>
        );
    }
}