import React from 'react';

import LudoList from '../../app/LudoList';
import OpenedStarterForm from './OpenedStarterForm';

export default class OpenedForStarter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="main-container">
                <OpenedStarterForm {...this.props} />
                <LudoList {...this.props} />
            </div>
        );
    }
};