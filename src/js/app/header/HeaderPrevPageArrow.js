import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import imageBack from '../../../images/header/back.png';

export default class HeaderPrevPageArrow extends Component {
    render() {
        return(
            <div className="header-left-arrow-container" onClick={browserHistory.goBack}>
                
                <img src={imageBack}/>
            </div>
        );
    }
}