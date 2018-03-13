import React, { Component } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';

import axios from '../../../axios-config';
import { baseUrl } from '../../../baseurl-config';

import CommentForm from './CommentForm';
import CommentList from './CommentList';

const LoginButtonWrapper = styled.div`
    padding: 8px 0;
    text-align: center;
`;

const LoginButton = () => (
    <LoginButtonWrapper>
        <Link to={`${baseUrl}/login`}>
            登入後即可留言
        </Link>
    </LoginButtonWrapper>
);

class CommentBox extends Component {
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
}

export default CommentBox;