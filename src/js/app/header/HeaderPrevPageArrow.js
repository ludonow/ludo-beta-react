import React, { Component } from 'react';
import { browserHistory } from 'react-router';

// import LeftArrow from 'react-icons/lib/md/arrow-back';

export default class HeaderPrevPageArrow extends Component {
    render() {
        return(
            <div className="header-left-arrow-container" onClick={browserHistory.goBack}>
                
            </div>
        );
    }
}