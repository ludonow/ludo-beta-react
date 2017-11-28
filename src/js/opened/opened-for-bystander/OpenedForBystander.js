import React from 'react';
import MediaQuery from 'react-responsive';

import LudoList from '../../app/LudoList';
import MobileOpenedLudo from '../MobileOpenedLudo';
import OpenedBystanderForm from './OpenedBystanderForm';

/* components/_form.scss */
const OpenedForBystander = (props) => (
    <div>
        <MediaQuery minDeviceWidth={768} className="form-and-report">
            <OpenedBystanderForm {...props} />
            <div className="form-ludo-list-container">
                <LudoList {...props} />
            </div>
        </MediaQuery>
        <MediaQuery maxDeviceWidth={768}>
            <MobileOpenedLudo {...props} />
        </MediaQuery>
    </div>
);

export default OpenedForBystander;
