import React from 'react';

export default class MasonryCard extends React.Component {
    constructor() {
        super();
        this.state = { 
            dataMasonry: {
                "itemSelector": ".grid-item",
                "columnWidth": 230,
                "isFitWidth": true,
            } 
        }
    }

    getDataMasonry() {
        const { dataMasonry } = this.state;
    }

    render() {
        // getDataMasonry();
        return (
            <div 
                className="grid" 
                data-masonry={this.state.dataMasonry}>
                Card
            </div>
        );
    }
}


// Todo: make a React MasonryCard component using the masonry grid.
