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

export default class CommentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: {},
            isCommentPopOverOpen: false,
            isEditingComment: false,
            isEditingCommentIndex: [],
            commentTextContent: ''
        };
        this.handleCommentDeleteTouchTap = this.handleCommentDeleteTouchTap.bind(this);
        this.handleFinishCommentTextEdit = this.handleFinishCommentTextEdit.bind(this);
    }

    handleCommentDeleteTouchTap(event) {
        /* This prevents ghost click. */
        event.preventDefault();
        this.setState({
            isCommentPopOverOpen: false
        });
        const isSureToDelelteComment = window.confirm(`確定要刪除留言嗎？(刪除後不可復原)`);
        if(isSureToDelelteComment) {
            const { isEditingCommentIndex } = this.state;
            const oldNewIndex = isEditingCommentIndex[0].slice(0, 1);
            const atWhatPositionInArray = Number(isEditingCommentIndex[0].slice(-1));
            let comment_id = null;
            if (oldNewIndex == 'o') {
                comment_id = this.props.oldCommentList[atWhatPositionInArray].comment_id;
            } else if (oldNewIndex == 'n') {
                comment_id = this.props.newCommentList[atWhatPositionInArray].comment_id;
            } else {
                console.error('oldNewIndex error');
            }
            if(comment_id) {
                const commentDeleteBody = {
                    type: 'report',
                    report_id: this.props.report_id
                };
                axios.delete(`apis/comment/${comment_id}`, commentDeleteBody)
                .then(response => {
                    if(response.data.status == '200') {
                        this.props.handleShouldReportUpdate(true)
                    } else {
                        console.error('CommentList handleCommentDeleteTouchTap else response: ', response);
                        console.error('CommentList handleCommentDeleteTouchTap else message: ', response.data.message);
                        window.alert('刪除留言時發生錯誤，請重試一次；若問題依然發生，請聯絡開發團隊');
                    }
                })
                .catch(error => {
                    console.error('CommentList handleCommentDeleteTouchTap error: ', error);
                    window.alert('刪除留言時發生錯誤，請重試一次；若問題依然發生，請聯絡開發團隊');
                });
            }
        }
    }

    handleCommentIconButtonTouchTap = (event) => {
        /* This prevents ghost click. */
        event.preventDefault();
        const id = event.currentTarget.id;
        const oldNewIndex = String(id.slice(0, 1));
        const atWhatPositionInArray = String(id.slice(-1));
        const element = oldNewIndex + atWhatPositionInArray;
        const isEditingCommentIndex = [];
        isEditingCommentIndex.push(element);
        this.setState({
            anchorEl: event.currentTarget,
            isCommentPopOverOpen: true,
            isEditingCommentIndex
        });
    };

    handleCommentTextChange = (event) => {
        this.setState({commentTextContent: event.currentTarget.value});
    };

    handleCommentTextEditTouchTap = (event) => {
        /* This prevents ghost click. */
        event.preventDefault();
        this.setState({
            isCommentPopOverOpen: false,
            isEditingComment: true
        });
    };

    handleFinishCommentTextEdit(event) {
        if (event.keyCode == 13 && !event.shiftKey) {
            event.preventDefault();
            /* 
             * send put request to server to modify text report content 
             */
            const oldNewIndex = (event.currentTarget.id).slice(0, 1);
            const atWhatPositionInArray = Number(event.currentTarget.id.slice(-1));
            if(this.state.commentTextContent) {
                const commentModifyPutBody = {
                    content: this.state.commentTextContent,
                    report_id: this.props.report_id,
                    type: 'report'
                };
                let comment_id = null;
                if (oldNewIndex == 'o') {
                    comment_id = this.props.oldCommentList[atWhatPositionInArray].comment_id;
                } else if (oldNewIndex == 'n') {
                    comment_id = this.props.newCommentList[atWhatPositionInArray].comment_id;
                }
                console.log('CommentList handleFinishCommentTextEdit commentModifyPutBody', commentModifyPutBody);   // debug
                if (comment_id) {
                    axios.put(`apis/comment/${comment_id}`, commentModifyPutBody)
                    .then(response => {
                        if(response.data.status == '200') {
                            this.props.handleShouldReportUpdate(true);
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
                    .catch(error => {
                        console.error('CommentList handleFinishCommentTextEdit error: ', error);
                        window.alert('編輯留言時發生錯誤，請重試一次；若問題依然發生，請聯絡開發團隊');
                        this.setState({
                            isEditingComment: false
                        });
                    });
                }
            }
            /* 
             * transfer the text report to the original display instead of textarea by taking the element out of editing text array
             */
            const commentIndex = oldNewIndex + atWhatPositionInArray;
            const { isEditingCommentIndex } = this.state;
            const indexAtWhatPositionInArray = isEditingCommentIndex.indexOf(commentIndex);
            const isInEditingArray = (indexAtWhatPositionInArray != -1);
            if(isInEditingArray) {
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

    handleRequestClose = () => {
        this.setState({
            isCommentPopOverOpen: false
        });
    };

    render() {
        const { newCommentList, oldCommentList } = this.props;
        const { isEditingComment, isEditingCommentIndex } = this.state;
        return (
            <div className="comment-list">
                {
                    /* remove old comment right after user create a new comment */
                    oldCommentList && !this.props.isAfterPost? 
                        oldCommentList.map( (commentObject, index) => {
                            return (
                                <div
                                    className="comment-container"
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
                                        {
                                            commentObject.user_id == this.props.currentUserId ? 
                                                <div>
                                                    <IconButton 
                                                        id={`old-comment-edit-button-${index}`}
                                                        onTouchTap={this.handleCommentIconButtonTouchTap}
                                                        tooltip="編輯或刪除"
                                                    >
                                                        <ModeEdit />
                                                    </IconButton>
                                                    <Popover
                                                        open={this.state.isCommentPopOverOpen}
                                                        anchorEl={this.state.anchorEl}
                                                        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                                                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                                        onRequestClose={this.handleRequestClose}
                                                    >
                                                        <Menu>
                                                            <MenuItem 
                                                                onTouchTap={this.handleCommentTextEditTouchTap}
                                                                primaryText="編輯" 
                                                            />
                                                            <MenuItem
                                                                onTouchTap={this.handleCommentDeleteTouchTap}
                                                                primaryText="刪除此回報"
                                                            />
                                                        </Menu>
                                                    </Popover>
                                                </div>
                                            : null
                                        }
                                    </div>
                                </div>
                            );
                        })
                    : null
                }
                {
                    /* show new comments right after user create a new comment */
                    newCommentList.map( (commentObject, index) => {
                        return (
                            <div className="comment-container" key={`new-comment-${index}`}>
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
                                    {
                                        commentObject.user_id == this.props.currentUserId ? 
                                            <div>
                                                <IconButton 
                                                    id={`new-comment-edit-button-${index}`}
                                                    onTouchTap={this.handleCommentIconButtonTouchTap}
                                                    tooltip="編輯或刪除"
                                                >
                                                    <ModeEdit />
                                                </IconButton>
                                                <Popover
                                                    open={this.state.isCommentPopOverOpen}
                                                    anchorEl={this.state.anchorEl}
                                                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                                                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                                    onRequestClose={this.handleRequestClose}
                                                >
                                                    <Menu>
                                                        <MenuItem 
                                                            onTouchTap={this.handleEditTextReportClick}
                                                            primaryText="編輯" 
                                                        />
                                                        <MenuItem
                                                            onTouchTap={this.handleReportDelete}
                                                            primaryText="刪除此回報"
                                                        />
                                                    </Menu>
                                                </Popover>
                                            </div>
                                        : null
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
};