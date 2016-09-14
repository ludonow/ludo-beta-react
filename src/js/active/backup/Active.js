import React from 'react';

import ActiveReports from './ActiveReports';

export default class Active extends React.Component {
    render() {
        return (
            <ActiveReports {...this.props}/>
        );
    }
}

