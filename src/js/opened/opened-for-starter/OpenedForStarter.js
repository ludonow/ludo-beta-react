import React from 'react';

import LudoList from '../../app/LudoList';
import OpenedFormOfStarter from './OpenedFormOfStarter';

export default class OpenedForStarter extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.currentFormValue.category_id == 0) {
            const { ludoId } = this.params;
            getCurrentLudoData(ludoId);
        }
    }

    render() {
        return (
            <div className="main-container">
                <OpenedFormOfStarter {...this.props} />
                <LudoList {...this.props} />
            </div>
        );
    }
};