import React from 'react';

import ActivePlayerForm from './ActivePlayerForm';
import ActiveReports from '../ActiveReports';

export default class ActiveForPlayer extends React.Component {
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
            /* components/_report-form.scss */
            <div className="form-and-report">
                <ActivePlayerForm  {...this.props} />
                <ActiveReports {...this.props} />
            </div>
        );
    }
}

