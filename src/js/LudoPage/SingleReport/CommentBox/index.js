import React, { Component } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';

import axios from '../../../axios-config';
import { baseUrl } from '../../../baseurl-config';
import { withEither } from '../../../components/higher-order-components/index';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

const CommentBoxWrapper = styled.div`
    bottom: 0;
    position: relative;
    width: 100%;
`;

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

const isUserNotLoggedIn = (props) => !props.currentUserId;
const CommentFormWithNotLogin = withEither(isUserNotLoggedIn, LoginButton)(CommentForm);

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
        const {
            commentListFromDatabase,
            commentsNick,
            currentLudoId,
            currentUserId,
            handleDenounceBoxOpen,
            handleShouldReportUpdate,
            isMyReport,
            reportId,
            userPhotoUrl,
        } = this.props;

        const {
            shouldShowCommentListFromDatabase,
            tempCommentList,
        } = this.state;

        return (
            <CommentBoxWrapper>
                <CommentList
                    commentListFromDatabase={commentListFromDatabase}
                    commentsNick={commentsNick}
                    currentUserId={currentUserId}
                    getCommentListAfterEdit={this.getCommentListAfterEdit}
                    handleDenounceBoxOpen={handleDenounceBoxOpen}
                    handleShouldReportUpdate={handleShouldReportUpdate}
                    isMyReport={isMyReport}
                    reportId={reportId}
                    shouldShowCommentListFromDatabase={shouldShowCommentListFromDatabase}
                    tempCommentList={tempCommentList}
                    updateTempCommentListAfterPost={this.updateTempCommentListAfterPost}
                    userPhotoUrl={userPhotoUrl}
                />
                <CommentFormWithNotLogin
                    currentLudoId={currentLudoId}
                    currentUserId={currentUserId}
                    reportId={reportId}
                    updateTempCommentList={this.updateTempCommentList}
                    updateTempCommentListAfterPost={this.updateTempCommentListAfterPost}
                    userPhotoUrl={userPhotoUrl}
                />
            </CommentBoxWrapper>
        );
    }
}

export default CommentBox;
