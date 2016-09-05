import React from "react";

import heartIcon from '../../../images/header/heart.png';

export default class HeaderHeart extends React.Component {
    render() {
        return (
            <div className="header-heart">
                <img className="header-heart-icon" src={heartIcon} />
            </div>
        );
    }
}