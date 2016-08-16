import React from 'react';
import Masonry from 'react-masonry-component';
import axios from 'axios';

const masonryOptions = {
    itemSelector: ".grid-item",
    columnWidth: ".grid-item",
}

export default class PlaygroundLudoList extends React.Component {
    constructor() {
        super();
        this.state = { 
            cardContent: []
        }
    }

    componentDidMount() {
        this.getDifferentCardContent();
    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    getDifferentCardContent() {
        const _this = this;

        this.serverRequest = axios.get('LudoData.json')
            .then(function (response) {
                console.log(response)
                const mapCardContent = response.data.map( (data, index) => {
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
                    });

                _this.setState({
                    cardContent: mapCardContent
                });
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                {this.state.cardContent}
            </div>
        );
    }
}