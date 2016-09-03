import React from 'react';

import CreateForm from './CreateForm';

export default class CreateContent extends React.Component {
    render() {
        return (
            <div className="grid-item grid-item--half">
                <div className="create-form">
                    <CreateForm />
                </div>
            </div>
        );
    }
}