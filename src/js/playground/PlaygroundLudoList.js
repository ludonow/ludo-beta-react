import React from 'react';
import Masonry from 'react-masonry-component';
import axios from 'axios';

import QuickStart from './QuickStart';

const masonryOptions = {
    itemSelector: ".grid-item",
    columnWidth: ".grid-item",
    fitWidth: true
}

export default class PlaygroundLudoList extends React.Component {
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
                        <div className="card-top">
                            <div>{data.title}</div>
                            <div>{data.duration} days</div>
                            <div>{data.marbles}</div>
                        </div>
                        <div className="card-bottom">
                            <div>{data.category_id}</div>
                            <div>{data.stage}</div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    render() {
        const { masonryCardContent } = this.state;
        this.addMasonryClass();
        return (
            <Masonry
                className="playground"
                options={masonryOptions} >
                <QuickStart />
                {masonryCardContent}
            </Masonry>
        );
    }
}