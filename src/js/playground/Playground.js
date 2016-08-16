import React from 'react';
import Masonry from 'react-masonry-component';

import QuickStart from './QuickStart';
import PlaygroundLudoList from './PlaygroundLudoList';
import Search from '../app/Search';

const masonryOptions = {
    itemSelector: ".grid-item",
    columnWidth: ".grid-item",
    fitWidth: true
}

export default class Playground extends React.Component {
    render() {
        return (
            <Masonry
                className="playground"
                options={masonryOptions}
                updateOnEachImageLoad={true}>
                <QuickStart />
                <Search />
                <PlaygroundLudoList />
            </Masonry>
        );
    }
}