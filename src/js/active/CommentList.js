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

import CommentEditButton from './CommentEditButton';
import CommentExpandMoreButton from './CommentExpandMoreButton';

export default class CommentList extends React.Component {
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
            if(comment_id) {
                axios.delete(`apis/comment/report/${this.props.reportId}/${comment_id}`)
                .then((response) => {
                    if(response.data.status === '200') {
                        this.props.handleShouldReportUpdate(true)
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
        const { commentListFromDatabase, tempCommentList } = this.props;
        const { isEditingComment, isEditingCommentIndex } = this.state;
        return (
            <div className="comment-list">
                {
                    /* display temp comments right after user create a new comment */
                    commentListFromDatabase && this.props.shouldShowCommentListFromDatabase ?
                        commentListFromDatabase.map((commentObject, index) => {
                            return (
                                <div
                                    className="single-comment-container"
                                    key={`comment-${index}`}
                                >
                                    <div className="comment-avatar-container">
                                        {
                                            /* show user's photo */
                                            commentObject.user_id == this.props.currentUserId ?
                                                <img
                                                    className="comment__avatar"
                                                    src={this.props.userBasicData.photo}
                                                />
                                            :
                                                <img
                                                    className="comment__avatar"
                                                    src="https://api.fnkr.net/testimg/350x200/00CED1/FFF/?text=img+placeholder"
                                                />
                                        }
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
                                        commentObject.user_id == this.props.currentUserId ?
                                            <CommentEditButton
                                                anchorEl={this.state.anchorEl}
                                                commentId={commentObject.comment_id}
                                                handleCommentDelete={this.handleCommentDelete}
                                                handleCommentEditButtonTouchTap={this.handleCommentEditButtonTouchTap}
                                                handleCommentTextEdit={this.handleCommentTextEdit}
                                                handleRequestClose={this.handleRequestClose}
                                                index={index}
                                                isPopOverOfEditOpen={this.state.isPopOverOfEditOpen}
                                                isOldOrNew="old"
                                            />
                                        :
                                            <CommentExpandMoreButton
                                                anchorEl={this.state.anchorEl}
                                                commentId={commentObject.comment_id}
                                                handleCommentExpandMoreButtonTouchTap={this.handleCommentExpandMoreButtonTouchTap}
                                                handleDenounceBoxOpen={this.props.handleDenounceBoxOpen}
                                                handleRequestClose={this.handleRequestClose}
                                                index={index}
                                                isPopOverOfExpandMoreOpen={this.state.isPopOverOfExpandMoreOpen}
                                                isOldOrNew="old"
                                                reportId={this.props.reportId}
                                            />
                                    }
                                </div>
                            );
                        })
                    :
                        /* show temp comments right after user create a new comment */
                        tempCommentList.map((commentObject, index) => {
                            return (
                                <div className="single-comment-container" key={`new-comment-${index}`}>
                                    <div className="comment-avatar-container">
                                        {
                                            /* show user's photo */
                                            commentObject.user_id == this.props.currentUserId ?
                                                <img
                                                    className="comment__avatar"
                                                    src={this.props.userBasicData.photo}
                                                />
                                            :
                                                <img
                                                    className="comment__avatar"
                                                    src="https://api.fnkr.net/testimg/350x200/00CED1/FFF/?text=img+placeholder"
                                                />
                                        }
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
                                        commentObject.user_id == this.props.currentUserId ? 
                                            <CommentEditButton
                                                anchorEl={this.state.anchorEl}
                                                commentId={commentObject.comment_id}
                                                handleCommentDelete={this.handleCommentDelete}
                                                handleCommentEditButtonTouchTap={this.handleCommentEditButtonTouchTap}
                                                handleCommentTextEdit={this.handleCommentTextEdit}
                                                handleRequestClose={this.handleRequestClose}
                                                index={index}
                                                isPopOverOfEditOpen={this.state.isPopOverOfEditOpen}
                                                isOldOrNew="new"
                                            />
                                        :
                                            <CommentExpandMoreButton
                                                anchorEl={this.state.anchorEl}
                                                commentId={commentObject.comment_id}
                                                handleCommentExpandMoreButtonTouchTap={this.handleCommentExpandMoreButtonTouchTap}
                                                handleDenounceBoxOpen={this.props.handleDenounceBoxOpen}
                                                handleRequestClose={this.handleRequestClose}
                                                index={index}
                                                isPopOverOfExpandMoreOpen={this.state.isPopOverOfExpandMoreOpen}
                                                isOldOrNew="new"
                                                reportId={this.props.reportId}
                                            />
                                    }
                                </div>
                            )
                        })
                }
            </div>
        );
    }
};