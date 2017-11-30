import React from 'react';
import MediaQuery from 'react-responsive';

import LudoList from '../../app/LudoList';
import MobileOpenedLudo from '../MobileOpenedLudo';
import OpenedStarterForm from './OpenedStarterForm';

/* components/_form.scss */
const OpenedForStarter = (props) => (
    <div>
        <MediaQuery minDeviceWidth={768} className="form-and-report">
            <OpenedStarterForm {...props} />
            <div className="form-ludo-list-container">
                <LudoList {...props} />
            </div>
        </MediaQuery>
        <MediaQuery maxDeviceWidth={768}>
            <MobileOpenedLudo {...props} starter />
        </MediaQuery>
    </div>
);

export default OpenedForStarter;
