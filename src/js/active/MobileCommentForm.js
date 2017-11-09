import React from 'react';
import axios from '../axios-config';

import IconButton from 'material-ui/IconButton';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Textarea from 'react-textarea-autosize';

export default class MobileCommentForm extends React.Component {
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
                'ludo_id': this.props.currentUserId,
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
        /* components/_comment.scss */
        return (
            <div className="single-comment-container">
                <div className="avatar-container">
                    <img
                        className="avatar-container__photo"
                        src={this.props.userBasicData.photo}
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
};
