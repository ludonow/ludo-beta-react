import React from 'react';

import LudoList from '../../app/LudoList';
import OpenedBystanderForm from './OpenedBystanderForm';

export default class OpenedForBystander extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            /* components/_form.scss */
            <div className="form-and-list">
                <OpenedBystanderForm {...this.props} />
                <div className="form-ludo-list-container">
                    <LudoList {...this.props} />
                </div>
            </div>
        );
    }
};