import React, { Component } from 'react';

import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';

const style = {
    'fontSize': '14px'
};

class MobileCommentExpandMoreButton extends Component {
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
            anchorEl,
            handleCommentDenounce,
            handleCommentExpandMoreButtonTouchTap,
            handleRequestClose,
            index,
            isOldOrNew,
            isPopOverOfExpandMoreOpen,
        } = this.props;
        return (
            <div className="comment-button">
                <IconButton 
                    id={`${isOldOrNew}-comment-expand-more-button-${index}`}
                    onTouchTap={handleCommentExpandMoreButtonTouchTap}
                    tooltip="更多"
                >
                    <ExpandMore />
                </IconButton>
                <Popover
                    open={isPopOverOfExpandMoreOpen}
                    anchorEl={anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={handleRequestClose}
                >
                    <Menu>
                        <MenuItem
                            id={anchorEl.id}
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

export default MobileCommentExpandMoreButton;
