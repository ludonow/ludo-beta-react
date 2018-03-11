import React, { Component } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';

import axios from '../../../axios-config';
import { baseUrl } from '../../../baseurl-config';
import MobileCommentForm from './MobileCommentForm';
import MobileCommentList from './MobileCommentList/index';

const LoginButtonWrapper = styled.div`
    padding: 8px 0;
    text-align: center;
    background-color: white;
`;

const LoginButton = () => (
    <LoginButtonWrapper>
        <Link to={`${baseUrl}/login`}>
            登入後即可留言
        </Link>
    </LoginButtonWrapper>
);

class MobileCommentBox extends Component {
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
        const {
            commentListFromDatabase,
            currentUserId,
            handleDenounceBoxOpen,
            handleShouldReportUpdate,
            reportId,
            router_currentFormValue,
            router_currentLudoId,
            userBasicData
        } = this.props;
        return (
            /* components/_single-report.scss */
            <div className="player-report-comment-box-container">
                {router_currentFormValue ?
                    <MobileCommentList
                        commentsNick={router_currentFormValue.comments_nick}
                        commentListFromDatabase={commentListFromDatabase}
                        currentUserId={currentUserId}
                        getCommentListAfterEdit={this.getCommentListAfterEdit}
                        handleDenounceBoxOpen={handleDenounceBoxOpen}
                        handleShouldReportUpdate={handleShouldReportUpdate}
                        reportId={reportId}
                        shouldShowCommentListFromDatabase={shouldShowCommentListFromDatabase}
                        tempCommentList={tempCommentList}
                        updateTempCommentListAfterPost={this.updateTempCommentListAfterPost}
                        userBasicData={userBasicData}
                    />
                    : null
                }
                {
                    currentUserId ?
                        <MobileCommentForm
                            currentUserId={currentUserId}
                            handleShouldReportUpdate={handleShouldReportUpdate}
                            ludoId={router_currentFormValue.ludo_id}
                            reportId={reportId}
                            updateTempCommentList={this.updateTempCommentList}
                            updateTempCommentListAfterPost={this.updateTempCommentListAfterPost}
                            userBasicData={userBasicData}
                        />
                    :
                        <LoginButton />
                }
            </div>
        );
    }
}

export default MobileCommentBox;
