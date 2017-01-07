import React, { Component } from 'react';

import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Popover from 'material-ui/Popover';

const style = {
    'fontSize': '14px'
};

export default class CommentEditButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { index, isOldOrNew } = this.props;
        return (
            <div className="comment-button">
                <IconButton 
                    id={`${isOldOrNew}-comment-edit-button-${index}`}
                    onTouchTap={this.props.handleCommentEditButtonTouchTap}
                    tooltip="編輯或刪除"
                >
                    <ModeEdit />
                </IconButton>
                <Popover
                    open={this.props.isPopOverOfEditOpen}
                    anchorEl={this.props.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.props.handleRequestClose}
                >
                    <Menu>
                        <MenuItem
                            innerDivStyle={style}
                            onTouchTap={this.props.handleCommentTextEdit}
                            primaryText="編輯" 
                        />
                        <MenuItem
                            innerDivStyle={style}
                            onTouchTap={this.props.handleCommentDelete}
                            primaryText="刪除此留言"
                        />
                    </Menu>
                </Popover>
            </div>
        );
    }
}