import React from 'react';

import LudoEditForm from './LudoEditForm';
import LudoList from '../app/LudoList';

export default class LudoEdit extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="form-and-list">
                <div className="form">
                    <LudoEditForm {...this.props} />
                </div>
                <div className="form-ludo-list-container">
                    <LudoList {...this.props} />
                </div>
            </div>
        );
    }
}

