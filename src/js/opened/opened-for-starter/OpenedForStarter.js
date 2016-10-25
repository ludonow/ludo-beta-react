import React from 'react';

import LudoList from '../../app/LudoList';
import OpenedStarterForm from './OpenedStarterForm';

export default class OpenedForStarter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            /* components/_form.scss */
            <div className="form-and-list">
                <OpenedStarterForm {...this.props} />
                <div className="form-ludo-list-container">
                    <LudoList {...this.props} />
                </div>
            </div>
        );
    }
};