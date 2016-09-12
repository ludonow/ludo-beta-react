import React from 'react';

import CreateForm from './CreateForm';
import LudoList from '../app/LudoList';

export default class Create extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="main-container">
                <CreateForm {...this.props} />
                <LudoList {...this.props} />
            </div>
        );
    }
}

