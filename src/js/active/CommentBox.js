import React, { Component } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';

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

const LoginButtonWrapper = styled.div`
    padding: 8px 0;
    text-align: center;
`;

const LoginButton = () => (
    <LoginButtonWrapper>
        <Link to="/login">
            登入後即可留言
        </Link>
    </LoginButtonWrapper>
);

export default class CommentBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shouldShowCommentListFromDatabase: true,
            tempCommentList: []
        };
        this.getCommentListAfterEdit = this.getCommentListAfterEdit.bind(this);
        this.updateTempCommentList = this.updateTempCommentList.bind(this);
        this.updateTempCommentListAfterPost = this.updateTempCommentListAfterPost.bind(this);
    }

    getCommentListAfterEdit() {
        this.setState({
            shouldShowCommentListFromDatabase: true
        });
    }

    updateTempCommentList(commentContent) {
        const commentObject = [{content: ''}];
        commentObject[0].content = commentContent;
        const tempCommentList = [];
        tempCommentList.push.apply(tempCommentList, this.props.commentListFromDatabase);
        tempCommentList.push.apply(tempCommentList, commentObject);
        this.setState({
            tempCommentList
        });
    }

    updateTempCommentListAfterPost(updatedCommentsArray) {
        this.setState({
            shouldShowCommentListFromDatabase: false,
            tempCommentList: updatedCommentsArray
        });
    }

    render() {
        const { shouldShowCommentListFromDatabase, tempCommentList } = this.state;
        return (
            /* components/_single-report.scss */
            <div className="player-report-comment-box-container">
                <CommentList
                    getCommentListAfterEdit={this.getCommentListAfterEdit}
                    shouldShowCommentListFromDatabase={shouldShowCommentListFromDatabase}
                    tempCommentList={tempCommentList}
                    updateTempCommentListAfterPost={this.updateTempCommentListAfterPost}
                    {...this.props}
                />
                {
                    this.props.currentUserId ?
                        <CommentForm
                            updateTempCommentList={this.updateTempCommentList}
                            updateTempCommentListAfterPost={this.updateTempCommentListAfterPost}
                            {...this.props}
                        />
                    :
                        <LoginButton />
                }
            </div>
        );
    }
};
