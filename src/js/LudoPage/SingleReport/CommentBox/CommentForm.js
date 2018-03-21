import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Textarea from 'react-textarea-autosize';

import axios from '../../../axios-config';
import Avatar from '../../../components/Avatar';

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
            const {
                currentLudoId,
                reportId,
                updateTempCommentList,
                updateTempCommentListAfterPost,
            } = this.props;

            event.preventDefault();
            const commentContent = event.target.value;
            this.setState({
                commentContent
            });
            updateTempCommentList(commentContent);

            const commentPost = {
                'content': commentContent,
                'ludo_id': currentLudoId,
                'report_id': reportId,
                'type': 'report'
            };
            axios.post('/apis/comment', commentPost)
            .then((response) => {
                if (response.data.status === '200') {
                    updateTempCommentListAfterPost(response.data.comment.comments);
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
        const {
            userPhotoUrl,
        } = this.props;

        return (
            /* components/_comment.scss */
            <div className="single-comment-container">
                <div className="comment-avatar-container">
                    <Avatar
                        avatarBackgroundColorIndex={0}
                        avatarImageIndex={0}
                        isThisBelongToCurrentUser={true}
                        usedInComments={true}
                        userPhotoUrl={userPhotoUrl}
                    />
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

CommentForm.propTypes = {
    currentLudoId: PropTypes.string.isRequired,
    reportId: PropTypes.string.isRequired,
    updateTempCommentList: PropTypes.func.isRequired,
    updateTempCommentListAfterPost: PropTypes.func.isRequired,
    usePhotoUrl: PropTypes.string,
};

export default CommentForm;
