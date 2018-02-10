import React from 'react';

import PlaygroundLudoList from './PlaygroundLudoList';

export default class Playground extends React.Component {
    render() {
        return (
            <PlaygroundLudoList {...this.props}/>
        );
    }
}
