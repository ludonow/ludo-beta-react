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

import MobileCommentForm from './MobileCommentForm';
import MobileCommentList from './MobileCommentList';

export default class MobileCommentBox extends React.Component {
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
                { currentUserId ?
                    <MobileCommentForm
                        currentUserId={currentUserId}
                        handleShouldReportUpdate={handleShouldReportUpdate}
                        ludoId={router_currentFormValue.ludo_id}
                        reportId={reportId}
                        updateTempCommentList={this.updateTempCommentList}
                        updateTempCommentListAfterPost={this.updateTempCommentListAfterPost}
                        userBasicData={userBasicData}
                    />
                    : null
                }
            </div>
        );
    }
};
