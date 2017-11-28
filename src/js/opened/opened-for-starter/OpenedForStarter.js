import React from 'react';
import MediaQuery from 'react-responsive';

import LudoList from '../../app/LudoList';
import MobileOpenedLudo from '../MobileOpenedLudo';
import OpenedStarterForm from './OpenedStarterForm';

/* components/_form.scss */
const OpenedForStarter = (props) => (
    <div className="form-and-list">
        <MediaQuery minDeviceWidth={768} className="form-and-report">
            <OpenedStarterForm {...this.props} />
            <div className="form-ludo-list-container">
                <LudoList {...this.props} />
            </div>
        </MediaQuery>
        <MediaQuery maxDeviceWidth={768}>
            <MobileOpenedLudo {...this.props} />
        </MediaQuery>
    </div>
);

export default OpenedForStarter;
