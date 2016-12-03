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
            shouldShowCommentListFromDatabase: true,
            tempCommentList: []
        };
        this.showCommentListFromDataBase = this.showCommentListFromDataBase.bind(this);
        this.updateTempCommentList = this.updateTempCommentList.bind(this);
        this.updateTempCommentListAfterPost = this.updateTempCommentListAfterPost.bind(this);
    }

    showCommentListFromDataBase() {
        this.setState({
            shouldShowCommentListFromDatabase: true
        });
    }

    updateTempCommentList(commentContent) {
        const commentObject = {};
        commentObject.content = commentContent;;
        const { tempCommentList } = this.state;
        tempCommentList.push(commentObject);
        this.setState({
            tempCommentList
        });
    }

    updateTempCommentListAfterPost(updatedCommentList) {
        this.setState({
            shouldShowCommentListFromDatabase: false,
            tempCommentList: updatedCommentList
        });
    }

    render() {
        const { shouldShowCommentListFromDatabase, tempCommentList } = this.state; 
        return (
            /* components/_single-report.scss */
            <div className="player-report-comment-box-container">
                <CommentList
                    showCommentListFromDataBase={this.showCommentListFromDataBase}
                    shouldShowCommentListFromDatabase={shouldShowCommentListFromDatabase}
                    tempCommentList={tempCommentList}
                    {...this.props} 
                />
                <CommentForm 
                    updateTempCommentList={this.updateTempCommentList}
                    updateTempCommentListAfterPost={this.updateTempCommentListAfterPost}
                    {...this.props} 
                />
            </div>
        );
    }
};

