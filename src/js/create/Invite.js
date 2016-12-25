import React from 'react';

import InvitationForm from './InvitationForm';
import LudoList from '../app/LudoList';

export default class Invite extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            /* components/_form.scss */
            <div className="form-and-list">
                <div className="form">
                    <InvitationForm {...this.props} />
                </div>
                <div className="form-ludo-list-container">
                    <LudoList {...this.props} />
                </div>
            </div>
        );
    }
}