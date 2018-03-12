import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import Popover from 'material-ui/Popover';

const style = {
    'fontSize': '14px'
};

class CommentExpandMoreButton extends Component {
    constructor(props) {
        super(props);
        this.handleCommentDenounce = this.handleCommentDenounce.bind(this);
    }

    handleCommentDenounce(event) {
        /* This prevents ghost click. */
        event.preventDefault();
        /* method from CommentList */
        this.props.handleRequestClose();
        if (this.props.commentId) {
            this.props.handleDenounceBoxOpen({
                currentTargetCommentId: this.props.commentId,
                currentTargetReportId: this.props.reportId,
            });
        } else {
            window.alert('檢舉留言有問題，請重試一次；若問題仍然發生，請聯絡開發人員');
            console.error('CommentList handleCommentDenounce not get comment id');
        }
    }

    render() {
        const {
            index,
            isOldOrNew
        } = this.props;
        return (
            <div className="comment-button">
                <IconButton 
                    id={`${isOldOrNew}-comment-expand-more-button-${index}`}
                    onTouchTap={this.props.handleCommentExpandMoreButtonTouchTap}
                    tooltip="更多"
                >
                    <ExpandMore />
                </IconButton>
                <Popover
                    anchorEl={this.props.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    onRequestClose={this.props.handleRequestClose}
                    open={this.props.isPopOverOfExpandMoreOpen}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                >
                    <Menu>
                        <MenuItem
                            id={this.props.anchorEl.id}
                            innerDivStyle={style}
                            onTouchTap={this.handleCommentDenounce}
                            primaryText="檢舉此留言" 
                        />
                    </Menu>
                </Popover>
            </div>
        );
    }
}

export default CommentExpandMoreButton;
