import React from 'react';
import Masonry from 'react-masonry-component';
import axios from 'axios';

import MatchedContent from './MatchedContent';

const masonryOptions = {
    itemSelector: ".grid-item",
    columnWidth: 236,
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
                            <div>launch day: {data.launch_day}</div>
                            <div>duration: {data.duration}</div>
                            <div>marbles: {data.marbles}</div>
                            <div>tags: {data.tags}</div>
                            <div>
                                {data.start_day ? `${data.start_day} ~ ${data.end_day}` : null}
                            </div>
                        </div>
                        <div className="card-bottom">
                            <div>starter: {data.starter}</div>
                            <div>stage: {data.stage}</div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    render() {
        this.addMasonryClass()
        return (
            <Masonry
                className="grid"
                options={masonryOptions} >
                <MatchedContent />
                {this.state.masonryCardContent}
            </Masonry>
        );
    }
}