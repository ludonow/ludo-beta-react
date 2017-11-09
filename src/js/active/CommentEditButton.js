import React from 'react';

import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Popover from 'material-ui/Popover';

const style = {
    'fontSize': '14px'
};

const CommentEditButton = ({ 
    anchorEl,
    handleCommentEditButtonTouchTap,
    handleCommentDelete,
    handleCommentTextEdit,
    handleRequestClose,
    index,
    isOldOrNew,
    isPopOverOfEditOpen
}) => (
    <div className="comment-button">
        <IconButton 
            id={`${isOldOrNew}-comment-edit-button-${index}`}
            onTouchTap={handleCommentEditButtonTouchTap}
            tooltip="編輯或刪除"
        >
            <ModeEdit />
        </IconButton>
        <Popover
            open={isPopOverOfEditOpen}
            anchorEl={anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={handleRequestClose}
        >
            <Menu>
                <MenuItem
                    innerDivStyle={style}
                    onTouchTap={handleCommentTextEdit}
                    primaryText="編輯" 
                />
                <MenuItem
                    innerDivStyle={style}
                    onTouchTap={handleCommentDelete}
                    primaryText="刪除此留言"
                />
            </Menu>
        </Popover>
    </div>
);

export default CommentEditButton;