import React, { Component } from 'react';
import MediaQuery from 'react-responsive';

import TemplateForm from './TemplateForm';
import LudoList from '../app/LudoList';
import MobileCreateCard from './mobile-create-card/MobileCreateCard';

/* components/_form.scss */
const Template = (props) => (
    <div>
        <MediaQuery minWidth={768} className="form-and-list">
            <div className="form">
                <TemplateForm {...props} />
            </div>
            <div className="form-ludo-list-container">
                <LudoList {...props} />
            </div>
        </MediaQuery>
        <MediaQuery maxWidth={768}>
            <MobileCreateCard {...props} />
        </MediaQuery>
    </div>
);

export default Template;
