import React from 'react';
import axios from 'axios';

const masonryOptions = {
    itemSelector: ".grid-item--ludo-report-information",
    columnWidth: 220,
    fitWidth: true,
    stamp: ".grid-item--ludo-detail-information"
};

export default class ActiveReports extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getLudoReportInformation();
    }

    getLudoReportInformation() {
        const _this = this;

        // this.serverRequest = axios.get('/apis/ludo?stage=1')
        //     .then(function (response) {
        //         _this.setState({
        //             rawCardContent: response.data.ludoList.Items
        //         });
        //     })
        //     .catch(function(error) {
        //         console.log(error);
        //     });
        // this.serverRequest = axios.get('data/LudoData.json')
        //     .then(function (response) {
        //         _this.setState({
        //             rawCardContent: response.data
        //         });
        //     })
        //     .catch(function(error) {
        //         console.log(error);
        //     });
    }

    handleMessageSubmit() {
        console.log('message');
    }

    render() {
        return (
            <div className="report-list-container">
                <div className="card player-container">
                    <div className="player-photo-container">
                        <div className="player-photo-container__photo">
                        </div>
                    </div>
                    <div className="player-report-container">
                        <div className="report-image">
                            Report image
                        </div>
                        <div className="report-text">
                            Report text
                        </div>
                        <CommentForm />
                    </div>
                </div>
                <div className="card player-container">
                    <div className="player-photo-container">
                        <div className="player-photo-container__photo">
                        </div>
                    </div>
                    <div className="player-report-container">
                        <div className="report-image">
                            Report image
                        </div>
                        <div className="report-text">
                            Report text
                        </div>
                        <CommentForm />
                    </div>
                </div>
            </div>
        );
    }
};

class CommentForm extends React.Component {
    render() {
        return (
            <div className="player-report-comment-box-container">
                <textarea placeholder="Leave your message here" onChange={this.handleMessageSubmit} />
            </div>
        );
    }
};

class CommentList extends React.Component {
    render() {
        return (
            <div>
                commentlist
            </div>
        );
    }
};