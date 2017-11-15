import React, { Component } from 'react';
import MediaQuery from 'react-responsive';

import CreateForm from './CreateForm';
import MobileCreateCard from './mobile-create-card/MobileCreateCard';

export default class Create extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            /* components/_form.scss */
            <div>
                <MediaQuery minDeviceWidth={768} className="form-and-list">
                    <CreateForm {...this.props} />
                </MediaQuery>
                <MediaQuery maxDeviceWidth={768}>
                    <MobileCreateCard {...this.props} />
                </MediaQuery>
            </div>
        );
    }
}