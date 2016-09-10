import React from 'react';

import CreateLudoList from './CreateLudoList';

export default class Create extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <CreateLudoList {...this.props} />
        );
    }
}

