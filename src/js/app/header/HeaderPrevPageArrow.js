import React, { Component } from 'react';
import { browserHistory } from 'react-router';

export default class HeaderPrevPageArrow extends Component {
    render() {
        return(
            <div className="header-left-arrow-container" onClick={browserHistory.goBack}>
                <i className="fa fa-arrow-left" aria-hidden="true"></i> 
            </div>
        );
    }
}