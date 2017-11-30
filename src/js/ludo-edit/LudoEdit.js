import React from 'react';

import LudoEditForm from './LudoEditForm';
import LudoList from '../app/LudoList';
import MobileOpenedLudo from '../opened/MobileOpenedLudo';

/* components/_form.scss */
const LudoEdit = (props) => (
    <div>
        <MediaQuery minDeviceWidth={768} className="form-and-report">
            <div className="form">
                <LudoEditForm {...props} />
            </div>
            <div className="form-ludo-list-container">
                <LudoList {...props} />
            </div>
        </MediaQuery>
        <MediaQuery maxDeviceWidth={768}>
            <MobileOpenedLudo {...props} starter />
        </MediaQuery>
    </div>
);

export default LudoEdit;
