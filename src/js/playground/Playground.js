import React from 'react';

import PlaygroundLudoList from './PlaygroundLudoList';

export default class Playground extends React.Component {
    render() {
        return (
            <div className="main-container">
                <PlaygroundLudoList {...this.props}/>
            </div>
        );
    }
}