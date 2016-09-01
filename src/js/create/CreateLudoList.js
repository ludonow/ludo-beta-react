import React from 'react';
import { Link } from "react-router";
import Masonry from 'react-masonry-component';
import axios from 'axios';

import CreateContent from './CreateContent';
import Matched from '../matched/Matched';

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
                    <Link to="Matched" className="remove-hyperlink-style">
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
                    </Link>
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
                <CreateContent />
                {this.state.masonryCardContent}
            </Masonry>
        );
    }
}