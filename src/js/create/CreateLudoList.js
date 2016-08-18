import React from 'react';
import Masonry from 'react-masonry-component';
import axios from 'axios';

import CreateContent from './CreateContent';

const masonryOptions = {
    itemSelector: ".grid-item",
    columnWidth: 290,
    fitWidth: true
}

export default class CreateLudoList extends React.Component {
    constructor() {
        super();
        this.state = { 
            rawCardContent: [],
            masonryCardContent: []
        };
    }

    componentDidMount() {
        this.getCardContent();
    }

    componentWillUnmount() {
        // this.serverRequest.abort();
    }

    getCardContent() {
        const _this = this;

        this.serverRequest = axios.get('data/LudoData.json')
            .then(function (response) {
                _this.setState({
                    rawCardContent: response.data
                });
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    addMasonryClass() {
        this.state.masonryCardContent = this.state.rawCardContent.map( (data, index) => {
            return (
                <div className="grid-item" key={index}>
                    <div className="card">
                        <div>{data.launchDate}</div>
                        <div>{data.type}</div>
                        <div>{data.duration}</div>
                        <div>{data.introduction}</div>
                        <div>{data.condition}</div>
                        <div>{data.marblesNumber}</div>
                    </div>
                </div>
            )
        })
    }

    render() {
        this.addMasonryClass()
        return (
            <Masonry
                options={masonryOptions}
                updateOnEachImageLoad={true} >
                <CreateContent />
                {this.state.masonryCardContent}
            </Masonry>
        );
    }
}