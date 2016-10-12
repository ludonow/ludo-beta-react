import React, { Component } from 'react';

import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import Popover from 'material-ui/Popover';

import DenounceBox from '../app/DenounceBox';

const style = {
    'fontSize': '14px'
};

export default class CommentEditButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDenounceBoxOpen: false,
        };
        this.handleCommentDenounce = this.handleCommentDenounce.bind(this);
        this.handleDenounceBoxRequestClose = this.handleDenounceBoxRequestClose.bind(this);
    }

    handleCommentDenounce(event) {
        /* This prevents ghost click. */
        event.preventDefault();
        /* method from CommentList */
        this.props.handleRequestClose();
        if (this.props.commentId) {
            this.setState({
                currentTargetId: this.props.commentId,
                isDenounceBoxOpen: true,
                isPopOverOfExpandMoreOpen: false
            });
        } else {
            this.setState({
                isPopOverOfExpandMoreOpen: false
            });
            window.alert('檢舉留言有問題，請重試一次；若問題仍然發生，請聯絡開發人員');
            console.error('CommentList handleCommentDenounce not get comment id');
        }
    }

    handleDenounceBoxRequestClose() {
        this.setState({
            isDenounceBoxOpen: false
        });
    }

    render() {
        const { index, isOldOrNew } = this.props;
        return (
            <div className="comment-button">
                <DenounceBox
                    currentTargetId={this.state.currentTargetId}
                    denounceType={2}
                    isDenounceBoxOpen={this.state.isDenounceBoxOpen}
                    onRequestClose={this.handleDenounceBoxRequestClose}
                    reportId={this.props.reportId}
                />
                <IconButton 
                    id={`${isOldOrNew}-comment-expand-more-button-${index}`}
                    onTouchTap={this.props.handleCommentExpandMoreButtonTouchTap}
                    tooltip="更多"
                >
                    <ExpandMore />
                </IconButton>
                <Popover
                    open={this.props.isPopOverOfExpandMoreOpen}
                    anchorEl={this.props.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.props.handleRequestClose}
                >
                    <Menu>
                        <MenuItem
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