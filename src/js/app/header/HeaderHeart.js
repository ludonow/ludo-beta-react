import React from "react";

import heartIcon from '../../../images/header/heart.png';

export default class HeaderHeart extends React.Component {
    render() {
        return (
            <div className="header-heart">
                <div>{this.props.heart} / 4 </div>
            </div>
                // <img className="header-heart-icon" src={heartIcon} />
        );
    }
}