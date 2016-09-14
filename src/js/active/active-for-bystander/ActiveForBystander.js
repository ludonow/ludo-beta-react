import React from 'react';

import ActiveBystanderForm from './ActiveBystanderForm';
import ActiveReports from '../ActiveReports';

export default class ActiveForBystander extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="main-container">
                <ActiveBystanderForm  {...this.props} />
                <ActiveReports {...this.props} />
            </div>
        );
    }
}

