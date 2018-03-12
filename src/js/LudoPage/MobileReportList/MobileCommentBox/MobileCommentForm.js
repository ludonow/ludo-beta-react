import React, { Component } from 'react';
import styled from 'styled-components';
import Textarea from 'react-textarea-autosize';

import axios from '../../../axios-config';

// styled components
const AvatarWrapper = styled.div`
    img.avatar-container__photo {
        height: 43px;
        width: 43px;
    }
`;

class MobileCommentForm extends Component {
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
                'ludo_id': this.props.ludoId,
                'report_id': this.props.reportId,
                'type': 'report'
            };
            axios.post('/apis/comment', commentPost)
            .then((response) => {
                if (response.data.status === '200') {
                    this.props.updateTempCommentListAfterPost(response.data.comment.comments);
                    this.props.handleShouldReportUpdate(true);
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
        /* components/_comment.scss */
        return (
            <div className="single-comment-container">
                <AvatarWrapper className="avatar-container">
                    <img
                        className="avatar-container__photo"
                        src={this.props.userBasicData.photo}
                    />
                </AvatarWrapper>
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

export default MobileCommentForm;
