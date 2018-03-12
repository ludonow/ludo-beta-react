import React, { Component } from 'react';
import Textarea from 'react-textarea-autosize';

import axios from '../../../axios-config';

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentContent: null
        };
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    }

    handleCommentSubmit(event) {
        if (event.keyCode == 13 && !event.shiftKey) {
            event.preventDefault();
            const commentContent = event.target.value;
            this.setState({
                commentContent
            });
            this.props.updateTempCommentList(commentContent);

            const commentPost = {
                'content': commentContent,
                'ludo_id': this.props.router_currentLudoId,
                'report_id': this.props.reportId,
                'type': 'report'
            };
            axios.post('/apis/comment', commentPost)
            .then((response) => {
                if (response.data.status === '200') {
                    this.props.updateTempCommentListAfterPost(response.data.comment.comments);
                } else {
                    console.error('CommentForm post response from server: ', response);
                    console.error('CommentForm post message from server: ', response.data.message);
                }
            })
            .catch((error) => {
                console.error('CommentForm post error', error);
            });
            /* clear the text area of comment form */
            event.target.value = null;
            this.setState({
                commentContent: null
            });
        }
    }

    render() {
        return (
            /* components/_comment.scss */
            <div className="single-comment-container">
                <div className="comment-avatar-container">
                    {
                        /* show user's photo */
                        this.props.currentUserId ?
                            <img
                                className="comment__avatar"
                                src={this.props.userBasicData.photo}
                            />
                        :
                            <img
                                className="comment__avatar"
                                src="https://api.fnkr.net/testimg/350x200/00CED1/FFF/?text=img+placeholder"
                            />
                    }
                </div>
                <Textarea
                    className="comment__message"
                    minRows={2}
                    onKeyDown={this.handleCommentSubmit}
                    placeholder="留言..."
                />
            </div>
        );
    }
}

export default CommentForm;
