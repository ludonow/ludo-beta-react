import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Popover from 'material-ui/Popover';
import Textarea from 'react-textarea-autosize';

import axios from '../../../axios-config';
import {
    animalImageList,
    colorList,
} from '../../../assets/avatarImage';
import Avatar from '../../../components/Avatar';
import CommentEditButton from './CommentEditButton';
import CommentExpandMoreButton from './CommentExpandMoreButton';

let animalIndex = 0;
let colorIndex = 0;

class CommentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: {},
            currentTargetId: '',
            isDenounceBoxOpen: false,
            isEditingComment: false,
            isEditingCommentIndex: [],
            isPopOverOfEditOpen: false,
            isPopOverOfExpandMoreOpen: false,
            commentTextContent: ''
        };
        this.handleCommentDelete = this.handleCommentDelete.bind(this);
        this.handleCommentEditButtonTouchTap = this.handleCommentEditButtonTouchTap.bind(this);
        this.handleCommentExpandMoreButtonTouchTap = this.handleCommentExpandMoreButtonTouchTap.bind(this);
        this.handleCommentTextChange = this.handleCommentTextChange.bind(this);
        this.handleCommentTextEdit = this.handleCommentTextEdit.bind(this);
        this.handleFinishCommentTextEdit = this.handleFinishCommentTextEdit.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
    }

    handleCommentDelete(event) {
        /* This prevents ghost click. */
        event.preventDefault();
        this.setState({
            isPopOverOfEditOpen: false,
            isPopOverOfExpandMoreOpen: false
        });
        const isSureToDelelteComment = window.confirm(`確定要刪除留言嗎？(刪除後不可復原)`);
        if (isSureToDelelteComment) {
            const { isEditingCommentIndex } = this.state;
            const isOldOrNew = isEditingCommentIndex[0].slice(0, 1);
            const atWhatPositionInArray = Number(isEditingCommentIndex[0].slice(1));
            let comment_id = null;
            if (isOldOrNew === 'o') {
                comment_id = this.props.commentListFromDatabase[atWhatPositionInArray].comment_id;
            } else if (isOldOrNew === 'n') {
                comment_id = this.props.tempCommentList[atWhatPositionInArray].comment_id;
            } else {
                console.error('isOldOrNew error');
            }
            if (comment_id) {
                axios.delete(`apis/comment/report/${this.props.reportId}/${comment_id}`)
                .then((response) => {
                    if(response.data.status === '200') {
                        this.props.updateTempCommentListAfterPost(response.data.comment);
                    } else {
                        console.error('CommentList handleCommentDelete else response: ', response);
                        console.error('CommentList handleCommentDelete else message: ', response.data.message);
                        window.alert('刪除留言時發生錯誤，請重試一次；若問題依然發生，請聯絡開發團隊');
                    }
                })
                .catch((error) => {
                    console.error('CommentList handleCommentDelete error: ', error);
                    window.alert('刪除留言時發生錯誤，請重試一次；若問題依然發生，請聯絡開發團隊');
                });
            }
        }
    }

    handleCommentEditButtonTouchTap(event) {
        /* This prevents ghost click. */
        event.preventDefault();
        const { id } = event.currentTarget;
        const arrayOfSplitIdString = id.split('-');
        const isOldOrNew = arrayOfSplitIdString[0].slice(0,1);
        const atWhatPositionInArray = arrayOfSplitIdString[arrayOfSplitIdString.length - 1];
        const element = isOldOrNew + atWhatPositionInArray;
        const isEditingCommentIndex = [];
        isEditingCommentIndex.push(element);
        this.setState({
            anchorEl: event.currentTarget,
            isEditingCommentIndex,
            isPopOverOfEditOpen: true
        });
    }

    handleCommentExpandMoreButtonTouchTap(event) {
        /* This prevents ghost click. */
        event.preventDefault();
        const { id } = event.currentTarget;
        const arrayOfSplitIdString = id.split('-');
        const isOldOrNew = arrayOfSplitIdString[0].slice(0,1);
        const atWhatPositionInArray = arrayOfSplitIdString[arrayOfSplitIdString.length - 1];
        const element = isOldOrNew + atWhatPositionInArray;
        const isEditingCommentIndex = [];
        isEditingCommentIndex.push(element);
        this.setState({
            anchorEl: event.currentTarget,
            isEditingCommentIndex,
            isPopOverOfExpandMoreOpen: true
        });
    }

    handleCommentTextChange(event) {
        this.setState({commentTextContent: event.currentTarget.value});
    }

    handleCommentTextEdit(event) {
        /* This prevents ghost click. */
        event.preventDefault();
        this.setState({
            isEditingComment: true,
            isPopOverOfEditOpen: false
        });
    }

    handleFinishCommentTextEdit(event) {
        if (event.keyCode == 13 && !event.shiftKey) {
            event.preventDefault();
            /* send put request to server to modify text report content */
            const { id } = event.currentTarget;
            const arrayOfSplitIdString = id.split('-');
            const isOldOrNew = arrayOfSplitIdString[0].slice(0, 1);
            const atWhatPositionInArray = arrayOfSplitIdString[arrayOfSplitIdString.length - 1];
            const { commentTextContent } = this.state;
            if (commentTextContent && commentTextContent !== event.currentTarget.defaultValue) {
                const commentModifyPutBody = {
                    'content': commentTextContent,
                    'report_id': this.props.reportId,
                    'type': 'report'
                };
                this.setState({
                    commentTextContent: ''
                });
                let comment_id = null;
                if (isOldOrNew === 'o') {
                    comment_id = this.props.commentListFromDatabase[atWhatPositionInArray].comment_id;
                } else if (isOldOrNew === 'n') {
                    comment_id = this.props.tempCommentList[atWhatPositionInArray].comment_id;
                } else {
                    console.error('isOldOrNew is not "o" or "n"');
                }
                if (comment_id) {
                    axios.put(`apis/comment/${comment_id}`, commentModifyPutBody)
                    .then((response) => {
                        if(response.data.status === '200') {
                            this.props.handleShouldReportUpdate(true);
                            this.props.getCommentListAfterEdit();
                            this.setState({
                                isEditingComment: false
                            });
                        } else {
                            console.error('CommentList handleFinishCommentTextEdit else response: ', response);
                            console.error('CommentList handleFinishCommentTextEdit else message: ', message);
                            window.alert('編輯留言時發生錯誤，請重試一次；若問題依然發生，請聯絡開發團隊');
                            this.setState({
                                isEditingComment: false
                            });
                        }
                    })
                    .catch((error) => {
                        console.error('CommentList handleFinishCommentTextEdit error: ', error);
                        window.alert('編輯留言時發生錯誤，請重試一次；若問題依然發生，請聯絡開發團隊');
                        this.setState({
                            isEditingComment: false
                        });
                    });
                }
            }
            /*
             * transfer the text report to the original display instead of textarea
             * by taking the element out of editing text array
             */
            const commentIndex = isOldOrNew + atWhatPositionInArray;
            const { isEditingCommentIndex } = this.state;
            const indexAtWhatPositionInArray = isEditingCommentIndex.indexOf(commentIndex);
            const isInEditingArray = (indexAtWhatPositionInArray != -1);
            if (isInEditingArray) {
                isEditingCommentIndex.splice(indexAtWhatPositionInArray, 1);
                this.setState({
                    isEditingCommentIndex,
                    isEditingComment: false
                });
            } else {
                console.error('comment text edit index isInEditingArray error');
            }
        }
    }

    handleRequestClose() {
        this.setState({
            isPopOverOfEditOpen: false,
            isPopOverOfExpandMoreOpen: false
        });
    }

    render() {
        const {
            commentListFromDatabase,
            commentsNick,
            currentUserId,
            handleDenounceBoxOpen,
            isMyReport,
            reportId,
            shouldShowCommentListFromDatabase,
            userPhotoUrl,
            tempCommentList,
        } = this.props;

        const {
            anchorEl,
            isEditingComment,
            isEditingCommentIndex,
            isPopOverOfEditOpen,
            isPopOverOfExpandMoreOpen,
        } = this.state;

        return (
            /* components/_comment.scss */
            <div className="comment-list">
                {
                    /* display temp comments right after user create a new comment */
                    commentListFromDatabase
                    && shouldShowCommentListFromDatabase
                    && commentsNick
                    ?
                        commentListFromDatabase.map((commentObject, index) => {
                            animalIndex = commentsNick[commentObject.user_id][0];
                            colorIndex = commentsNick[commentObject.user_id][1];
                            return (
                                <div
                                    className="single-comment-container"
                                    key={`comment-${index}`}
                                >
                                    <div className="comment-avatar-container">
                                        <Avatar
                                            avatarBackgroundColorIndex={colorIndex}
                                            avatarImageIndex={animalIndex}
                                            isThisBelongToCurrentUser={commentObject.user_id === currentUserId}
                                            usedInComments={true}
                                            userPhotoUrl={userPhotoUrl}
                                        />
                                    </div>
                                    <div className="comment__message">
                                        {
                                            isEditingComment && isEditingCommentIndex.indexOf(`o${index}`) != -1 ?
                                                <Textarea
                                                    className="report-content__text-edit"
                                                    defaultValue={commentObject.content}
                                                    id={`old-${index}`}
                                                    minRows={2}
                                                    onChange={this.handleCommentTextChange}
                                                    onKeyDown={this.handleFinishCommentTextEdit}
                                                />
                                            :
                                                commentObject.content
                                        }
                                    </div>
                                    {
                                        commentObject.user_id === currentUserId ?
                                            <CommentEditButton
                                                anchorEl={anchorEl}
                                                commentId={commentObject.comment_id}
                                                handleCommentDelete={this.handleCommentDelete}
                                                handleCommentEditButtonTouchTap={this.handleCommentEditButtonTouchTap}
                                                handleCommentTextEdit={this.handleCommentTextEdit}
                                                handleRequestClose={this.handleRequestClose}
                                                index={index}
                                                isPopOverOfEditOpen={isPopOverOfEditOpen}
                                                isOldOrNew="old"
                                            />
                                        :
                                            <CommentExpandMoreButton
                                                anchorEl={anchorEl}
                                                commentId={commentObject.comment_id}
                                                handleCommentExpandMoreButtonTouchTap={this.handleCommentExpandMoreButtonTouchTap}
                                                handleDenounceBoxOpen={handleDenounceBoxOpen}
                                                handleRequestClose={this.handleRequestClose}
                                                index={index}
                                                isPopOverOfExpandMoreOpen={isPopOverOfExpandMoreOpen}
                                                isOldOrNew="old"
                                                reportId={reportId}
                                            />
                                    }
                                </div>
                            );
                        })
                    : null
                }
                {
                    /* show temp comments right after user create a new comment */
                    tempCommentList
                    && !(shouldShowCommentListFromDatabase)
                    && commentsNick
                    ?
                        tempCommentList.map((commentObject, index) => {
                            animalIndex = commentsNick[commentObject.user_id][0];
                            colorIndex = commentsNick[commentObject.user_id][1];
                            return (
                                <div
                                    className="single-comment-container"
                                    key={`new-comment-${index}`}
                                >
                                    <div className="comment-avatar-container">
                                        <Avatar
                                            avatarBackgroundColorIndex={colorIndex}
                                            avatarImageIndex={animalIndex}
                                            isThisBelongToCurrentUser={commentObject.user_id === currentUserId}
                                            usedInComments={true}
                                            userPhotoUrl={userPhotoUrl}
                                        />
                                    </div>
                                    <div className="comment__message">
                                        {
                                            isEditingComment && isEditingCommentIndex.indexOf(`n${index}`) != -1 ?
                                                <Textarea
                                                    className="report-content__text-edit"
                                                    defaultValue={commentObject.content}
                                                    id={`new-${index}`}
                                                    minRows={2}
                                                    onChange={this.handleCommentTextChange}
                                                    onKeyDown={this.handleFinishCommentTextEdit}
                                                />
                                            :
                                                commentObject.content
                                        }
                                    </div>
                                    {
                                        commentObject.user_id === currentUserId ?
                                            <CommentEditButton
                                                anchorEl={anchorEl}
                                                commentId={commentObject.comment_id}
                                                handleCommentDelete={this.handleCommentDelete}
                                                handleCommentEditButtonTouchTap={this.handleCommentEditButtonTouchTap}
                                                handleCommentTextEdit={this.handleCommentTextEdit}
                                                handleRequestClose={this.handleRequestClose}
                                                index={index}
                                                isPopOverOfEditOpen={isPopOverOfEditOpen}
                                                isOldOrNew="new"
                                            />
                                        :
                                            <CommentExpandMoreButton
                                                anchorEl={anchorEl}
                                                commentId={commentObject.comment_id}
                                                handleCommentExpandMoreButtonTouchTap={this.handleCommentExpandMoreButtonTouchTap}
                                                handleDenounceBoxOpen={handleDenounceBoxOpen}
                                                handleRequestClose={this.handleRequestClose}
                                                index={index}
                                                isPopOverOfExpandMoreOpen={isPopOverOfExpandMoreOpen}
                                                isOldOrNew="new"
                                                reportId={reportId}
                                            />
                                    }
                                </div>
                            )
                        })
                    : null
                }
            </div>
        );
    }
}

CommentList.propTypes = {
    commentListFromDatabase: PropTypes.array,
    commentsNick: PropTypes.object.isRequired,
    currentUserId: PropTypes.string.isRequired,
    getCommentListAfterEdit: PropTypes.func.isRequired,
    handleDenounceBoxOpen: PropTypes.func.isRequired,
    handleShouldReportUpdate: PropTypes.func.isRequired,
    isMyReport: PropTypes.bool.isRequired,
    reportId: PropTypes.string.isRequired,
    shouldShowCommentListFromDatabase: PropTypes.bool.isRequired,
    tempCommentList: PropTypes.array.isRequired,
    updateTempCommentListAfterPost: PropTypes.func.isRequired,
    userPhotoUrl: PropTypes.string,
};

export default CommentList;
