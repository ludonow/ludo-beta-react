import React, { Component } from 'react';

import LeftArrow from 'react-icons/lib/md/arrow-back';

export default class HeaderPrevPageArrow extends Component {
    render() {
        return(
            <div className="header-left-arrow-container">
                <LeftArrow size={40} />
            </div>
        );
    }
}