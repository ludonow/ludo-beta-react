import React from "react";

import fuelIcon from '../../../images/header/fuel.png';

export default class HeaderHeart extends React.Component {
    render() {
        return (
            <div className="header-fuel">
                <img
                    className="header-fuel-icon"
                    src={fuelIcon}
                />
                <div className="header-fuel-text">
                    {
                        this.props.heart ? 
                            `${this.props.heart} / 4`
                        : null
                    } 
                </div>
            </div>
        );
    }
}