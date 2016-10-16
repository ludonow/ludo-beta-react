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

import CommentForm from './CommentForm';
import CommentList from './CommentList';

export default class CommentBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAfterPost: false,
            newCommentList: []
        };
        this.updateNewCommentList = this.updateNewCommentList.bind(this);
        this.updateNewCommentListAfterPost = this.updateNewCommentListAfterPost.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.oldCommentList.length !== this.props.oldCommentList.length) {
            console.log('CommentBox componentWillReceiveProps  length different');
            console.log('this.props.oldCommentList', this.props.oldCommentList);
        }
    }

    updateNewCommentList(commentContent) {
        const commentObject = {};
        commentObject.content = commentContent;;
        const { newCommentList } = this.state;
        newCommentList.push(commentObject);
        this.setState({
            newCommentList
        });
    }

    updateNewCommentListAfterPost(updatedCommentList) {
        this.setState({
            isAfterPost: true,
            newCommentList: updatedCommentList
        });
    }

    render() {
        const { isAfterPost, newCommentList } = this.state; 
        return (
            <div className="player-report-comment-box-container">
                <CommentList
                    newCommentList={newCommentList}
                    isAfterPost={isAfterPost}
                    {...this.props} 
                />
                <CommentForm 
                    updateNewCommentList={this.updateNewCommentList}
                    updateNewCommentListAfterPost={this.updateNewCommentListAfterPost}
                    {...this.props} 
                />
            </div>
        );
    }
};

