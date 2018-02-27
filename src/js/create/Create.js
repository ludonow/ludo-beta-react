import React from 'react';
import MediaQuery from 'react-responsive';

import CreateStepper from './CreateStepper/index';
import MobileCreateCard from './mobile-create-card/MobileCreateCard';

/* components/_form.scss */
const Create = (props) => (
    <div>
        <MediaQuery minDeviceWidth={768} className="form-and-list">
            <CreateStepper
                getUserBasicData={props.getUserBasicData}
                handleShouldProfileUpdate={props.handleShouldProfileUpdate}
            />
        </MediaQuery>
        <MediaQuery maxDeviceWidth={768}>
            <MobileCreateCard {...props} />
        </MediaQuery>
    </div>
);

export default Create;
