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

import animalImage_0 from '../../images/animals/anteater.png';
import animalImage_1 from '../../images/animals/bat.png';
import animalImage_2 from '../../images/animals/bulldog.png';
import animalImage_3 from '../../images/animals/cat.png';
import animalImage_4 from '../../images/animals/crocodile.png';
import animalImage_5 from '../../images/animals/duck.png';
import animalImage_6 from '../../images/animals/elephant.png';
import animalImage_7 from '../../images/animals/frog.png';
import animalImage_8 from '../../images/animals/giraffe.png';
import animalImage_9  from '../../images/animals/hippopotamus.png';
import animalImage_10 from '../../images/animals/kangaroo.png';
import animalImage_11 from '../../images/animals/lion.png';
import animalImage_12 from '../../images/animals/monkey.png';
import animalImage_13 from '../../images/animals/mouse.png';
import animalImage_14 from '../../images/animals/octopus.png';
import animalImage_15 from '../../images/animals/panda.png';
import animalImage_16 from '../../images/animals/penguin.png';
import animalImage_17 from '../../images/animals/pig.png';
import animalImage_18 from '../../images/animals/rabbit.png';
import animalImage_19 from '../../images/animals/shark.png';
import animalImage_20 from '../../images/animals/sheep.png';
import animalImage_21 from '../../images/animals/snake.png';
import animalImage_22 from '../../images/animals/spider.png';
import animalImage_23 from '../../images/animals/tiger.png';
import animalImage_24 from '../../images/animals/turtle.png';
import animalImage_25 from '../../images/animals/whale.png';

const animalImageArray = [
    animalImage_0 ,
    animalImage_1 ,
    animalImage_2 ,
    animalImage_3 ,
    animalImage_4 ,
    animalImage_5 ,
    animalImage_6 ,
    animalImage_7 ,
    animalImage_8 ,
    animalImage_9 ,
    animalImage_10,
    animalImage_11,
    animalImage_12,
    animalImage_13,
    animalImage_14,
    animalImage_15,
    animalImage_16,
    animalImage_17,
    animalImage_18,
    animalImage_19,
    animalImage_20,
    animalImage_21,
    animalImage_22,
    animalImage_23,
    animalImage_24,
    animalImage_25
];

const colorArray = [
    'aliceblue', 'black', 'cyan', 'deeppink', 'darkviolet', 'fuchsia',
    'gold', 'honeydew', 'indianred', 'ivory', 'khaki'
];

let animalIndex = 0;
let colorIndex = 0;

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
            /* components/_comment.scss */
            <div className="comment-list">
                {
                    /* display temp comments right after user create a new comment */
                    commentListFromDatabase && this.props.shouldShowCommentListFromDatabase ?
                        commentListFromDatabase.map((commentObject, index) => {
                            if (this.props.router_currentFormValue.comments_nick) {
                                animalIndex = this.props.router_currentFormValue.comments_nick[commentObject.user_id][0];
                                colorIndex = this.props.router_currentFormValue.comments_nick[commentObject.user_id][1];
                            }
                            return (
                                <div
                                    className="single-comment-container"
                                    key={`comment-${index}`}
                                >
                                    <div className="comment-avatar-container">
                                        {
                                            /* show random animal avatar image */
                                            commentObject.user_id === this.props.currentUserId ?
                                            <img
                                                className="comment__avatar"
                                                src={this.props.userBasicData.photo}
                                            />
                                            :
                                            <img
                                                className="comment__avatar"
                                                src={animalImageArray[animalIndex]}
                                                style={{backgroundColor: colorArray[colorIndex]}}
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
                        tempCommentList && tempCommentList.map((commentObject, index) => {
                            if (this.props.router_currentFormValue && this.props.router_currentFormValue.comments_nick) {
                                animalIndex = this.props.router_currentFormValue.comments_nick[commentObject.user_id][0];
                                colorIndex = this.props.router_currentFormValue.comments_nick[commentObject.user_id][1];
                            }
                            return (
                                <div
                                    className="single-comment-container"
                                    key={`new-comment-${index}`}
                                >
                                    <div className="comment-avatar-container">
                                        {
                                            /* show random animal avatar image */
                                            this.props.router_currentFormValue.comments_nick ?
                                                <img
                                                    className="comment__avatar"
                                                    src={animalImageArray[animalIndex]}
                                                    style={{backgroundColor: colorArray[colorIndex]}}
                                                />
                                            :
                                                <img
                                                    className="comment__avatar"
                                                    src="https://api.fnkr.net/testimg/40x40/00CED1/FFF/?text=avatar"
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
