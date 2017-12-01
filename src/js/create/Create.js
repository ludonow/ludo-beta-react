import React from 'react';
import MediaQuery from 'react-responsive';

import CreateForm from './CreateForm';
import MobileCreateCard from './mobile-create-card/MobileCreateCard';

/* components/_form.scss */
const Create = (props) => (
    <div>
        <MediaQuery minDeviceWidth={768} className="form-and-list">
            <CreateForm {...props} />
        </MediaQuery>
        <MediaQuery maxDeviceWidth={768}>
            <MobileCreateCard {...props} />
        </MediaQuery>
    </div>
);

export default Create;
