import React from 'react';
import axios from '../axios-config';
import Textarea from 'react-textarea-autosize';

export default class ActiveReports extends React.Component {
    constructor(props) {
        super(props);
        this.getLudoReportInformation = this.getLudoReportInformation.bind(this);
    }

    componentDidMount() {
        this.getLudoReportInformation();
    }

    getLudoReportInformation() {
        // axios.get('/apis/ludo?stage=1')
        //     .then(response => {
        //         this.setState({
        //             rawCardContent: response.data.ludoList.Items
        //         });
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });

        /* example data */
        // this.serverRequest = axios.get('data/LudoData.json')
        //     .then(response => {
        //         this.setState({
        //             rawCardContent: response.data
        //         });
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
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
                        <CommentBox />
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
                        <CommentBox />
                    </div>
                </div>
            </div>
        );
    }
};

class CommentBox extends React.Component {
    render() {
        return (
            <div className="player-report-comment-box-container">
                <CommentList />
                <CommentForm />
            </div>
        );
    }
};

class CommentForm extends React.Component {
    constructor() {
        super();
        this.state = {
            message: null
        };
        this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    }

    handleMessageSubmit(event) {
        if (event.keyCode == 13 && !event.shiftKey) {
            event.preventDefault();
            const { state } = this;
            this.setState(
                Object.assign(state, {
                    message: event.target.value
                })
            );
            console.log('state message', this.state.message);
            event.target.value = null;
            this.setState(
                Object.assign(state, {
                    message: null
                })
            );
        }
    }

    render() {
        return (
            <Textarea minRows={2} onKeyDown={this.handleMessageSubmit} placeholder="留言..."/>
        );
    }
}

class CommentList extends React.Component {
    render() {
        return (
            <div className="comment-list">
                commentlist
            </div>
        );
    }
};