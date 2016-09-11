import React from 'react';

import OpenedLudoList from './OpenedLudoList';

export default class Create extends React.Component {
    render() {
        return (
            <OpenedLudoList {...this.props}/>
        );
    }
}

