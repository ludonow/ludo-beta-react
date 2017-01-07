import React from 'react';

import TemplateForm from './TemplateForm';
import LudoList from '../app/LudoList';

export default class Template extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            /* components/_form.scss */
            <div className="form-and-list">
                <div className="form">
                    <TemplateForm {...this.props} />
                </div>
                <div className="form-ludo-list-container">
                    <LudoList {...this.props} />
                </div>
            </div>
        );
    }
}