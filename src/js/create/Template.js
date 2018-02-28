import React from 'react';
import MediaQuery from 'react-responsive';

import CreateStepper from './CreateStepper/index';
import MobileCreateCard from './mobile-create-card/MobileCreateCard';

/* components/_form.scss */
const Template = (props) => (
    <div>
        <MediaQuery
            className="form-and-list"
            minWidth={769}
        >
            <CreateStepper
                currentUserId={props.currentUserId}
                getUserBasicData={props.getUserBasicData}
                handleShouldProfileUpdate={props.handleShouldProfileUpdate}
                ludoId={props.params.ludo_id}
            />
        </MediaQuery>
        <MediaQuery maxWidth={768}>
            <MobileCreateCard {...props} />
        </MediaQuery>
    </div>
);

export default Template;
