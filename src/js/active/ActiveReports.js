import React from 'react';
import axios from '../axios-config';
import Textarea from 'react-textarea-autosize';

export default class ActiveReports extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.handleIsOpeningActivePage(true);
        this.props.handleShouldReportUpdate(true);
    }

    componentWillUnmount() {
        this.props.handleIsOpeningActivePage(false);
    }

    render() {
        return (
            <div className="report-list-container">
                <div className="player-container">
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
                        <CommentBox {...this.props} />
                    </div>
                </div>
                <div className="player-container">
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
                        <CommentBox {...this.props} />
                    </div>
                </div>
            </div>
        );
    }
};

class CommentBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
        this.updateMessageList = this.updateMessageList.bind(this);
    }

    updateMessageList(message) {
        const { list } = this.state;
        list.push(message);
        this.setState(
            Object.assign(this.state, {
                list
            })
        )
    }

    render() {
        const { list } = this.state; 
        return (
            <div className="player-report-comment-box-container">
                <CommentList list={list} {...this.props} />
                <CommentForm updateMessageList={this.updateMessageList} {...this.props} />
            </div>
        );
    }
};

class CommentForm extends React.Component {
    constructor(props) {
        super(props);
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
            this.props.updateMessageList(state.message);

            // const commentPost = {
            //     'type': 'report',
            //     'report_id': ,
            //     'content': state.message
            // };
            // axios.post('/apis/comment', commentPost)
            // .then(response => {
            //     if(response.data.status == '200') {
            //         console.log('Successfully comment!');
            //         console.log('response', response);
            //     } else {
            //         console.log('get after comment message post message from server: ', response.data.message);
            //     }
            // })
            // .catch(error => {
            //     console.log('get after comment message post error', error);
            //     console.log('message from server: ', response.data.message);
            // })

            /* clear the text area of comment form */
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
            <div className="comment-container">
                <div className="comment-avatar-container">
                    <img className="comment__avatar" 
                        src="https://api.fnkr.net/testimg/350x200/00CED1/FFF/?text=img+placeholder" />
                </div>
                <Textarea className="comment__message"
                    minRows={2} onKeyDown={this.handleMessageSubmit} placeholder="留言..."/>
            </div>
        );
    }
}

class CommentList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="comment-list">
                {
                    this.props.list.map( (value, index) => {
                        return (
                            <div className="comment-container" key={`message-${index}`}>
                                <div className="comment-avatar-container">
                                    <img className="comment__avatar" src="https://api.fnkr.net/testimg/350x200/00CED1/FFF/?text=img+placeholder" />
                                </div>
                                <div className="comment__message">
                                    {value}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
};