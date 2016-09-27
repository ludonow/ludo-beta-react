import React from 'react';

import CreateForm from './CreateForm';
import LudoList from '../app/LudoList';

export default class Create extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="form-and-list">
                <div className="form">
                    <CreateForm {...this.props} />
                </div>
                <div className="form-ludo-list-container">
                    <LudoList {...this.props} />
                </div>
            </div>
        );
    }
}

