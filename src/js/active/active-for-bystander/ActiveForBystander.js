import React from 'react';

import ActiveBystanderForm from './ActiveBystanderForm';
import ActiveReports from '../ActiveReports';

export default class ActiveForBystander extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.handleIsOpeningActivePage(true);
    }

    componentWillUnmount() {
        this.props.handleIsOpeningActivePage(false);
    }

    render() {
        return (
            <div className="form-and-report">
                <ActiveBystanderForm  {...this.props} />
                <ActiveReports {...this.props} />
            </div>
        );
    }
}

